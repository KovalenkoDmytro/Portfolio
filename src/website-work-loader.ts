import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import type { WebsiteWork } from './website-work';

const supportedImages = new Set(['.webp', '.png', '.jpg', '.jpeg', '.avif']);
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const textField = (value: unknown): string | undefined => typeof value === 'string' && value.trim() ? value.trim() : undefined;

export const loadWebsiteWork = (directory = join(process.cwd(), 'public', 'work')): WebsiteWork[] => {
  if (!existsSync(directory)) return [];

  const metadataPath = join(directory, 'gallery.json');
  const metadata: unknown = existsSync(metadataPath) ? JSON.parse(readFileSync(metadataPath, 'utf8')) : {};
  if (!isRecord(metadata)) throw new Error('public/work/gallery.json must contain an object keyed by image filename.');

  const images = readdirSync(directory, { withFileTypes: true })
    .filter(entry => entry.isFile() && supportedImages.has(extname(entry.name).toLowerCase()))
    .map(entry => {
      const details = metadata[entry.name];
      if (details !== undefined && !isRecord(details)) throw new Error(`Invalid gallery metadata for ${entry.name}.`);
      const fields = isRecord(details) ? details : {};
      const fallbackTitle = entry.name.slice(0, -extname(entry.name).length).replace(/^\d+[-_\s]+/, '').replace(/[-_]+/g, ' ');
      const title = textField(fields.title) ?? fallbackTitle;
      return {
        order: typeof fields.order === 'number' && Number.isFinite(fields.order) ? fields.order : Number.MAX_SAFE_INTEGER,
        item: {
          id: entry.name,
          src: `/work/${encodeURIComponent(entry.name)}`,
          title,
          alt: textField(fields.alt) ?? `${title} — website screenshot`,
          industry: textField(fields.industry),
          location: textField(fields.location),
          contribution: textField(fields.contribution),
          platform: textField(fields.platform),
        } satisfies WebsiteWork,
      };
    });

  return images.sort((a, b) => a.order - b.order || a.item.id.localeCompare(b.item.id, 'en')).map(({ item }) => item);
};
