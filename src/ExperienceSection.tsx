import { m } from 'motion/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import HubOutlined from '@mui/icons-material/HubOutlined';
import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined';
import TerminalOutlined from '@mui/icons-material/TerminalOutlined';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import SchoolOutlined from '@mui/icons-material/SchoolOutlined';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { experience } from './content';
import { Reveal, SectionLabel } from './components';
import { useMotionPaused } from './motion';

const companyIcons = {
  'GrowME Marketing': HubOutlined,
  WeBeeline: ApartmentOutlined,
  'Breakwater Vantage': TerminalOutlined,
  IdoSell: ShoppingBagOutlined,
};
const ease = [.22, 1, .36, 1] as const;

export const ExperienceSection = () => {
  const paused = useMotionPaused();
  const theme = useTheme();
  return <Box component="section" id="experience" aria-labelledby="experience-title" sx={{ py: 9, borderTop: 1, borderColor: 'divider' }}>
    <Reveal><SectionLabel>03 / Experience</SectionLabel><Typography id="experience-title" variant="h2" sx={{ fontSize: { xs: '3rem', md: '4rem' }, mt: 2, mb: 6 }}>Built over time.</Typography></Reveal>
    <Box component="ol" sx={{ p: 0, m: 0, listStyle: 'none' }}>
      {experience.map((item, index) => {
        const Icon = companyIcons[item.company];
        return <Box component={m.li} key={item.company}
          initial={paused ? false : { opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          animate={paused ? { opacity: 1, x: 0 } : undefined} viewport={{ once: true, amount: .2 }}
          transition={{ duration: paused ? 0 : .65, ease }}
          sx={{ position: 'relative', pl: { xs: 7, md: 10 }, pb: 3 }}>
          {index < experience.length - 1 ? <Box aria-hidden="true" sx={{ position: 'absolute', left: { xs: 21, md: 27 }, top: 48, bottom: -8, width: 1, maxWidth: '1px', bgcolor: 'divider' }}>
            <Box component={m.div} initial={paused ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }}
              animate={paused ? { scaleY: 1 } : undefined} viewport={{ once: true, amount: .15 }}
              transition={{ duration: paused ? 0 : 1, delay: paused ? 0 : .2, ease }}
              sx={{ height: '100%', width: '100%', bgcolor: index % 2 === 0 ? 'primary.main' : 'secondary.main', opacity: .5, transformOrigin: 'top' }} />
          </Box> : null}
          <Box component={m.div} aria-hidden="true" initial={paused ? false : { scale: .65, rotate: -25 }}
            whileInView={{ scale: 1, rotate: 0 }} animate={paused ? { scale: 1, rotate: 0 } : undefined}
            viewport={{ once: true }} transition={{ duration: paused ? 0 : .6, ease }}
            sx={{ position: 'absolute', left: 0, top: 20, width: { xs: 44, md: 56 }, height: { xs: 44, md: 56 }, display: 'grid', placeItems: 'center', border: 1, borderColor: 'divider', borderRadius: '50%', bgcolor: 'background.paper', color: index % 2 === 0 ? 'primary.main' : 'secondary.main' }}><Icon sx={{ fontSize: { xs: 21, md: 25 } }} /></Box>
          <Box component={m.article} initial={false}
            whileHover={paused ? undefined : { x: 5, borderColor: alpha(theme.palette.primary.main, .4) }}
            animate={paused ? { x: 0, borderColor: theme.palette.divider } : undefined}
            transition={{ duration: paused ? 0 : .25 }}
            sx={{ p: { xs: 2.5, md: 3.5 }, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: (currentTheme) => alpha(currentTheme.palette.background.paper, .92) }}>
            <Stack direction={{ xs: 'column', md: 'row' }} gap={1} justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="overline" color="text.secondary">{item.dates}</Typography>
              <Typography variant="body2" color="text.secondary">{item.location}</Typography>
            </Stack>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.25fr' }, gap: { xs: 2, md: 4 } }}>
              <Box><Typography component="h3" sx={{ fontSize: { xs: '1.35rem', md: '1.6rem' }, fontWeight: 500 }}>{item.company}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{item.role}</Typography></Box>
              <Box><Typography variant="body2" color="text.secondary">{item.summary}</Typography>
                <Stack component={m.div} direction="row" gap={1} alignItems="flex-start"
                  initial={paused ? false : { opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                  animate={paused ? { opacity: 1, y: 0 } : undefined} viewport={{ once: true }}
                  transition={{ duration: paused ? 0 : .5, delay: paused ? 0 : .25 }} sx={{ mt: 2, color: 'primary.main' }}>
                  <TrendingUp sx={{ fontSize: 20, mt: .25 }} /><Typography variant="body2">{item.result}</Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>;
      })}
    </Box>
    <Reveal><Stack direction="row" gap={2} alignItems="flex-start" sx={{ mt: 3, pl: { xs: 0, md: 10 }, color: 'text.secondary' }}><SchoolOutlined sx={{ color: 'secondary.main' }} /><Typography variant="body2">Master’s degrees in Computer Science & IT<br />West Pomeranian University of Technology · Odesa Polytechnic National University</Typography></Stack></Reveal>
  </Box>;
};
