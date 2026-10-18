import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import { services } from '../../../services';
import { profile } from '../../../content';
import { SiteHeader, SiteFooter } from '../../../SiteNavigation';
import { areaServed, jsonLd, siteUrl } from '../../../seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(service => ({ slug: service.slug }));
}

const findService = (slug: string) => services.find(service => service.slug === slug) ?? notFound();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = findService((await params).slug);
  const url = `/services/${service.slug}`;
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: url, languages: { 'en-CA': url, 'en-US': url, 'x-default': url } },
    openGraph: { type: 'website', locale: 'en_CA', title: service.title, description: service.description, url, siteName: `${profile.name} — Development in Calgary` },
    twitter: { card: 'summary', title: service.title, description: service.description },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = findService((await params).slug);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.name,
    description: service.description,
    url: new URL(`/services/${service.slug}`, siteUrl).href,
    areaServed,
    provider: { '@id': `${siteUrl.href}#business` },
  };
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl.href },
      { '@type': 'ListItem', position: 2, name: 'Services', item: new URL('/#services', siteUrl).href },
      { '@type': 'ListItem', position: 3, name: service.shortName, item: new URL(`/services/${service.slug}`, siteUrl).href },
    ],
  };

  return <Container maxWidth={false} sx={{ px: { xs: 3, md: 5, lg: 7, xl: 8 } }}>
    <Link href="#main" sx={{ position: 'absolute', top: -100, left: 24, zIndex: 10, bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, '&:focus': { top: 16 } }}>Skip to content</Link>
    <SiteHeader />
    <Box component="main" id="main" sx={{ py: { xs: 6, md: 10 } }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      <Stack component="nav" aria-label="Breadcrumb" direction="row" flexWrap="wrap" gap={1} sx={{ mb: 5 }}><Link href="/" color="text.secondary">Home</Link><Typography aria-hidden="true">/</Typography><Link href="/#services" color="text.secondary">Services</Link><Typography aria-hidden="true">/</Typography><Typography aria-current="page">{service.shortName}</Typography></Stack>
      <Typography variant="overline" color="primary.main">Calgary, Alberta · Serving Canada & the United States</Typography>
      <Typography component="h1" sx={{ fontSize: { xs: '2.75rem', md: '4.5rem' }, letterSpacing: '-.055em', lineHeight: 1.08, maxWidth: 850, mt: 3 }}>{service.title}</Typography>
      <Typography sx={{ fontSize: { xs: '1.25rem', md: '1.7rem' }, mt: 3, color: 'primary.main' }}>{service.headline}</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 720, mt: 3 }}>{service.summary}</Typography>
      <Button href="/#contact" data-cta="service-hero" variant="contained" endIcon={<ArrowOutward />} sx={{ mt: 4 }}>Discuss your project</Button>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' }, gap: { xs: 5, md: 8, xl: 12 }, '& p': { maxWidth: '70ch' }, my: { xs: 7, md: 10 }, pt: 5, borderTop: 1, borderColor: 'divider' }}>
        <Box><Typography variant="h2">Built around your business.</Typography><Typography color="text.secondary" sx={{ mt: 3 }}>{service.overview}</Typography><Typography color="text.secondary" sx={{ mt: 3 }}>{service.detail}</Typography></Box>
        <Box sx={{ bgcolor: 'background.paper', p: { xs: 3, md: 4 }, borderRadius: 2, border: 1, borderColor: 'divider' }}><Typography variant="h2" sx={{ fontSize: '1.6rem' }}>What we can build together</Typography><Box component="ul" sx={{ pl: 2, m: 0, mt: 3 }}>{service.deliverables.map(item => <Box component="li" key={item} sx={{ mb: 2.5, pl: 1, color: 'text.secondary', '&::marker': { color: 'primary.main' } }}>{item}</Box>)}</Box></Box>
      </Box>
      <Box component="section" aria-labelledby="fit-title" sx={{ py: 5, borderTop: 1, borderColor: 'divider', maxWidth: 820 }}><Typography id="fit-title" variant="h2">Is this the right fit?</Typography><Typography color="text.secondary" sx={{ mt: 3 }}>{service.fit}</Typography><Typography color="text.secondary" sx={{ mt: 3 }}>{service.scope}</Typography><Typography sx={{ mt: 3 }}>You work directly with me, Dmytro Kovalenko, a senior full-stack developer based in Calgary with 7+ years of experience building production software.</Typography><Button href="/#work" endIcon={<ArrowOutward />} sx={{ mt: 2 }}>Explore my project work</Button></Box>
      <Box sx={{ mt: 5, p: { xs: 3, md: 4 }, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}><Typography component="h2" sx={{ fontSize: '1.6rem' }}>Let’s discuss your next step.</Typography><Typography color="text.secondary" sx={{ mt: 1, maxWidth: '65ch' }}>Tell me about your business, your priorities and what you want to improve. We can define the right scope together.</Typography><Stack direction="row" flexWrap="wrap" alignItems="center" gap={3} sx={{ mt: 3 }}><Button href="/#contact" variant="contained" data-cta="service-bottom" endIcon={<ArrowOutward />}>Discuss your project</Button><Link href={`mailto:${profile.email}`}>Prefer email? ↗</Link></Stack></Box>
      <Box component="section" aria-labelledby="related-title" sx={{ pt: 5, mt: 3, borderTop: 1, borderColor: 'divider' }}><Typography id="related-title" variant="h2" sx={{ fontSize: '1.6rem' }}>More ways I can help</Typography><Stack direction="row" flexWrap="wrap" gap={3} sx={{ mt: 3 }}>{services.filter(item => item.slug !== service.slug).map(item => <Link key={item.slug} href={`/services/${item.slug}`} sx={{ py: 1 }}>{item.name} ↗</Link>)}</Stack></Box>
    </Box>
    <SiteFooter />
  </Container>;
}
