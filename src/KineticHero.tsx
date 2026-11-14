import Image from 'next/image';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ContactButton } from './ContactButton';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import { profile } from './content';
import { CodeCompanion } from './CodeCompanion';

export const KineticHero = () => (
  <Box component="section" aria-labelledby="intro" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 9 } }}>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr', lg: '1.3fr 1fr', xl: '1.25fr 1fr' }, gap: { xs: 5, md: 6, lg: 9, xl: 12 }, alignItems: 'center' }}>
      <Box sx={{ minWidth: 0 }}>
        <Stack direction="row" gap={1.5} alignItems="center" sx={{ mb: 3 }}>
          <Box component="span" sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0 }} />
          <Typography variant="overline" color="text.secondary">Independent developer · Calgary, Canada</Typography>
        </Stack>
        <Typography component="h1" id="intro" sx={{ fontSize: { xs: 'clamp(2.8rem, 9vw, 4.6rem)', md: 'clamp(3.6rem, 5.6vw, 5.4rem)', xl: 'clamp(5.4rem, 5.5vw, 6.4rem)' }, fontWeight: 500, lineHeight: 1.04, letterSpacing: '-.055em' }}>
          Websites. Apps.<br />Business software.<br /><Box component="span" sx={{ color: 'primary.main' }}>Built around you.</Box>
        </Typography>
        <Typography sx={{ mt: 3.5, maxWidth: 640, fontSize: { xs: '1.05rem', md: '1.15rem', xl: '1.25rem' }, color: 'text.secondary' }}>
          I’m Dmytro Kovalenko, a senior full-stack developer in Calgary. I build websites, web and mobile applications, and custom ERP systems that help businesses work better.
        </Typography>
        <Stack direction="row" gap={1.5} flexWrap="wrap" sx={{ mt: 4 }}>
          <ContactButton source="hero">Let’s discuss your project</ContactButton>
          <Button href="#work" color="inherit" endIcon={<ArrowDownward />}>See my work</Button>
        </Stack>
        <CodeCompanion />
      </Box>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: { xs: 410, md: 430, lg: 480, xl: 520 }, justifySelf: { xs: 'center', md: 'end' } }}>
        <Box component="figure" sx={{ position: 'relative', m: 0, overflow: 'hidden', borderRadius: 3, border: 1, borderColor: 'divider', bgcolor: 'background.paper', '& img': { display: 'block', width: '100%', height: 'auto' } }}>
          <Image src="/developer.webp" alt="Dmytro Kovalenko, Senior Full-Stack Developer in Calgary" width={650} height={939} sizes="(max-width: 899px) min(410px, calc(100vw - 48px)), (max-width: 1199px) min(430px, 42vw), (max-width: 1535px) 480px, 520px" preload />
          <Stack component="figcaption" direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{ px: 3, py: 2.5, borderTop: 1, borderColor: 'divider' }}>
            <Box><Typography sx={{ fontWeight: 600 }}>{profile.name}</Typography><Typography variant="body2" color="text.secondary">Senior Full-Stack Developer</Typography></Box>
            <Typography variant="overline" color="primary.main">YYC / CA</Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, mt: { xs: 6, md: 9 }, borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
      {[
        { value: '7+', label: 'Years building production software', context: 'From ERP platforms to fintech' },
        { value: '~$50k', label: 'Annual SaaS licensing savings', context: 'Custom platform at GrowME Marketing' },
        { value: '38 hotels', label: 'Supported by a hospitality SaaS', context: 'Backend architecture at WeBeeline' },
      ].map(item => <Box key={item.label} sx={{ py: 3.5, pr: 2 }}>
        <Typography sx={{ fontSize: { xs: '2.4rem', md: '3rem' }, lineHeight: 1.1, letterSpacing: '-.05em' }}>{item.value}</Typography>
        <Typography variant="body2" sx={{ mt: 1.5 }}>{item.label}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: .5, fontSize: '.8rem' }}>{item.context}</Typography>
        {item.value === '38 hotels' && <Link href="https://www.meininger-hotels.com/en/hotels/" target="_blank" rel="nofollow noopener noreferrer" aria-label="Visit MEININGER Hotels (opens in a new tab)" underline="none" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, mt: 2, pr: 1.5, border: 1, borderColor: 'divider', borderRadius: 2, color: 'text.primary', transition: 'border-color .2s, background-color .2s', '&:hover': { borderColor: 'primary.main', bgcolor: 'background.paper' } }}>
          <Box sx={{ display: 'grid', placeItems: 'center', width: 48, height: 48, bgcolor: '#fff', borderRadius: '7px', flexShrink: 0 }}><Image src="/logos/MEININGER_logo.svg" alt="" width={42} height={42} /></Box>
          <Box><Typography component="span" sx={{ display: 'block', fontSize: '.82rem', fontWeight: 600, lineHeight: 1.3 }}>MEININGER</Typography><Typography component="span" color="text.secondary" sx={{ display: 'block', fontSize: '.7rem', lineHeight: 1.3 }}>Explore hotels</Typography></Box>
          <ArrowOutward aria-hidden="true" sx={{ fontSize: 16, color: 'primary.main', ml: .5 }} />
        </Link>}
      </Box>)}
    </Box>
  </Box>
);
