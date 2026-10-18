import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { siteMetadata } from '../seo';
import { colors } from '../colors';
import { Providers } from './providers';

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = { themeColor: colors.graphite };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
