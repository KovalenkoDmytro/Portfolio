import { LazyMotion } from 'motion/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowOutward from '@mui/icons-material/ArrowOutward';

import useMediaQuery from '@mui/material/useMediaQuery';
import { ProjectAccordion, Reveal, SectionLabel, TechTag } from './components';
import { m } from 'motion/react';
import { MotionPausedContext } from './motion';
import { KineticHero } from './KineticHero';
import { AboutSection } from './AboutSection';
import { EstateVisual, ArcVisual } from './ProjectVisuals';
import { profile } from './content';
import { ExperienceSection } from './ExperienceSection';
import { AmbientBackground } from './AmbientBackground';

const loadMotionFeatures = async () => (await import('./motion-features')).features;

const projectDetails = [
  { title: 'Architecture & ownership', content: 'I designed and built EstateHub solo: the Laravel REST API, PostgreSQL schema, Redis queues and React/TypeScript frontend. The domain model connects multiple participants across an eight-stage transaction lifecycle.' },
  { title: 'Access & workflow', content: 'Four user types, role-based permissions and JWT authentication. Buyers, sellers and lawyers share a structured workspace for offers, documents, appointments and milestones, with Docker-based deployment.' },
];

export const App = () => {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const motionPaused = reducedMotion;
  return <LazyMotion features={loadMotionFeatures} strict><MotionPausedContext.Provider value={motionPaused}><Box className={motionPaused ? 'motion-paused' : ''} sx={{ overflow: 'clip', position: 'relative', isolation: 'isolate' }}>
    <AmbientBackground />
    <Link href="#main" sx={{ position: 'absolute', top: -100, left: 24, zIndex: 10, bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, '&:focus': { top: 16 } }}>Skip to content</Link>
    <Container maxWidth="xl" sx={{ px: { xs: 3, md: 7 }, position: 'relative', zIndex: 1 }}>
      <Stack component="header" direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Link href="#" aria-label="Dmytro Kovalenko home" color="text.primary" sx={{ fontSize: 28, fontWeight: 600, letterSpacing: '-.07em', minWidth: 44, minHeight: 44 }}>dk<Box component="span" sx={{ color: 'primary.main' }}>.</Box></Link>
        <Stack component="nav" aria-label="Main navigation" direction="row" spacing={{ xs: 1.5, sm: 4 }} alignItems="center" sx={{ '& a': { py: 1.5, fontSize: '.9375rem', transition: 'color .2s', '&:hover': { color: 'primary.main' } } }}>
          <Link href="#work" color="text.primary">Work</Link><Link href="#about" color="text.primary">About</Link><Link href="#contact" color="text.primary">Let’s talk ↗</Link>
        </Stack>
      </Stack>
      <Box component="main" id="main">
        <KineticHero />

        <Box id="work" component="section" aria-labelledby="work-title" sx={{ pt: 8, pb: 10 }}>
          <Reveal><Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'flex-end' }} spacing={3} sx={{ mb: 6 }}><Box><SectionLabel>01 / Selected work</SectionLabel><Typography id="work-title" variant="h2" sx={{ fontSize: { xs: '3rem', md: '4.4rem' }, mt: 2 }}>Ideas made real.</Typography></Box><Typography color="text.secondary" sx={{ maxWidth: 320 }}>Two products. Different challenges.<br />End-to-end engineering.</Typography></Stack></Reveal>
          <Reveal><Box component={m.article} initial={motionPaused ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} animate={motionPaused ? { opacity: 1 } : undefined} viewport={{ once: true, amount: .14 }} transition={{ duration: motionPaused ? 0 : .65 }} aria-labelledby="estate-title" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.08fr 1fr' }, gap: { xs: 4, md: 7 }, alignItems: 'center', mb: 10 }}>
            <EstateVisual />
            <Box><Stack direction="row" flexWrap="wrap" gap={2} sx={{ mb: 2 }}><Typography variant="overline" color="text.secondary">01 / Proptech</Typography><Typography variant="overline" color="primary">Solo founder & engineer</Typography></Stack><Typography id="estate-title" variant="h3" sx={{ fontSize: '3.3rem' }}>EstateHub</Typography><Typography sx={{ fontSize: '1.4rem', lineHeight: 1.4, mt: 2 }}>A real estate transaction.<br />Connected from start to finish.</Typography><Typography color="text.secondary" sx={{ my: 3 }}>One workspace for buyers, sellers and lawyers. From property discovery to offers, documents and closing — built to make a complex process easier to follow.</Typography><Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>{['Laravel', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Mapbox'].map(tag => <TechTag key={tag}>{tag}</TechTag>)}</Stack>
              <ProjectAccordion title={projectDetails[0].title} content={projectDetails[0].content} icon="architecture" id="estate-architecture" />
              <ProjectAccordion title={projectDetails[1].title} content={projectDetails[1].content} icon="workflow" id="estate-workflow" />
              <Button href="https://mprealestate.dmytro-kovalenko.ca/demo" target="_blank" rel="noreferrer" endIcon={<ArrowOutward />} sx={{ mt: 3, pl: 0 }}>Explore the live demo</Button><Typography variant="body2" color="text.secondary">Preconfigured demo accounts · No signup required</Typography>
            </Box>
          </Box></Reveal>
          <Reveal><Box component={m.article} initial={motionPaused ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} animate={motionPaused ? { opacity: 1 } : undefined} viewport={{ once: true, amount: .14 }} transition={{ duration: motionPaused ? 0 : .65, delay: motionPaused ? 0 : .12 }} aria-labelledby="arc-title" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.08fr' }, gap: { xs: 4, md: 7 }, alignItems: 'center' }}>
            <Box sx={{ order: { xs: 2, md: 1 } }}><Typography variant="overline" color="text.secondary">02 / Financial analytics</Typography><Typography id="arc-title" variant="h3" sx={{ fontSize: '3.3rem', mt: 2 }}>ARC</Typography><Typography sx={{ color: 'secondary.main', mt: 1 }}>Adaptive Rules for Capital Score</Typography><Typography sx={{ fontSize: '1.4rem', lineHeight: 1.4, mt: 3 }}>Company fundamentals.<br />A clearer analytical picture.</Typography><Typography color="text.secondary" sx={{ my: 3 }}>A platform for exploring US and Canadian public companies. Personal watchlists, financial data and sector-aware scoring bring the research workflow together.</Typography><Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>{['Laravel', 'React', 'TypeScript', 'MUI', 'MySQL', 'ROIC API'].map(tag => <TechTag key={tag}>{tag}</TechTag>)}</Stack>
              <ProjectAccordion title="Inside the engineering" content="Laravel services integrate with the ROIC API for search and fundamentals. Separate rulesets handle banks and general companies. Personal watchlists sit alongside shared company data, while recent analyses are reused to reduce repeated provider requests." icon="engineering" id="arc-engineering" />
              <Button href="https://arcs.dmytro-kovalenko.ca/" target="_blank" rel="noreferrer" endIcon={<ArrowOutward />} sx={{ mt: 3, pl: 0, color: 'secondary.main' }}>Explore ARC live</Button>
            </Box><Box sx={{ order: { xs: 1, md: 2 }, height: '100%' }}><ArcVisual /></Box>
          </Box></Reveal>
        </Box>

        <AboutSection />

        <ExperienceSection />

        <Box id="contact" component="section" aria-labelledby="contact-title" sx={{ py: 9, borderTop: 1, borderColor: 'divider' }}><Reveal><SectionLabel>04 / What’s next?</SectionLabel><Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'flex-end' }} spacing={4}><Box><Typography id="contact-title" variant="h2" sx={{ fontSize: { xs: '3.2rem', md: '5.3rem' }, mt: 2 }}>Let’s build<br /><Box component="span" sx={{ color: 'primary.main' }}>something that matters.</Box></Typography><Typography color="text.secondary" sx={{ mt: 3 }}>Have a product in mind or a team I could contribute to?<br />I’d like to hear about it.</Typography></Box><Button href={`mailto:${profile.email}`} variant="contained" endIcon={<ArrowOutward />} sx={{ flexShrink: 0 }}>Get in touch</Button></Stack><Link href={`mailto:${profile.email}`} sx={{ display: 'inline-block', mt: 4, color: 'text.primary', fontSize: { xs: '1rem', sm: '1.4rem' }, overflowWrap: 'anywhere', py: 1 }}>{profile.email}</Link></Reveal></Box>
      </Box>
      <Stack component="footer" direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ py: 3, borderTop: 1, borderColor: 'divider' }}><Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} Dmytro Kovalenko · Calgary, Canada</Typography><Stack direction="row" flexWrap="wrap" gap={2} alignItems="center"><Link href={profile.github} target="_blank" rel="noreferrer" color="text.primary" sx={{ py: 1.5 }}>GitHub ↗</Link><Link href={profile.linkedin} target="_blank" rel="noreferrer" color="text.primary" sx={{ py: 1.5 }}>LinkedIn ↗</Link></Stack></Stack>
    </Container>
  </Box></MotionPausedContext.Provider></LazyMotion>;
};
