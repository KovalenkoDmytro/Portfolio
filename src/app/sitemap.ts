import type { MetadataRoute } from 'next';
import { siteUrl } from '../seo';
import { services } from '../services';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl.href, changeFrequency: 'monthly', priority: 1 }, ...services.map(service => ({ url: new URL(`/services/${service.slug}`, siteUrl).href, changeFrequency: 'monthly' as const, priority: 0.8 }))];
}
