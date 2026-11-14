import Image from 'next/image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowOutward from '@mui/icons-material/ArrowOutward';

const projects = [
  {
    id: 'estate', name: 'EstateHub', category: 'Real estate · Web application',
    headline: 'A smoother path from property search to closing.',
    description: 'A real estate platform connecting buyers, sellers and lawyers in one workspace for properties, offers, documents and transaction milestones. Designed and built independently with Laravel, React and TypeScript.',
    url: 'https://mprealestate.dmytro-kovalenko.ca/demo', action: 'Explore the live demo', note: 'Demo accounts included · No signup required',
    poster: '/works/estatehub.webp', alt: 'EstateHub seller workspace showing appointments and property listings',
  },
  {
    id: 'arc', name: 'ARC', category: 'Financial analytics · Web application',
    headline: 'Make sense of company fundamentals faster.',
    description: 'A financial research application bringing US and Canadian company data, personal watchlists and sector-aware scoring together. Built with Laravel, React and TypeScript to make analysis easier to explore.',
    url: 'https://arcs.dmytro-kovalenko.ca/', action: 'Explore ARC live', note: 'Adaptive Rules for Capital Score',
    poster: '/works/ARC.webp', alt: 'ARC financial research dashboard showing a company analysis',
  },
] as const;

export const FeaturedProjects = () => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: { xs: 3, md: 4 } }}>
    {projects.map(project => <Box component="article" key={project.id} aria-labelledby={`${project.id}-title`} sx={{ display: 'flex', flexDirection: 'column', minWidth: 0, border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden', bgcolor: 'background.paper' }}>
        <Box sx={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', bgcolor: 'background.default', display: 'grid', placeItems: 'center', backgroundImage: 'radial-gradient(ellipse at 50% 100%, rgba(210,252,134,.13), transparent 65%)' }}>
          <Image src={project.poster} alt={project.alt} fill sizes="(max-width: 899px) calc(100vw - 48px), (max-width: 1439px) 50vw, 660px" style={{ objectFit: 'cover', objectPosition: 'top' }} />
        </Box>
        <Stack sx={{ p: { xs: 3, md: 4 }, flexGrow: 1 }} alignItems="flex-start">
          <Typography variant="overline" color="primary.main">{project.category}</Typography>
          <Typography component="h3" id={`${project.id}-title`} sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, letterSpacing: '-.045em', lineHeight: 1.1, mt: 1.5 }}>{project.name}</Typography>
          <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.4, mt: 2 }}>{project.headline}</Typography>
          <Typography color="text.secondary" sx={{ mt: 2, mb: 3 }}>{project.description}</Typography>
          <Box sx={{ mt: 'auto' }}><Button href={project.url} target="_blank" rel="noreferrer" endIcon={<ArrowOutward />}>{project.action}</Button><Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>{project.note}</Typography></Box>
        </Stack>
      </Box>)}
  </Box>
);
