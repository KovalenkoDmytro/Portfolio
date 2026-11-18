import Database from 'better-sqlite3';
import { chmodSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { newSalt, utcDay } from './hash';

const DAY = 86_400_000;
export const RETENTION_MS = 365 * DAY;
/** ~1 GB at the default 4 KB page size: inserts fail (and are swallowed) instead of filling the disk. */
export const MAX_PAGES = 262_144;

const schema = `
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,
  type TEXT NOT NULL,
  path TEXT NOT NULL,
  visitor_hash TEXT,
  country TEXT NOT NULL, region TEXT NOT NULL, city TEXT NOT NULL,
  device TEXT NOT NULL, browser TEXT NOT NULL, os TEXT NOT NULL,
  referrer_host TEXT,
  utm_source TEXT, utm_medium TEXT, utm_campaign TEXT, utm_term TEXT, utm_content TEXT
);
CREATE INDEX IF NOT EXISTS events_ts ON events (ts);
CREATE INDEX IF NOT EXISTS events_type_ts ON events (type, ts);
CREATE INDEX IF NOT EXISTS events_visitor_ts ON events (visitor_hash, ts);
CREATE TABLE IF NOT EXISTS salts (day TEXT PRIMARY KEY, salt TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
`;

export type Db = Database.Database;

/** Restrict the database and its WAL/SHM side files to the owner. */
export function secureFiles(path: string): void {
  if (path === ':memory:') return;
  for (const file of [path, `${path}-wal`, `${path}-shm`]) {
    if (existsSync(file)) chmodSync(file, 0o600);
  }
}

export function openDb(path: string): Db {
  if (path !== ':memory:') mkdirSync(dirname(resolve(path)), { recursive: true, mode: 0o700 });
  const db = new Database(path);
  db.pragma('journal_mode = WAL');
  db.pragma('synchronous = NORMAL');
  db.pragma('busy_timeout = 200');
  db.pragma('secure_delete = ON');
  db.pragma(`max_page_count = ${MAX_PAGES}`);
  db.exec(schema);
  secureFiles(path);
  return db;
}

const globalForDb = globalThis as { __analyticsDb?: Db };

export function getDb(): Db {
  globalForDb.__analyticsDb ??= openDb(process.env.ANALYTICS_DB_PATH || './data/analytics.db');
  return globalForDb.__analyticsDb;
}

const saltCache = new WeakMap<Db, { day: string; salt: string }>();

/**
 * Random per-day salt, cached in memory. The database is only touched on the first call of a UTC day,
 * where only the current salt is kept (older ones are deleted) and retention pruning runs.
 */
export function getSalt(db: Db, now: number): string {
  const day = utcDay(now);
  const cached = saltCache.get(db);
  if (cached?.day === day) return cached.salt;
  const salt = db.transaction(() => {
    db.prepare('INSERT OR IGNORE INTO salts (day, salt) VALUES (?, ?)').run(day, newSalt());
    db.prepare('DELETE FROM salts WHERE day <> ?').run(day);
    pruneOld(db, now);
    return (db.prepare('SELECT salt FROM salts WHERE day = ?').get(day) as { salt: string }).salt;
  })();
  saltCache.set(db, { day, salt });
  return salt;
}

/** Deletes events past retention, at most once per UTC day. */
export function pruneOld(db: Db, now: number): void {
  const day = utcDay(now);
  const last = db.prepare("SELECT value FROM meta WHERE key = 'last_prune'").get() as { value: string } | undefined;
  if (last?.value === day) return;
  db.prepare('DELETE FROM events WHERE ts < ?').run(now - RETENTION_MS);
  db.prepare("INSERT OR REPLACE INTO meta (key, value) VALUES ('last_prune', ?)").run(day);
}
