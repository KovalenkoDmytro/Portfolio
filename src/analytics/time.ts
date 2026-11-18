export const TIME_ZONE = 'America/Edmonton';

const parts = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE, hourCycle: 'h23',
  year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
});

export function edmontonParts(ts: number) {
  const p = Object.fromEntries(parts.formatToParts(ts).map((x) => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, hour: Number(p.hour), minute: p.minute };
}

export const edmontonDay = (ts: number) => edmontonParts(ts).date;
export const edmontonHour = (ts: number) => edmontonParts(ts).hour;
export const formatEdmonton = (ts: number) => {
  const p = edmontonParts(ts);
  return `${p.date} ${String(p.hour).padStart(2, '0')}:${p.minute}`;
};

/** Calendar day keys (YYYY-MM-DD, Edmonton), oldest first, ending today. */
export function lastDays(days: number, now: number): string[] {
  const [y, m, d] = edmontonDay(now).split('-').map(Number);
  return Array.from({ length: days }, (_, i) =>
    new Date(Date.UTC(y, m - 1, d - (days - 1 - i))).toISOString().slice(0, 10));
}

/** UTC ms of 00:00 Edmonton on the given day key (handles MST/MDT). */
export function edmontonMidnight(dayKey: string): number {
  const [y, m, d] = dayKey.split('-').map(Number);
  for (const hour of [6, 7]) {
    const candidate = Date.UTC(y, m - 1, d, hour);
    const p = edmontonParts(candidate);
    if (p.date === dayKey && p.hour === 0) return candidate;
  }
  return Date.UTC(y, m - 1, d, 7);
}
