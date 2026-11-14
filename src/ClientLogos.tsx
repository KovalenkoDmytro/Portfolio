import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { clientLogos } from './client-logos';
import { SectionLabel } from './components';

export const ClientLogos = () => (
  <Box component="section" id="client-work" aria-labelledby="client-work-title" sx={{ py: { xs: 8, md: 10 }, borderTop: 1, borderColor: 'divider' }}>
    <SectionLabel>Selected client work</SectionLabel>
    <Typography id="client-work-title" variant="h2" sx={{ mt: 2 }}>Work across many teams.</Typography>
    <Typography color="text.secondary" sx={{ mt: 2, maxWidth: '60ch' }}>Companies whose projects I contributed to while working with my teams.</Typography>
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: { xs: 4, md: 5 }, display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))', lg: 'repeat(6, minmax(0, 1fr))' }, gap: 1.5 }}>
      {clientLogos.map(logo => <Box component="li" key={logo.file} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: 100, md: 116 }, p: 2, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'light' in logo && logo.light ? '#fff' : 'background.paper' }}>
        <Image src={`/work/${encodeURIComponent(logo.file)}`} alt={`${logo.name} logo`} width={180} height={72} sizes="(max-width: 599px) 38vw, (max-width: 899px) 25vw, 150px" style={{ display: 'block', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </Box>)}
    </Box>
  </Box>
);
