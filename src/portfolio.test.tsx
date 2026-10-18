import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ThemeProvider } from '@mui/material/styles';
import { App } from './App';
import { theme } from './theme';
import { profile } from './content';

describe('Portfolio accessibility and navigation', () => {
  const html = renderToStaticMarkup(<ThemeProvider theme={theme}><App /></ThemeProvider>);

  it('exposes one primary heading and resolves all local fragment links', () => {
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
    for (const match of html.matchAll(/href="#([^"]+)"/g)) expect(ids.has(match[1])).toBe(true);
  });

  it('provides named project panels with matching tab controls', () => {
    const panels = [...html.matchAll(/role="tabpanel"[^>]*id="([^"]+)"[^>]*aria-labelledby="([^"]+)"/g)];
    expect(panels).toHaveLength(2);
    for (const panel of panels) {
      expect(html).toContain(`id="${panel[2]}"`);
      expect(html).toContain(`aria-controls="${panel[1]}"`);
    }
  });

  it('offers contact and the confirmed project destinations', () => {
    expect(html).toContain(`href="mailto:${profile.email}"`);
    expect(html).toContain('https://mprealestate.dmytro-kovalenko.ca/demo');
    expect(html).toContain('href="https://arcs.dmytro-kovalenko.ca/"');
    expect(html).toContain('href="https://apps.shopify.com/trackflow-1"');
    expect(html).toContain('href="https://en-ca.wordpress.org/plugins/kovalenko-admin-change-audit/"');
    expect(html).toContain('Digital marketing agency');
    expect(html).toContain('Software company');
    expect(html).toContain('Ecommerce software company');
    expect(html).not.toContain('Breakwater Vantage');
  });

  it('provides contextual calls to action that lead to the contact form', () => {
    for (const source of ['hero', 'services', 'selected-projects', 'employer', 'experience']) {
      expect(html).toMatch(new RegExp(`href="#contact"[^>]*data-cta="${source}"`));
    }
    expect(html).toContain('data-enquiry="Hiring / opportunity"');
    expect(html).toContain('id="contact-enquiry"');
    expect(html).toContain('name="message"');
  });

  it('renders an accessible responsive portrait in the initial HTML', () => {
    expect(html).toContain('alt="Dmytro Kovalenko, Senior Full-Stack Developer in Calgary"');
    expect(html).toContain('developer.webp');
    expect(html).toContain('width="650" height="939"');
    expect(html).toContain('srcSet=');
    expect(html).not.toContain('loading="lazy"');
    expect(html).not.toContain('aria-label="Code examples"');
  });
});
