import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ThemeProvider } from '@mui/material/styles';
import { App } from './App';
import { theme } from './theme';
import { profile } from './content';
import { CodingComputer } from './CodingComputer';
import { MotionPausedContext } from './motion';

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

  it('offers contact and both confirmed project destinations', () => {
    expect(html).toContain(`href="mailto:${profile.email}"`);
    expect(html).toContain('https://mprealestate.dmytro-kovalenko.ca/demo');
    expect(html).toContain('href="https://arcs.dmytro-kovalenko.ca/"');
  });

  it('provides accessible controls for the coding workstation', () => {
    expect(html).toContain('aria-label="Code examples"');
    expect(html).toContain('Portfolio.tsx');
    expect(html).toContain('api.php');
    expect(html).toContain('illustrative build loop');
    expect(html).not.toContain('Run demo');
    expect(html).not.toContain('Pause motion');
  });

  it('keeps the code readable when motion is paused', () => {
    const pausedHtml = renderToStaticMarkup(
      <ThemeProvider theme={theme}><MotionPausedContext.Provider value={true}>
        <CodingComputer />
      </MotionPausedContext.Provider></ThemeProvider>,
    );
    expect(pausedHtml).toContain('illustrative React and TypeScript component code');
    expect(pausedHtml).toContain('illustrative build loop');
    const codeMarkup = pausedHtml.match(/<pre\b[^>]*>[\s\S]*?<\/pre>/)?.[0];
    expect(codeMarkup).toBeDefined();
    expect(codeMarkup).not.toMatch(/opacity:\s*0(?:;|")/);
  });
});
