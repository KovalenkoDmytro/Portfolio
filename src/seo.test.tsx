import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ThemeProvider } from '@mui/material/styles';
import HomePage from './app/page';
import robots from './app/robots';
import sitemap from './app/sitemap';
import { theme } from './theme';
import { profile } from './content';
import { services } from './services';
import { profileStructuredData, siteMetadata, siteUrl } from './seo';

describe('Server-rendered SEO', () => {
  const html = renderToStaticMarkup(<ThemeProvider theme={theme}><HomePage /></ThemeProvider>);

  it('renders portfolio content visibly before JavaScript runs', () => {
    expect(html).toContain('<main');
    expect(html).toContain('EstateHub');
    expect(html).toContain('ARC');
    expect(html).toContain('GrowME Marketing');
    expect(html).toContain('mailto:');
    expect(html).not.toMatch(/style="[^"]*opacity:\s*0(?:;|")/);
  });

  it('embeds parseable profile structured data using the real social links', () => {
    const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    expect(json).toBeDefined();
    const parsed: unknown = JSON.parse(json ?? '');
    expect(parsed).toEqual(profileStructuredData);
    const types = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => (JSON.parse(match[1]) as { '@type': string })['@type']);
    expect(types).toEqual(['ProfilePage', 'ProfessionalService', 'WebSite', 'FAQPage']);
    expect(profileStructuredData.mainEntity.sameAs).toEqual([profile.github, profile.linkedin]);
  });

  it('uses the same canonical origin for metadata, robots and sitemap', () => {
    expect(siteUrl.protocol).toBe('https:');
    expect(siteMetadata.metadataBase).toEqual(siteUrl);
    expect(siteMetadata.alternates?.canonical).toBe('/');
    expect(robots().sitemap).toBe(new URL('/sitemap.xml', siteUrl).href);
    expect(sitemap().map(entry => entry.url)).toEqual([siteUrl.href, ...services.map(service => new URL(`/services/${service.slug}`, siteUrl).href)]);
  });
});
