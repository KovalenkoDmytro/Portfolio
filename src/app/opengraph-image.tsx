import { ImageResponse } from 'next/og';
import { profile } from '../content';
import { colors } from '../colors';

export const alt = `${profile.name} — Calgary Web & App Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: colors.graphite, color: '#fff' }}>
      <div style={{ fontSize: 30, opacity: 0.7 }}>Calgary, Alberta · Canada & USA</div>
      <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>Calgary Web & App Developer</div>
      <div style={{ fontSize: 34, marginTop: 32, opacity: 0.85 }}>Websites · Web & mobile apps · ERP · WordPress · Shopify</div>
      <div style={{ fontSize: 40, marginTop: 48, fontWeight: 600 }}>{profile.name}</div>
    </div>,
    size,
  );
}
