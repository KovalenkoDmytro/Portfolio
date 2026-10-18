import type { Metadata } from 'next';
import { profile } from './content';
import { faqs, services } from './services';

export const siteUrl = new URL('https://dmytro-kovalenko.ca');
export const siteTitle = `Calgary Web & App Developer | ${profile.name}`;
export const siteDescription = 'Calgary developer for websites, web and mobile apps, ERP, WordPress, WooCommerce and Shopify. SEO and digital advertising services also available.';
export const serviceAreas = ['Calgary', 'Alberta', 'Canada', 'United States'] as const;
const calgary = { '@type': 'City', name: 'Calgary', containedInPlace: { '@type': 'AdministrativeArea', name: 'Alberta, Canada' } } as const;
export const areaServed = [
  calgary,
  { '@type': 'AdministrativeArea', name: 'Alberta' },
  { '@type': 'Country', name: 'Canada' },
  { '@type': 'Country', name: 'United States' },
] as const;

export const siteMetadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteTitle, template: `%s | ${profile.name}` },
  description: siteDescription,
  authors: [{ name: profile.name, url: siteUrl }],
  keywords: ['Calgary web developer', 'website development Calgary', 'web application development', 'mobile app development', 'custom ERP software', 'WordPress developer', 'WooCommerce developer', 'Shopify app developer', 'Laravel developer', 'Next.js developer', 'Canada', 'United States'],
  category: 'technology',
  alternates: {
    canonical: '/',
    languages: { 'en-CA': '/', 'en-US': '/', 'x-default': '/' },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  other: {
    'geo.region': 'CA-AB',
    'geo.placename': 'Calgary',
    'geo.position': '51.0447;-114.0719',
    ICBM: '51.0447, -114.0719',
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: '/',
    siteName: `${profile.name} — Portfolio`,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: { card: 'summary_large_image', title: siteTitle, description: siteDescription },
  icons: { icon: '/favicon.svg' },
};

export const profileStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${siteUrl.href}#profile`,
  url: siteUrl.href,
  name: siteTitle,
  description: siteDescription,
  mainEntity: {
    '@type': 'Person',
    '@id': `${siteUrl.href}#person`,
    name: profile.name,
    url: siteUrl.href,
    jobTitle: 'Senior Full-Stack Developer',
    sameAs: [profile.github, profile.linkedin],
    image: new URL('/developer.webp', siteUrl).href,
    homeLocation: { '@type': 'City', name: 'Calgary', containedInPlace: { '@type': 'AdministrativeArea', name: 'Alberta, Canada' } },
    knowsAbout: ['Website development', 'Web application development', 'Mobile app development', 'ERP software', 'WordPress development', 'WooCommerce', 'Shopify app development', 'WordPress plugins', 'Custom CRM solutions', 'API integrations', 'Laravel', 'React', 'Next.js', 'TypeScript', 'PHP', 'FlutterFlow', 'Google Tag Manager', 'Google Analytics 4', 'Google Ads conversion tracking', 'Meta Pixel', 'TikTok Pixel', 'Microsoft Clarity', 'Search engine optimization', 'Digital advertising'],
  },
};

export const businessStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteUrl.href}#business`,
  name: `${profile.name} — Web & App Development`,
  url: siteUrl.href,
  image: new URL('/developer.webp', siteUrl).href,
  description: siteDescription,
  email: profile.email,
  founder: { '@id': `${siteUrl.href}#person` },
  address: { '@type': 'PostalAddress', addressLocality: 'Calgary', addressRegion: 'AB', addressCountry: 'CA' },
  geo: { '@type': 'GeoCoordinates', latitude: 51.0447, longitude: -114.0719 },
  areaServed,
  knowsLanguage: 'en',
  sameAs: [profile.github, profile.linkedin],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: services.map(service => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: service.title, url: new URL(`/services/${service.slug}`, siteUrl).href },
    })),
  },
};

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl.href}#website`,
  url: siteUrl.href,
  name: `${profile.name} — Calgary Web & App Developer`,
  inLanguage: 'en-CA',
  publisher: { '@id': `${siteUrl.href}#person` },
};

export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
};

export const jsonLd = (data: object) => JSON.stringify(data).replace(/</g, '\u003c');
