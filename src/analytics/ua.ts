export type Device = { device: 'mobile' | 'tablet' | 'desktop'; browser: string; os: string };

const browsers: [RegExp, string][] = [
  [/Edg(e|A|iOS)?\//, 'Edge'],
  [/OPR\/|Opera/, 'Opera'],
  [/SamsungBrowser/, 'Samsung Internet'],
  [/Firefox\/|FxiOS/, 'Firefox'],
  [/Chrome\/|CriOS/, 'Chrome'],
  [/Safari\//, 'Safari'],
];

const systems: [RegExp, string][] = [
  [/Windows/, 'Windows'],
  [/iPhone|iPad|iPod/, 'iOS'],
  [/Android/, 'Android'],
  [/Mac OS X|Macintosh/, 'macOS'],
  [/CrOS/, 'ChromeOS'],
  [/Linux/, 'Linux'],
];

const pick = (list: [RegExp, string][], ua: string) => list.find(([re]) => re.test(ua))?.[1] ?? 'Unknown';

export function parseUserAgent(ua: string): Device {
  const device = /iPad|Tablet/.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua))
    ? 'tablet'
    : /Mobi|iPhone|iPod|Android/.test(ua) ? 'mobile' : 'desktop';
  return { device, browser: pick(browsers, ua), os: pick(systems, ua) };
}
