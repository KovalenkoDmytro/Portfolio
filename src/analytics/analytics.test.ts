import { describe, expect, it, vi } from 'vitest';
import { isAuthorized, logFailedAuth } from './auth';
import { getSalt, openDb, pruneOld, RETENTION_MS } from './db';
import { parseGeo } from './geo';
import { visitorHash } from './hash';
import { getReport, parseRange } from './queries';
import { buildPageview, insertPageview, normalizePath, parseReferrerHost, recordPageview, parseUtm, shouldRecord } from './record';
import { edmontonHour, edmontonMidnight, lastDays } from './time';
import { parseUserAgent } from './ua';

const chrome = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const iphone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const h = (o: Record<string, string>) => new Headers(o);
const page = { accept: 'text/html,application/xhtml+xml', 'user-agent': chrome };

describe('shouldRecord', () => {
  it('accepts a normal browser navigation', () => expect(shouldRecord('GET', h(page))).toBe(true));
  it('rejects bots, non-GET, non-HTML, prefetch and RSC', () => {
    expect(shouldRecord('GET', h({ ...page, 'user-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' }))).toBe(false);
    expect(shouldRecord('POST', h(page))).toBe(false);
    expect(shouldRecord('GET', h({ ...page, accept: 'image/png' }))).toBe(false);
    expect(shouldRecord('GET', h({ ...page, 'next-router-prefetch': '1' }))).toBe(false);
    expect(shouldRecord('GET', h({ ...page, purpose: 'prefetch' }))).toBe(false);
    expect(shouldRecord('GET', h({ ...page, rsc: '1' }))).toBe(false);
    expect(shouldRecord('GET', h({ accept: 'text/html' }))).toBe(false);
  });
});

describe('hash and salts', () => {
  it('is stable for one salt and changes with salt, ip or ua', () => {
    const base = visitorHash('s1', '1.1.1.1', chrome);
    expect(visitorHash('s1', '1.1.1.1', chrome)).toBe(base);
    expect(visitorHash('s2', '1.1.1.1', chrome)).not.toBe(base);
    expect(visitorHash('s1', '1.1.1.2', chrome)).not.toBe(base);
    expect(base).not.toContain('1.1.1.1');
  });
  it('rotates daily and keeps only the current salt', () => {
    const db = openDb(':memory:');
    const day = 86_400_000;
    const t0 = Date.UTC(2026, 0, 10, 12);
    const a = getSalt(db, t0);
    expect(getSalt(db, t0 + 1000)).toBe(a);
    const b = getSalt(db, t0 + day);
    expect(b).not.toBe(a);
    getSalt(db, t0 + 3 * day);
    const days = db.prepare('SELECT day FROM salts ORDER BY day').pluck().all();
    expect(days).toEqual(['2026-01-13']);
  });
});

describe('header parsing', () => {
  it('reads Cloudflare geo headers', () => {
    expect(parseGeo(h({ 'cf-connecting-ip': '2.2.2.2', 'cf-ipcountry': 'CA', 'cf-ipcity': 'Calgary', 'cf-region': 'Alberta', 'cf-region-code': 'AB' })))
      .toEqual({ ip: '2.2.2.2', country: 'CA', region: 'Alberta', city: 'Calgary' });
  });
  it('falls back to Unknown', () => {
    expect(parseGeo(h({ 'cf-ipcountry': 'XX' }))).toEqual({ ip: null, country: 'Unknown', region: 'Unknown', city: 'Unknown' });
  });
  it('parses user agents', () => {
    expect(parseUserAgent('')).toEqual({ device: 'desktop', browser: 'Unknown', os: 'Unknown' });
    expect(parseUserAgent(iphone)).toEqual({ device: 'mobile', browser: 'Safari', os: 'iOS' });
    expect(parseUserAgent(chrome)).toEqual({ device: 'desktop', browser: 'Chrome', os: 'Windows' });
    expect(parseUserAgent('Mozilla/5.0 (Linux; Android 14; Pixel Tablet) Chrome/126.0 Safari/537.36').device).toBe('tablet');
  });
  it('excludes same-site referrers', () => {
    expect(parseReferrerHost('https://www.linkedin.com/in/x', ['dmytro-kovalenko.ca'])).toBe('linkedin.com');
    expect(parseReferrerHost('https://www.dmytro-kovalenko.ca/', ['dmytro-kovalenko.ca'])).toBeNull();
    expect(parseReferrerHost('nonsense')).toBeNull();
  });
});

describe('UTM parsing', () => {
  it('extracts and normalises utm params', () => {
    expect(parseUtm(new URL('https://x.ca/?utm_source=Resume&utm_medium=PDF&utm_campaign=Q1&utm_term=a&utm_content=b')))
      .toEqual({ utm_source: 'resume', utm_medium: 'pdf', utm_campaign: 'Q1', utm_term: 'a', utm_content: 'b' });
    expect(parseUtm(new URL('https://x.ca/')).utm_source).toBeNull();
  });
});

