import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import InsightsOutlined from '@mui/icons-material/InsightsOutlined';
import AdminPanelSettingsOutlined from '@mui/icons-material/AdminPanelSettingsOutlined';

const publishedProjects = [
  {
    id: 'trackflow',
    name: 'TrackFlow',
    platform: 'Shopify app',
    destination: 'Shopify App Store',
    url: 'https://apps.shopify.com/trackflow-1',
    headline: 'Make store activity easier to understand.',
    description: 'I developed TrackFlow to help Shopify merchants understand customer actions in their online store. The app brings together web pixels and custom event monitoring for store analytics.',
    features: ['Pixel tracking and deployment', 'Real-time analytics collection', 'Custom customer event monitoring'],
    status: 'Published on the Shopify App Store',
    Icon: InsightsOutlined,
  },
  {
    id: 'admin-change-audit',
    name: 'Kovalenko Admin Change Audit',
    platform: 'WordPress plugin',
    destination: 'WordPress.org',
    url: 'https://en-ca.wordpress.org/plugins/kovalenko-admin-change-audit/',
    headline: 'Know what changed. Keep control of your site.',
    description: 'My WordPress plugin gives site owners a dedicated audit trail of administrative activity. It records content, login and plugin changes in an owner-only viewer, without requiring an external account or service.',
    features: ['Owner-only activity log with filters', 'Readable before-and-after content changes', 'Optional extra password and log retention'],
    status: 'Published on WordPress.org · Used on live sites',
    Icon: AdminPanelSettingsOutlined,
  },
] as const;

export const PublishedProjects = () => (
  <Box sx={{ mt: { xs: 7, md: 10 }, pt: 5, borderTop: 1, borderColor: 'divider' }}>
    <Typography variant="overline" color="primary.main">Built, published & maintained</Typography>
    <Typography component="h3" sx={{ fontSize: { xs: '1.6rem', md: '2.1rem' }, letterSpacing: '-.035em', mt: 1.5 }}>Tools that go beyond the portfolio.</Typography>
    <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 720 }}>A Shopify app and a WordPress plugin I developed and published for merchants and site owners. Practical examples of my platform development work.</Typography>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mt: 4 }}>
      {publishedProjects.map(({ Icon, ...project }) => <Box component="article" key={project.id} aria-labelledby={`${project.id}-title`} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Stack direction="row" gap={2} alignItems="center" justifyContent="space-between" sx={{ width: '100%', mb: 3 }}><Icon aria-hidden="true" sx={{ fontSize: 32, color: 'primary.main' }} /><Typography variant="overline" color="text.secondary">{project.platform}</Typography></Stack>
        <Typography id={`${project.id}-title`} component="h4" sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' }, lineHeight: 1.2, letterSpacing: '-.035em' }}>{project.name}</Typography>
        <Typography sx={{ mt: 2, fontWeight: 500 }}>{project.headline}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>{project.description}</Typography>
        <Box component="ul" sx={{ m: 0, mt: 2.5, mb: 3, pl: 2, '& li': { pl: .5, mb: 1, '&::marker': { color: 'primary.main' } } }}>{project.features.map(feature => <Typography key={feature} component="li" variant="body2" color="text.secondary">{feature}</Typography>)}</Box>
        <Box sx={{ mt: 'auto' }}><Typography variant="body2" color="text.secondary" sx={{ fontSize: '.75rem', mb: 1 }}>{project.status}</Typography><Button href={project.url} target="_blank" rel="noreferrer" endIcon={<ArrowOutward />}>View on {project.destination}</Button></Box>
      </Box>)}
    </Box>
  </Box>
);
