import { createHash, timingSafeEqual } from 'node:crypto';

export const MIN_PASSWORD_LENGTH = 16;

const digest = (value: string) => createHash('sha256').update(value).digest();

/**
 * HTTP Basic check. Fails closed when ADMIN_USER / ADMIN_PASSWORD are unset or when the
 * configured password is shorter than 16 characters.
 */
export function isAuthorized(
  authorization: string | null,
  user = process.env.ADMIN_USER,
  password = process.env.ADMIN_PASSWORD,
): boolean {
  if (!user || !password || password.length < MIN_PASSWORD_LENGTH) return false;
  const match = /^basic\s+(\S+)$/i.exec(authorization ?? '');
  if (!match) return false;
  const decoded = Buffer.from(match[1], 'base64').toString('utf8');
  const split = decoded.indexOf(':');
  if (split < 0) return false;
  // Hash first so lengths match for timingSafeEqual; evaluate both to avoid short-circuit timing.
  const userOk = timingSafeEqual(digest(decoded.slice(0, split)), digest(user));
  const passOk = timingSafeEqual(digest(decoded.slice(split + 1)), digest(password));
  return userOk && passOk;
}

let lastLog = 0;
let suppressed = 0;

/** Logs a failed attempt (never the credentials), at most once a minute. */
export function logFailedAuth(ip: string | null, now = Date.now()): boolean {
  if (now - lastLog < 60_000) {
    suppressed++;
    return false;
  }
  console.warn(`[analytics] failed /admin auth from ${ip ?? 'unknown ip'} (+${suppressed} suppressed since last log)`);
  lastLog = now;
  suppressed = 0;
  return true;
}
