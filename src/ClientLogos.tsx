import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { clientLogos } from './client-logos';
import { SectionLabel } from './components';

// Keep the DOM and wide-screen order aligned; adjust the visual order at
// narrower breakpoints so adjacent cards alternate wherever possible.
const darkLogos = clientLogos.filter(logo => !('light' in logo && logo.light));
const lightLogos = clientLogos.filter(logo => 'light' in logo && logo.light);
const cardPosition = (rank: number, light: boolean, columns: number) => {
  let seen = 0;
  for (let position = 0; position < clientLogos.length; position++) {
    const isLight = (Math.floor(position / columns) + position % columns) % 2 === 1;
    if (isLight === light && seen++ === rank) return position;
  }
  return clientLogos.length + rank;
};
const orderedLogos = clientLogos.map(logo => {
  const light = 'light' in logo && logo.light;
  const rank = (light ? lightLogos : darkLogos).findIndex(item => item.file === logo.file);
  return { logo, light, rank };
}).sort((a, b) => cardPosition(a.rank, a.light, 6) - cardPosition(b.rank, b.light, 6));

export const ClientLogos = () => (
  <Box component="section" id="client-work" aria-labelledby="client-work-title" sx={{ py: { xs: 8, md: 10 }, borderTop: 1, borderColor: 'divider' }}>
    <SectionLabel>Selected client work</SectionLabel>
    <Typography id="client-work-title" variant="h2" sx={{ mt: 2 }}>Work across many teams.</Typography>
    <Typography color="text.secondary" sx={{ mt: 2, maxWidth: '60ch' }}>Companies whose projects I contributed to while working with my teams.</Typography>
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: { xs: 4, md: 5 }, display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))', lg: 'repeat(6, minmax(0, 1fr))' }, gap: 1.5 }}>
      {orderedLogos.map(({ logo, light, rank }) => <Box component="li" key={logo.file} sx={{ order: { xs: cardPosition(rank, light, 2), sm: cardPosition(rank, light, 3), md: cardPosition(rank, light, 4), lg: cardPosition(rank, light, 6) }, display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: 100, md: 116 }, p: 2, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: light ? '#fff' : 'background.paper' }}>
        <Image src={`/work/${encodeURIComponent(logo.file)}`} alt={`${logo.name} logo`} width={180} height={72} sizes="(max-width: 599px) 38vw, (max-width: 899px) 25vw, 150px" style={{ display: 'block', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </Box>)}
    </Box>
  </Box>
);
