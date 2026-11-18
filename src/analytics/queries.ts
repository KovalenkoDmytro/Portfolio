import type { Db } from './db';
import { edmontonDay, edmontonHour, edmontonMidnight, lastDays } from './time';

export const RANGES = [7, 30, 90] as const;
export type Range = (typeof RANGES)[number];

export const parseRange = (value: string | string[] | undefined): Range => {
  const n = Number(Array.isArray(value) ? value[0] : value);
  return (RANGES as readonly number[]).includes(n) ? (n as Range) : 30;
};

export type Count = { label: string; count: number };
export type RecentVisit = {
  id: number; ts: number; path: string; country: string; region: string; city: string;
  device: string; browser: string; os: string; referrer_host: string | null; utm_source: string | null;
};

export type Report = {
  days: number;
  total: number;
  unique: number;
  perDay: Count[];
  perHour: Count[];
  countries: Count[];
  regions: Count[];
  cities: Count[];
  devices: Count[];
  browsers: Count[];
  systems: Count[];
  referrers: Count[];
  utmSources: Count[];
  utmMedium: Count[];
  utmCampaign: Count[];
  resumeVisits: number;
  /** Visits recorded without a client IP (no unique-visitor hash). */
  withoutIp: number;
  recent: RecentVisit[];
};

const columns = {
  country: 'country', region: "region || ', ' || country", city: "city || ', ' || country",
  device: 'device', browser: 'browser', os: 'os',
} as const;

export function getReport(db: Db, days: number, now = Date.now()): Report {
  const keys = lastDays(days, now);
  const since = edmontonMidnight(keys[0]);

  const group = (column: 'country' | 'region' | 'city' | 'device' | 'browser' | 'os'): Count[] =>
    (db.prepare(`SELECT ${columns[column]} AS label, COUNT(*) AS count FROM events
      WHERE type = 'pageview' AND ts >= ? GROUP BY label ORDER BY count DESC, label LIMIT 15`)
      .all(since) as Count[]);
  const grouped = (column: 'utm_source' | 'utm_medium' | 'utm_campaign' | 'referrer_host') =>
    (db.prepare(`SELECT ${column} AS label, COUNT(*) AS count FROM events
      WHERE type = 'pageview' AND ts >= ? AND ${column} IS NOT NULL GROUP BY label ORDER BY count DESC, label LIMIT 15`)
      .all(since) as Count[]);

  const totals = db.prepare(`SELECT COUNT(*) AS total, COUNT(DISTINCT visitor_hash) AS unique_visitors
    FROM events WHERE type = 'pageview' AND ts >= ?`).get(since) as { total: number; unique_visitors: number };

  // SQL groups by UTC hour (at most days*24 rows); Edmonton offsets are whole hours, so mapping each
  // bucket to a local day/hour in JS is exact and respects DST.
  const hourly = db.prepare(`SELECT ts / 3600000 AS bucket, COUNT(*) AS count FROM events
    WHERE type = 'pageview' AND ts >= ? GROUP BY bucket`).all(since) as { bucket: number; count: number }[];
  const byDay = new Map(keys.map((k) => [k, 0]));
  const byHour = Array.from({ length: 24 }, () => 0);
  for (const { bucket, count } of hourly) {
    const ts = bucket * 3_600_000;
    const day = edmontonDay(ts);
    if (byDay.has(day)) byDay.set(day, byDay.get(day)! + count);
    byHour[edmontonHour(ts)] += count;
  }

  const resume = db.prepare("SELECT COUNT(*) FROM events WHERE type = 'pageview' AND ts >= ? AND utm_source = 'resume'")
    .pluck().get(since) as number;

  return {
    days,
    total: totals.total,
    unique: totals.unique_visitors,
    perDay: [...byDay].map(([label, count]) => ({ label, count })),
    perHour: byHour.map((count, hour) => ({ label: String(hour).padStart(2, '0'), count })),
    countries: group('country'),
    regions: group('region'),
    cities: group('city'),
    devices: group('device'),
    browsers: group('browser'),
    systems: group('os'),
    referrers: grouped('referrer_host'),
    utmSources: grouped('utm_source'),
    utmMedium: grouped('utm_medium'),
    utmCampaign: grouped('utm_campaign'),
    resumeVisits: resume,
    withoutIp: db.prepare("SELECT COUNT(*) FROM events WHERE type = 'pageview' AND ts >= ? AND visitor_hash IS NULL").pluck().get(since) as number,
    recent: db.prepare(`SELECT id, ts, path, country, region, city, device, browser, os, referrer_host, utm_source
      FROM events WHERE type = 'pageview' ORDER BY ts DESC LIMIT 25`).all() as RecentVisit[],
  };
}
