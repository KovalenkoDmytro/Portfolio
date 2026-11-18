import { createHash, randomBytes } from 'node:crypto';

export const newSalt = () => randomBytes(32).toString('hex');

/** Anonymous visitor id: the raw IP is never stored, and the salt rotates daily. */
export const visitorHash = (salt: string, ip: string, userAgent: string) =>
  createHash('sha256').update(`${salt}\0${ip}\0${userAgent}`).digest('hex');

export const utcDay = (ts: number) => new Date(ts).toISOString().slice(0, 10);
