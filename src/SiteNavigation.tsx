import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { profile } from './content';
import { services } from './services';

export const SiteHeader = ({ home = false, showGallery = false }: { home?: boolean; showGallery?: boolean }) => {
  const prefix = home ? '' : '/';
  return <Stack component="header" direction={{ xs: 'column', md: 'row' }} gap={{ xs: 2, md: 4 }} alignItems={{ xs: 'stretch', md: 'center' }} justifyContent="space-between" sx={{ position: 'sticky', top: 0, zIndex: 1100, py: { xs: 1.5, md: 2 }, bgcolor: 'background.default', borderBottom: 1, borderColor: 'divider' }}>
    <Stack direction="row" alignItems="center" gap={2} justifyContent="space-between">
      <Link href="/" underline="none" aria-label="Dmytro Kovalenko home" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minHeight: 44 }}><Box component="span" sx={{ width: 44, height: 44, display: 'grid', placeItems: 'center', bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 1, fontSize: 25, fontWeight: 600, letterSpacing: '-.08em' }}>dk.</Box><Box component="span" sx={{ fontSize: '.9rem', fontWeight: 500, lineHeight: 1.4 }}>Dmytro Kovalenko<Box component="span" sx={{ display: 'block', color: 'text.secondary', fontSize: '.7rem', fontWeight: 400 }}>Software that means business.</Box></Box></Link>
      <Typography variant="overline" color="text.secondary" sx={{ display: { xs: 'block', md: 'none' }, fontSize: '.65rem' }}>Calgary, CA</Typography>
    </Stack>
    <Stack component="nav" aria-label="Main navigation" direction="row" flexWrap={{ xs: 'nowrap', md: 'wrap' }} columnGap={{ xs: 1, sm: 1.5 }} rowGap={.5} alignItems="center" sx={{ overflowX: { xs: 'auto', md: 'visible' }, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }, '& > *': { flexShrink: 0 }, '& a:not(.MuiButton-root)': { display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: '.85rem', px: 1.5, border: 1, borderColor: 'divider', borderRadius: 100, '&:hover': { color: 'primary.main' } } }}>
      {showGallery ? <Link href={`${prefix}#website-work`} color="text.secondary">Websites</Link> : null}
      <Link href={`${prefix}#services`} color="text.secondary">Services</Link><Link href={`${prefix}#work`} color="text.secondary">Work</Link><Link href={`${prefix}#about`} color="text.secondary">About</Link><Link href={`${prefix}#experience`} color="text.secondary">Experience</Link><Button href={`${prefix}#contact`} variant="contained" data-cta="header" sx={{ minHeight: 44, px: 2.5, py: 1 }}>Discuss a project ↗</Button>
    </Stack>
  </Stack>;
};

export const SiteFooter = () => (
  <Box component="footer" sx={{ py: 4, borderTop: 1, borderColor: 'divider' }}>
    <Stack direction="row" flexWrap="wrap" gap={2.5} sx={{ mb: 3 }}>{services.map(service => <Link key={service.slug} href={`/services/${service.slug}`} color="text.secondary" sx={{ fontSize: '.8rem', py: 1, '&:hover': { color: 'primary.main' } }}>{service.shortName} in Calgary</Link>)}</Stack>
    <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="space-between"><Typography variant="body2" color="text.secondary" sx={{ fontSize: '.8rem' }}>© {new Date().getFullYear()} {profile.name} · Calgary, Alberta, Canada</Typography><Stack direction="row" gap={3}><Button href={profile.github} target="_blank" rel="noreferrer" color="inherit">GitHub ↗</Button><Button href={profile.linkedin} target="_blank" rel="noreferrer" color="inherit">LinkedIn ↗</Button></Stack></Stack>
  </Box>
);
