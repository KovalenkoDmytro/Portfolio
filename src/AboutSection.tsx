import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContactButton } from './ContactButton';
import { SectionLabel } from './components';
import { profile } from './content';

export const AboutSection = () => (
  <Box id="about" component="section" aria-labelledby="about-title" sx={{ py: { xs: 8, md: 11 }, borderTop: 1, borderColor: 'divider' }}>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 10, xl: 14 }, '& p': { maxWidth: '68ch' } }}>
      <Box><SectionLabel>03 / The person behind the product</SectionLabel><Typography id="about-title" variant="h2" sx={{ mt: 2 }}>Business context.<br />Engineering depth.<br /><Box component="span" sx={{ color: 'primary.main' }}>Personal ownership.</Box></Typography></Box>
      <Box>
        <Typography sx={{ fontSize: { xs: '1.2rem', md: '1.4rem' }, lineHeight: 1.65 }}>I’m Dmytro, a Calgary-based developer who cares as much about the problem as the code.</Typography>
        <Typography color="text.secondary" sx={{ mt: 2.5 }}>My work spans ecommerce, digital marketing, real estate, financial applications, hospitality SaaS and ERP systems. I connect backend architecture, thoughtful interfaces and the infrastructure that keeps a product running.</Typography>
        <Typography color="text.secondary" sx={{ mt: 2.5 }}>I also build WordPress plugins, WooCommerce solutions and Shopify apps, and extend WordPress into custom CRM and operational tools. For a business owner, that means a direct conversation with the person building your software. For an engineering team, it means a colleague who can take responsibility across the stack, work through complexity and help others move forward.</Typography>
        <Typography color="text.secondary" sx={{ mt: 2.5 }}>SEO and digital advertising services are also available, from technical and on-page SEO to online campaign setup and optimization. I connect websites and online stores to Google Tag Manager (GTM), Google Analytics 4 (GA4), Google Ads, Meta Pixel, TikTok Pixel and Microsoft Clarity to help teams measure enquiries, purchases and visitor behaviour.</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 3 }}>{['Laravel / PHP', 'React / Next.js', 'TypeScript', 'SQL / Redis', 'Docker / CI/CD', 'FlutterFlow', 'WordPress / WooCommerce', 'Shopify apps', 'Custom plugins / CRM', 'GTM / GA4', 'Google Ads', 'Meta / TikTok Pixel', 'Microsoft Clarity'].map(label => <Typography key={label} variant="body2" sx={{ px: 1.5, py: .75, border: 1, borderColor: 'divider', borderRadius: 1 }}>{label}</Typography>)}</Stack>
      </Box>
    </Box>
    <Box sx={{ mt: 6, p: { xs: 3, md: 4 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, alignItems: 'center', gap: 3, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}>
      <Box><Typography variant="overline" color="primary.main">For employers & engineering teams</Typography><Typography component="h3" sx={{ fontSize: '1.5rem', mt: 1 }}>Looking for someone who can own the whole picture?</Typography><Typography color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>Explore my experience in Laravel, React, API integrations and production systems, then let’s discuss your team and the role.</Typography></Box>
      <Stack spacing={1}><ContactButton source="employer" intent="Hiring / opportunity" variant="outlined">Discuss a role</ContactButton><Button href={profile.linkedin} target="_blank" rel="noreferrer" color="inherit">View LinkedIn ↗</Button></Stack>
    </Box>
  </Box>
);
