import { useEffect, useRef } from 'react';
import { createScope, createTimeline, stagger } from 'animejs';
import { m } from 'motion/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import { useMotionPaused } from './motion';
import { profile } from './content';
import { CodingComputer } from './CodingComputer';

export const KineticHero = () => {
  const root = useRef<HTMLElement>(null);
  const paused = useMotionPaused();

  useEffect(() => {
    if (paused) return;
    const scope = createScope({ root }).add(() => {
      createTimeline({ defaults: { ease: 'out(4)' } })
        .add('.hero-word', { y: [35, 0], opacity: [0, 1], duration: 950, delay: stagger(110) })
        .add('.hero-detail', { y: [18, 0], opacity: [0, 1], duration: 800, delay: stagger(90) }, 350);
    });
    return () => scope.revert();
  }, [paused]);

  return <Box ref={root} component="section" aria-labelledby="intro" sx={{ pt: { xs: 5, md: 6 }, pb: 3 }}>
    <Stack direction="row" justifyContent="space-between" gap={3} className="hero-detail">
      <Typography variant="overline" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Box component="span" sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0 }} />Dmytro Kovalenko / Senior Full-Stack Developer</Typography>
      <Typography variant="overline" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' }, flexShrink: 0 }}>Calgary, Canada · 51.0447° N</Typography>
    </Stack>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, alignItems: 'center', gap: { xs: 3, md: 6 }, mt: { xs: 5, md: 3 } }}>
      <Box sx={{ minWidth: 0 }}>
        <Typography component="h1" id="intro" sx={{ fontSize: { xs: 'clamp(3rem, 10vw, 5rem)', md: 'clamp(3.7rem, 6.2vw, 6.2rem)' }, fontWeight: 500, lineHeight: 1.04, letterSpacing: '-.07em' }}>
          {['Complex', 'systems.', 'Clear', 'experiences.'].map((line, index) => <Box key={line} component="span" className="hero-word" sx={{ display: 'block', color: index >= 2 ? 'primary.main' : 'text.primary' }}>{line}</Box>)}
        </Typography>
        <Typography className="hero-detail" sx={{ mt: 3.5, maxWidth: 430, color: 'text.secondary' }}>I’m Dmytro. I turn complex business logic into thoughtful web applications — from the first database table to the final interaction.</Typography>
        <Stack className="hero-detail" direction="row" gap={1.5} flexWrap="wrap" sx={{ mt: 3.5 }}>
          <m.div whileHover={paused ? undefined : { y: -4 }} whileTap={paused ? undefined : { scale: .96 }}><Button href="#work" variant="contained" endIcon={<ArrowDownward />}>Explore my work</Button></m.div>
          <Button href={profile.github} target="_blank" rel="noreferrer" color="inherit" endIcon={<ArrowOutward />}>GitHub</Button>
        </Stack>
      </Box>
      <CodingComputer />
    </Box>
    <Stack className="hero-detail" direction={{ xs: 'column', sm: 'row' }} gap={1} justifyContent="space-between" sx={{ mt: { xs: 5, md: 5 }, py: 3, borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
      <Typography variant="overline" color="text.secondary">Laravel / React / TypeScript</Typography>
      <Typography variant="overline" color="text.secondary">7+ years of building <Box component="span" sx={{ color: 'primary.main', ml: 2 }}>Code. Connect. Create.</Box></Typography>
    </Stack>
  </Box>;
};
