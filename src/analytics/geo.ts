export type Geo = { ip: string | null; country: string; region: string; city: string };

const clean = (value: string | null | undefined) => {
  const trimmed = value?.trim();
  if (!trimmed) return 'Unknown';
  try {
    return decodeURIComponent(trimmed).slice(0, 100) || 'Unknown';
  } catch {
    return trimmed.slice(0, 100);
  }
};

/** Reads Cloudflare visitor headers. The app only listens on 127.0.0.1, so they are trusted as-is. */
export function parseGeo(headers: Pick<Headers, 'get'>): Geo {
  const raw = clean(headers.get('cf-ipcountry'));
  const country = raw === 'Unknown' ? raw : raw.toUpperCase();
  return {
    ip: headers.get('cf-connecting-ip')?.trim() || null,
    // XX = no country data, T1 = Tor (treated as unknown)
    country: country === 'XX' || country === 'T1' ? 'Unknown' : country,
    region: clean(headers.get('cf-region') || headers.get('cf-region-code')),
    city: clean(headers.get('cf-ipcity')),
  };
}
