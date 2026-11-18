import { isbot } from 'isbot';
import { getDb, getSalt, secureFiles, type Db } from './db';
import { parseGeo } from './geo';
import { visitorHash } from './hash';
import { services } from '../services';
import { parseUserAgent } from './ua';

type HeaderSource = Pick<Headers, 'get'>;

export type PageviewInput = {
  method: string;
  url: URL;
  headers: HeaderSource;
  /** Hosts considered "the site itself" for referrer exclusion. */
  ownHosts?: string[];
  now?: number;
};

const knownPaths = new Set(['/', ...services.map((service) => `/services/${service.slug}`)]);
export const OTHER_PATH = '(other)';

/** Only real pages keep their path; anything else is bucketed so junk URLs cannot create unbounded distinct values. */
export function normalizePath(pathname: string): string {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return knownPaths.has(path) ? path : OTHER_PATH;
}

const prefetchHeaders = ['next-router-prefetch', 'x-middleware-prefetch', 'rsc'];

/** Only real full-page browser navigations: GET, HTML, not a bot, not a prefetch or RSC fetch. */
export function shouldRecord(method: string, headers: HeaderSource): boolean {
  if (method !== 'GET') return false;
  if (!(headers.get('accept') ?? '').includes('text/html')) return false;
  if (prefetchHeaders.some((name) => headers.get(name) !== null)) return false;
  if ((headers.get('purpose') ?? headers.get('sec-purpose') ?? '').includes('prefetch')) return false;
  const ua = headers.get('user-agent') ?? '';
  return ua !== '' && !isbot(ua);
}

const hostOf = (value: string | null) => {
  if (!value) return null;
  try {
    return new URL(value).hostname.toLowerCase().replace(/^www\./, '').slice(0, 253) || null;
  } catch {
    return null;
  }
};

const param = (url: URL, name: string, lower = false) => {
  const value = url.searchParams.get(name)?.trim().slice(0, 100);
  if (!value) return null;
  return lower ? value.toLowerCase() : value;
};

export function parseUtm(url: URL) {
  return {
    utm_source: param(url, 'utm_source', true),
    utm_medium: param(url, 'utm_medium', true),
    utm_campaign: param(url, 'utm_campaign'),
    utm_term: param(url, 'utm_term'),
    utm_content: param(url, 'utm_content'),
  };
}

export function parseReferrerHost(referer: string | null, ownHosts: string[] = []) {
  const host = hostOf(referer);
  if (!host) return null;
  const own = ownHosts.map((h) => h.toLowerCase().replace(/:\d+$/, '').replace(/^www\./, ''));
  return own.includes(host) ? null : host;
}

export function buildPageview(input: PageviewInput, salt: string) {
  const { headers, url } = input;
  const ua = headers.get('user-agent') ?? '';
  const geo = parseGeo(headers);
  return {
    ts: input.now ?? Date.now(),
    type: 'pageview',
    path: normalizePath(url.pathname),
    // Without a client IP every visitor would hash identically, so store no hash rather than a bogus one.
    visitor_hash: geo.ip === null ? null : visitorHash(salt, geo.ip, ua),
    country: geo.country,
    region: geo.region,
    city: geo.city,
    ...parseUserAgent(ua),
    referrer_host: parseReferrerHost(headers.get('referer'), input.ownHosts),
    ...parseUtm(url),
  };
}

export function insertPageview(db: Db, input: PageviewInput): void {
  const now = input.now ?? Date.now();
  db.transaction(() => {
    const row = buildPageview({ ...input, now }, getSalt(db, now));
    db.prepare(`INSERT INTO events (ts, type, path, visitor_hash, country, region, city, device, browser, os,
      referrer_host, utm_source, utm_medium, utm_campaign, utm_term, utm_content)
    VALUES (@ts, @type, @path, @visitor_hash, @country, @region, @city, @device, @browser, @os,
      @referrer_host, @utm_source, @utm_medium, @utm_campaign, @utm_term, @utm_content)`).run(row);
  })();
}

let permissionsChecked = false;

/** Never throws: analytics must not affect a response. */
export function recordPageview(input: PageviewInput): void {
  try {
    if (!shouldRecord(input.method, input.headers)) return;
    const db = getDb();
    insertPageview(db, input);
    if (!permissionsChecked) {
      permissionsChecked = true;
      secureFiles(process.env.ANALYTICS_DB_PATH || './data/analytics.db'); // WAL/SHM files appear after the first write
    }
  } catch (error) {
    console.error('[analytics] failed to record pageview', error);
  }
}
