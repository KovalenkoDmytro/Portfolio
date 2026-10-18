import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { ThemeProvider } from '@mui/material/styles';
import { afterEach, describe, expect, it } from 'vitest';
import { loadWebsiteWork } from './website-work-loader';
import { WebsiteGallery } from './WebsiteGallery';
import { theme } from './theme';
import { ContactIntentProvider } from './contact-intent';

const temporaryDirectories: string[] = [];
const fixtureDirectory = () => {
  const directory = mkdtempSync(join(tmpdir(), 'portfolio-gallery-'));
  temporaryDirectories.push(directory);
  return directory;
};

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true });
});

describe('Website screenshot gallery', () => {
  it('discovers uploaded images, ignores documents and folders, and encodes filenames', () => {
    const directory = fixtureDirectory();
    writeFileSync(join(directory, '01-Example Company.WEBP'), 'image fixture');
    writeFileSync(join(directory, 'README.md'), 'not an image');
    mkdirSync(join(directory, 'folder.png'));
    expect(loadWebsiteWork(directory)).toEqual([{
      id: '01-Example Company.WEBP',
      src: '/work/01-Example%20Company.WEBP',
      title: 'Example Company',
      alt: 'Example Company — website screenshot',
      industry: undefined,
      location: undefined,
      contribution: undefined,
      platform: undefined,
    }]);
  });

  it('uses the supplied captions and ordering without inventing client claims', () => {
    const directory = fixtureDirectory();
    writeFileSync(join(directory, 'a.png'), 'image fixture');
    writeFileSync(join(directory, 'b.jpg'), 'image fixture');
    writeFileSync(join(directory, 'gallery.json'), JSON.stringify({ 'b.jpg': { title: 'Business B', contribution: 'API integration through an agency', order: 1 } }));
    const items = loadWebsiteWork(directory);
    expect(items.map(item => item.id)).toEqual(['b.jpg', 'a.png']);
    expect(items[0].contribution).toBe('API integration through an agency');
    expect(items[0].location).toBeUndefined();
    expect(items[0].industry).toBeUndefined();
  });

  it('makes invalid metadata visible instead of silently publishing incorrect captions', () => {
    const directory = fixtureDirectory();
    writeFileSync(join(directory, 'gallery.json'), '[]');
    expect(() => loadWebsiteWork(directory)).toThrow('must contain an object');
  });

  it('hides an empty gallery from the public page', () => {
    expect(renderToStaticMarkup(<WebsiteGallery items={[]} />)).toBe('');
    expect(loadWebsiteWork(join(fixtureDirectory(), 'missing'))).toEqual([]);
  });

  it('shows every real project with named preview controls and server-rendered captions', () => {
    const items = Array.from({ length: 7 }, (_, number) => ({ id: `project-${number}`, src: `/work/project-${number}.webp`, title: `Project ${number}`, alt: `Project ${number} homepage`, contribution: 'WordPress development' }));
    const html = renderToStaticMarkup(<ThemeProvider theme={theme}><ContactIntentProvider><WebsiteGallery items={items} /></ContactIntentProvider></ThemeProvider>);
    expect(html.match(/aria-haspopup="dialog"/g)).toHaveLength(7);
    for (const item of items) {
      expect(html).toContain(`aria-label="Open ${item.title} website preview"`);
      expect(html).toContain(item.alt);
    }
    expect(html).toContain('My contribution:');
    expect(html).not.toContain('role="dialog"');
  });
});
