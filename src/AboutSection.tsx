import type { ReactNode } from 'react';
import { m } from 'motion/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import Code from '@mui/icons-material/Code';
import Storage from '@mui/icons-material/Storage';
import Terminal from '@mui/icons-material/Terminal';
import { SectionLabel } from './components';
import { useMotionPaused } from './motion';

const stats = [
  { number: '7+', label: 'years of full-stack experience' },
  { number: '200+', label: 'production web servers managed' },
  { number: '36', label: 'hotels supported by a SaaS platform' },
];
const capabilities = [
  { id: 'backend', title: 'Backend & architecture', body: 'PHP · Laravel · Node.js · REST & GraphQL · Multi-tenant SaaS · MySQL · PostgreSQL', icon: Storage, code: '01 / architect()' },
  { id: 'frontend', title: 'Interfaces & experiences', body: 'React · TypeScript · Next.js · MUI · Responsive UI · FlutterFlow', icon: Code, code: '02 / create()' },
  { id: 'delivery', title: 'Delivery & reliability', body: 'Docker · CI/CD · Redis · Linux · Nginx · Cloudflare · API security', icon: Terminal, code: '03 / deliver()' },
];
const ease = [.22, 1, .36, 1] as const;

const AboutReveal = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  const paused = useMotionPaused();
  return <m.div initial={paused ? false : { opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }} animate={paused ? { opacity: 1, y: 0 } : undefined}
    viewport={{ once: true, amount: .2 }}
    transition={{ duration: paused ? 0 : .7, delay: paused ? 0 : delay, ease }}>
    {children}
  </m.div>;
};

const StackDiagram = () => {
  const paused = useMotionPaused();
  return <Box aria-hidden="true" sx={{ mt: 4, maxWidth: 370, color: 'primary.main' }}>
    <Box component={m.svg} viewBox="0 0 370 92" fill="none" sx={{ display: 'block', width: '100%', overflow: 'visible' }}>
      <m.path d="M55 44 H315" stroke="currentColor" strokeWidth="1" opacity=".35"
        initial={paused ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }}
        animate={paused ? { pathLength: 1 } : undefined} viewport={{ once: true }}
        transition={{ duration: paused ? 0 : 1.2, ease }} />
      {[{ x: 55, label: '</>', name: 'INTERFACE' }, { x: 185, label: '{ }', name: 'LOGIC' }, { x: 315, label: '>_', name: 'DELIVERY' }].map((node, index) => <m.g key={node.name}
        initial={paused ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
        animate={paused ? { opacity: 1, y: 0 } : undefined} viewport={{ once: true }}
        transition={{ duration: paused ? 0 : .55, delay: paused ? 0 : index * .22 }}>
        <Box component="rect" x={node.x - 25} y="19" width="50" height="50" rx="12" sx={{ fill: 'background.paper', stroke: 'divider' }} />
        <Box component="text" x={node.x} y="49" textAnchor="middle" sx={{ fill: 'primary.main', fontFamily: 'Consolas, monospace', fontSize: 18 }}>{node.label}</Box>
        <Box component="text" x={node.x} y="89" textAnchor="middle" sx={{ fill: 'text.secondary', fontFamily: 'Consolas, monospace', fontSize: 9, letterSpacing: 1 }}>{node.name}</Box>
      </m.g>)}
    </Box>
  </Box>;
};

export const AboutSection = () => {
  const paused = useMotionPaused();
  const theme = useTheme();
  return <Box id="about" component="section" aria-labelledby="about-title" sx={{ py: 9, borderTop: 1, borderColor: 'divider' }}>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.4fr' }, gap: 6 }}>
      <Box>
        <AboutReveal><SectionLabel>02 / The person behind the code</SectionLabel></AboutReveal>
        <Typography id="about-title" variant="h2" sx={{ fontSize: { xs: '3rem', md: '4rem' }, mt: 2 }}>
          {['A builder.', 'Across the stack.'].map((line, index) => <Box component="span" key={line} sx={{ display: 'block', overflow: 'hidden', pb: '.12em', mb: '-.12em' }}>
            <Box component={m.span} initial={paused ? false : { y: '105%' }} whileInView={{ y: '0%' }}
              animate={paused ? { y: '0%' } : undefined} viewport={{ once: true }}
              transition={{ duration: paused ? 0 : .85, delay: paused ? 0 : index * .15, ease }} sx={{ display: 'block' }}>{line}</Box>
          </Box>)}
        </Typography>
        <StackDiagram />
      </Box>
      <AboutReveal delay={.16}>
        <Typography sx={{ fontSize: { xs: '1.3rem', md: '1.6rem' }, lineHeight: 1.6 }}>I care about how a system works — and how it feels to use. My work connects backend architecture, product thinking and the details of the interface.</Typography>
        <Typography color="text.secondary" sx={{ mt: 3 }}>Over 7 years, I’ve built SaaS platforms, integrated services, improved production systems and mentored developers. Laravel is my core backend stack; React and TypeScript bring the experience to life.</Typography>
      </AboutReveal>
    </Box>

    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, mt: 7, borderTop: 1, borderBottom: 1, borderColor: 'divider' }}>
      {stats.map((stat, index) => <Box key={stat.label} sx={{ py: 4, pr: 3 }}>
        <Typography sx={{ fontSize: '3.6rem', lineHeight: 1.1, letterSpacing: '-.06em', overflow: 'hidden', fontVariantNumeric: 'tabular-nums' }}>
          <Box component={m.span} initial={paused ? false : { y: '100%', opacity: 0 }} whileInView={{ y: '0%', opacity: 1 }}
            animate={paused ? { y: '0%', opacity: 1 } : undefined} viewport={{ once: true }}
            transition={{ duration: paused ? 0 : .85, delay: paused ? 0 : index * .14, ease }} sx={{ display: 'inline-block' }}>{stat.number}</Box>
        </Typography>
        <AboutReveal delay={index * .14 + .15}><Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>{stat.label}</Typography></AboutReveal>
      </Box>)}
    </Box>

    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, mt: 6 }}>
      {capabilities.map((item, index) => <AboutReveal key={item.id} delay={index * .12}>
        <Box component={m.article} initial={false}
          animate={paused ? { y: 0, borderColor: theme.palette.divider, backgroundColor: theme.palette.background.paper } : undefined}
          whileHover={paused ? undefined : { y: -6, borderColor: alpha(theme.palette.primary.main, .55), backgroundColor: alpha(theme.palette.primary.main, .045) }}
          transition={{ duration: paused ? 0 : .25, ease }}
          sx={{ height: '100%', p: 3, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
            <item.icon sx={{ color: index === 1 ? 'secondary.main' : 'primary.main', fontSize: 25 }} />
            <Typography variant="overline" color="text.secondary" sx={{ fontSize: 11 }}>{item.code}</Typography>
          </Stack>
          <Typography component="h3" sx={{ mb: 1.5, fontWeight: 600 }}>{item.title}</Typography>
          <Typography variant="body2" color="text.secondary">{item.body}</Typography>
        </Box>
      </AboutReveal>)}
    </Box>
  </Box>;
};
