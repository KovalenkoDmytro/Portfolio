import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ThemeProvider } from '@mui/material/styles';
import ServicePage, { generateMetadata, generateStaticParams } from './app/services/[slug]/page';
import { services } from './services';
import { theme } from './theme';

describe('Service landing pages', () => {
  it('prerenders all advertised services', () => {
    expect(generateStaticParams()).toHaveLength(7);
    expect(new Set(generateStaticParams().map(item => item.slug)).size).toBe(7);
  });

  it.each(services)('renders $name with a unique canonical and visible content', async service => {
    const props = { params: Promise.resolve({ slug: service.slug }) };
    const page = await ServicePage(props);
    const metadata = await generateMetadata(props);
    const html = renderToStaticMarkup(<ThemeProvider theme={theme}>{page}</ThemeProvider>);
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain(service.overview);
    expect(html).toContain('application/ld+json');
    expect(html).toContain('mailto:');
    expect(metadata.alternates?.canonical).toBe(`/services/${service.slug}`);
    expect(metadata.description).toBe(service.description);
    expect(html).not.toMatch(/href="[^"]*universemt/i);
  });

  it('returns not-found for an unrecognized service', async () => {
    await expect(ServicePage({ params: Promise.resolve({ slug: 'not-a-service' }) })).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404');
  });
});
