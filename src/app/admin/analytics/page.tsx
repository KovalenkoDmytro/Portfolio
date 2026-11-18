import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import type { CSSProperties } from 'react';
import { isAuthorized } from '../../../analytics/auth';
import { getDb } from '../../../analytics/db';
import { RANGES, getReport, parseRange, type Count } from '../../../analytics/queries';
import { TIME_ZONE, formatEdmonton } from '../../../analytics/time';
import { colors } from '../../../colors';

export const metadata: Metadata = { title: 'Analytics', robots: { index: false, follow: false } };

const card: CSSProperties = { background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 16, padding: 20 };
const th: CSSProperties = { textAlign: 'left', fontWeight: 500, opacity: .6, padding: '4px 8px 4px 0' };
const td: CSSProperties = { padding: '4px 8px 4px 0', verticalAlign: 'top' };

const place = (...parts: string[]) => parts.filter((p) => p !== 'Unknown').join(', ') || 'Unknown';

function Bars({ data, height = 140 }: { data: Count[]; height?: number }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  const step = Math.max(1, Math.ceil(data.length / 12));
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height }}>
        {data.map((d) => (
          <div key={d.label} title={`${d.label}: ${d.count}`}
            style={{ flex: 1, minWidth: 1, height: `${(d.count / max) * 100}%`, minHeight: d.count ? 2 : 0, background: colors.green, borderRadius: '2px 2px 0 0' }} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 2, fontSize: 11, opacity: .6, marginTop: 4 }}>
        {data.map((d, i) => (
          <div key={d.label} style={{ flex: 1, minWidth: 1, overflow: 'visible', whiteSpace: 'nowrap' }}>{i % step === 0 ? d.label.slice(-5) : ''}</div>
        ))}
      </div>
    </div>
  );
}

function Table({ title, rows, highlight }: { title: string; rows: Count[]; highlight?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <section style={card}>
      <h2 style={{ fontSize: 16, margin: '0 0 12px' }}>{title}</h2>
      {rows.length === 0 ? <p style={{ opacity: .6, margin: 0 }}>No data yet</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} style={r.label === highlight ? { color: colors.green, fontWeight: 600 } : undefined}>
                <td style={td}>{r.label}</td>
                <td style={{ ...td, width: '40%' }}>
                  <div style={{ height: 6, width: `${(r.count / max) * 100}%`, background: colors.green, opacity: .55, borderRadius: 3, marginTop: 7 }} />
                </td>
                <td style={{ ...td, textAlign: 'right' }}>{r.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<{ days?: string | string[] }> }) {
  await connection();
  // Auth lives in the page too, so a proxy matcher change can never expose it.
  if (!isAuthorized((await headers()).get('authorization'))) notFound();

  const days = parseRange((await searchParams).days);
  const report = getReport(getDb(), days);

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px 64px', color: colors.white, background: colors.graphite, minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, margin: 0, letterSpacing: '-0.03em' }}>Analytics</h1>
        <nav style={{ display: 'flex', gap: 8 }}>
          {RANGES.map((r) => (
            <a key={r} href={`?days=${r}`} style={{ padding: '6px 16px', borderRadius: 100, border: `1px solid ${r === days ? colors.green : 'rgba(255,255,255,.3)'}`, color: r === days ? colors.graphite : colors.white, background: r === days ? colors.green : 'transparent', textDecoration: 'none' }}>
              {r} days
            </a>
          ))}
        </nav>
      </header>
      <p style={{ opacity: .6, marginTop: -12 }}>Times and day boundaries use {TIME_ZONE}. Bots and prefetches are excluded.</p>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <section style={card}><div style={{ opacity: .6 }}>Total visits</div><div style={{ fontSize: 40 }}>{report.total}</div></section>
        <section style={card}><div style={{ opacity: .6 }}>Unique visitors (once per UTC day)</div><div style={{ fontSize: 40 }}>{report.unique}</div></section>
        <section style={{ ...card, borderColor: colors.green }}><div style={{ opacity: .6 }}>Visits from resume (utm_source=resume)</div><div style={{ fontSize: 40, color: colors.green }}>{report.resumeVisits}</div></section>
      </div>

      {report.withoutIp > 0 && (
        <p style={{ opacity: .6 }}>{report.withoutIp} visit(s) arrived without a client IP header (cf-connecting-ip) and are not included in unique visitors.</p>
      )}

      <div style={{ display: 'grid', gap: 16, marginTop: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
        <section style={{ ...card, gridColumn: '1 / -1' }}><h2 style={{ fontSize: 16, margin: '0 0 12px' }}>Visits per day</h2><Bars data={report.perDay} /></section>
        <section style={{ ...card, gridColumn: '1 / -1' }}><h2 style={{ fontSize: 16, margin: '0 0 12px' }}>Visits by hour of day ({TIME_ZONE})</h2><Bars data={report.perHour} height={110} /></section>
        <Table title="Countries" rows={report.countries} />
        <Table title="Regions" rows={report.regions} />
        <Table title="Cities" rows={report.cities} />
        <Table title="Devices" rows={report.devices} />
        <Table title="Browsers" rows={report.browsers} />
        <Table title="Operating systems" rows={report.systems} />
        <Table title="Top referrers" rows={report.referrers} />
        <Table title="UTM source" rows={report.utmSources} highlight="resume" />
        <Table title="UTM medium" rows={report.utmMedium} />
        <Table title="UTM campaign" rows={report.utmCampaign} />
      </div>

      <section style={{ ...card, marginTop: 16, overflowX: 'auto' }}>
        <h2 style={{ fontSize: 16, margin: '0 0 12px' }}>Recent visits</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead><tr>{['Time', 'Path', 'Location', 'Device', 'Source'].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
          <tbody>
            {report.recent.map((v) => (
              <tr key={v.id}>
                <td style={td}>{formatEdmonton(v.ts)}</td>
                <td style={td}>{v.path}</td>
                <td style={td}>{place(v.city, v.region, v.country)}</td>
                <td style={td}>{v.device} / {v.browser} / {v.os}</td>
                <td style={td}>{v.utm_source ? `utm:${v.utm_source}` : v.referrer_host ?? 'direct'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