describe('Edmonton bucketing', () => {
  it('uses MST in winter and MDT in summer', () => {
    expect(edmontonHour(Date.UTC(2026, 0, 15, 7))).toBe(0);
    expect(edmontonHour(Date.UTC(2026, 6, 15, 6))).toBe(0);
    expect(edmontonHour(Date.UTC(2026, 6, 15, 5, 59))).toBe(23);
  });
  it('finds local midnight across DST and lists calendar days', () => {
    expect(edmontonMidnight('2026-01-15')).toBe(Date.UTC(2026, 0, 15, 7));
    expect(edmontonMidnight('2026-07-15')).toBe(Date.UTC(2026, 6, 15, 6));
    // DST transition days: 23h and 25h long, midnights still resolve
    expect(edmontonMidnight('2026-03-08')).toBe(Date.UTC(2026, 2, 8, 7));
    expect(edmontonMidnight('2026-03-09')).toBe(Date.UTC(2026, 2, 9, 6));
    expect(edmontonMidnight('2026-11-01')).toBe(Date.UTC(2026, 10, 1, 6));
    expect(edmontonMidnight('2026-11-02')).toBe(Date.UTC(2026, 10, 2, 7));
    expect(lastDays(3, Date.UTC(2026, 2, 9, 12))).toEqual(['2026-03-07', '2026-03-08', '2026-03-09']);
  });
});

describe('report', () => {
  it('stores events, counts uniques and buckets by Edmonton day', () => {
    const db = openDb(':memory:');
    const now = Date.UTC(2026, 0, 15, 8); // 01:00 MST on the 15th
    const input = (ip: string, ts: number, extra = '') => ({
      method: 'GET', url: new URL(`https://dmytro-kovalenko.ca/${extra}`), now: ts,
      headers: h({ ...page, 'cf-connecting-ip': ip, 'cf-ipcountry': 'CA', 'cf-ipcity': 'Calgary' }),
    });
    insertPageview(db, input('1.1.1.1', Date.UTC(2026, 0, 15, 6, 59), '?utm_source=resume')); // 14th 23:59 local
    insertPageview(db, input('1.1.1.1', now));
    insertPageview(db, input('3.3.3.3', now));
    const r = getReport(db, 7, now);
    expect(r.total).toBe(3);
    expect(r.unique).toBe(2);
    expect(r.resumeVisits).toBe(1);
    expect(r.perDay.at(-1)).toEqual({ label: '2026-01-15', count: 2 });
    expect(r.perDay.at(-2)).toEqual({ label: '2026-01-14', count: 1 });
    expect(r.perHour[23].count).toBe(1);
    expect(r.perHour[1].count).toBe(2);
    expect(db.prepare('SELECT COUNT(*) FROM events WHERE visitor_hash LIKE ?').pluck().get('%1.1.1.1%')).toBe(0);
    expect(buildPageview(input('1.1.1.1', now), 's').country).toBe('CA');
  });
});

describe('basic auth', () => {
  const header = (s: string) => `Basic ${Buffer.from(s).toString('base64')}`;
  it('fails closed and checks both fields', () => {
    const pw = 'correct-horse-battery';
    expect(isAuthorized(header('a:b'), undefined, undefined)).toBe(false);
    expect(isAuthorized(header(`a:${pw}`), 'a', pw)).toBe(true);
    expect(isAuthorized(header(`a:${pw}`).replace('Basic', 'basic'), 'a', pw)).toBe(true);
    expect(isAuthorized(header('a:wrong'), 'a', pw)).toBe(false);
    expect(isAuthorized(null, 'a', pw)).toBe(false);
    expect(isAuthorized(header('a:short'), 'a', 'short')).toBe(false); // password under 16 chars is refused
  });
});

describe('path allowlist and caps', () => {
  it('keeps known pages and buckets everything else', () => {
    expect(normalizePath('/')).toBe('/');
    expect(normalizePath('/services/website-development-calgary/')).toBe('/services/website-development-calgary');
    expect(normalizePath('/wp-login')).toBe('(other)');
    expect(normalizePath('/services/nope')).toBe('(other)');
  });
  it('caps stored strings and skips the hash without an IP', () => {
    const url = new URL(`https://x.ca/?utm_campaign=${'a'.repeat(500)}`);
    const row = buildPageview({ method: 'GET', url, headers: h({ ...page, referer: `https://${'a'.repeat(300)}.com/` }) }, 's');
    expect(row.utm_campaign).toHaveLength(100);
    expect(row.referrer_host!.length).toBeLessThanOrEqual(253);
    expect(row.visitor_hash).toBeNull();
    expect(row.path).toBe('/');
  });
});

describe('retention and resilience', () => {
  it('prunes events older than a year, once per day', () => {
    const db = openDb(':memory:');
    const now = Date.UTC(2026, 5, 1);
    const ins = db.prepare("INSERT INTO events (ts,type,path,country,region,city,device,browser,os) VALUES (?, 'pageview', '/', 'CA','a','b','desktop','c','d')");
    ins.run(now - RETENTION_MS - 1);
    ins.run(now - 1000);
    pruneOld(db, now);
    expect(db.prepare('SELECT COUNT(*) FROM events').pluck().get()).toBe(1);
    ins.run(now - RETENTION_MS - 1);
    pruneOld(db, now + 1000); // same day: skipped
    expect(db.prepare('SELECT COUNT(*) FROM events').pluck().get()).toBe(2);
  });
  it('recordPageview swallows errors', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const bad = { get: () => { throw new Error('boom'); } } as unknown as Headers;
    expect(() => recordPageview({ method: 'GET', url: new URL('https://x.ca/'), headers: bad })).not.toThrow();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('parseRange defaults to 30', () => {
    expect(parseRange(undefined)).toBe(30);
    expect(parseRange('7')).toBe(7);
    expect(parseRange(['90'])).toBe(90);
    expect(parseRange('5')).toBe(30);
  });
  it('rate-limits failed auth logging', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(logFailedAuth('1.1.1.1', 1_000_000)).toBe(true);
    expect(logFailedAuth('1.1.1.1', 1_000_500)).toBe(false);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
