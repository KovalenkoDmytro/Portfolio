'use client';

import Box from '@mui/material/Box';
import { m, useScroll, useTransform } from 'motion/react';
import { useMotionPaused } from './motion';

// All layers are decorative and move only in response to page scroll.
export const ScrollBackdrop = () => {
  const paused = useMotionPaused();
  const { scrollYProgress } = useScroll();
  const flow = useTransform(scrollYProgress, [0, 1], ['0%', '-38%']);
  const counterFlow = useTransform(scrollYProgress, [0, 1], ['-28%', '10%']);
  const rotation = useTransform(scrollYProgress, [0, 1], [-20, 90]);
  const graphProgress = useTransform(scrollYProgress, [0, .9], [.08, 1]);
  const orbit = useTransform(scrollYProgress, [0, 1], [0, 420]);
  const reverseOrbit = useTransform(scrollYProgress, [0, 1], [30, -300]);
  const glowY = useTransform(scrollYProgress, [0, 1], ['-15%', '35%']);

  if (paused) return null;

  return <Box aria-hidden="true" sx={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 40% at 100% 25%, rgba(151,218,98,.11), transparent 75%), radial-gradient(ellipse 38% 38% at 0% 80%, rgba(86,167,153,.10), transparent 75%)' }} />
    <Box sx={{ position: 'absolute', inset: 0, opacity: .35, backgroundImage: 'linear-gradient(rgba(210,252,134,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(210,252,134,.09) 1px, transparent 1px)', backgroundSize: '64px 64px', maskImage: 'linear-gradient(90deg, black, transparent 32%, transparent 68%, black)' }} />

    <Box component={m.div} style={{ y: glowY }} sx={{ position: 'absolute', right: { xs: '-40%', md: '-15%' }, top: '4%', width: { xs: 380, md: 680 }, aspectRatio: '1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(157,239,125,.18), rgba(52,166,137,.07) 35%, transparent 68%)', filter: 'blur(30px)' }} />
    <Box component={m.div} style={{ rotate: orbit }} sx={{ position: 'absolute', right: { xs: '-155px', md: '-80px', xl: '-20px' }, top: '12%', width: { xs: 300, md: 490 }, aspectRatio: '1', border: '1px solid rgba(210,252,134,.2)', borderRadius: '50%', opacity: .8 }}>
      <Box sx={{ position: 'absolute', inset: '9%', border: '1px dashed rgba(210,252,134,.24)', borderRadius: '50%' }} />
      <Box sx={{ position: 'absolute', top: '9%', left: '23%', width: 7, height: 7, bgcolor: 'primary.main', borderRadius: '50%', boxShadow: '0 0 14px 4px rgba(210,252,134,.65)' }} />
      <Box sx={{ position: 'absolute', bottom: '14%', right: '16%', width: 5, height: 5, bgcolor: '#9be8cd', borderRadius: '50%', boxShadow: '0 0 14px 4px rgba(135,233,205,.6)' }} />
    </Box>
    <Box component={m.div} style={{ rotate: reverseOrbit }} sx={{ position: 'absolute', left: { xs: '-175px', md: '-90px' }, bottom: '8%', width: { xs: 310, md: 440 }, aspectRatio: '1', borderRadius: '50%', border: '1px solid rgba(151,220,197,.15)' }}>
      <Box sx={{ position: 'absolute', inset: '18%', borderRadius: '50%', border: '1px dashed rgba(210,252,134,.25)' }} />
      <Box sx={{ position: 'absolute', top: '14%', right: '21%', width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', boxShadow: '0 0 18px 4px rgba(210,252,134,.6)' }} />
    </Box>

    <Box component={m.div} style={{ y: flow }} sx={{ position: 'absolute', right: { xs: '-145px', md: '-70px', xl: '0px' }, top: '-10%', width: { xs: 310, md: 500, xl: 600 }, height: '165%', opacity: { xs: .25, md: .4 }, color: 'primary.main' }}>
      <Box component="svg" viewBox="0 0 500 1200" preserveAspectRatio="none" sx={{ display: 'block', width: '100%', height: '100%', overflow: 'visible' }} fill="none">
        <defs><linearGradient id="flow-gradient" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d2fc86" stopOpacity="0" /><stop offset=".25" stopColor="#d2fc86" stopOpacity=".75" /><stop offset=".7" stopColor="#8de1c4" stopOpacity=".5" /><stop offset="1" stopColor="#d2fc86" stopOpacity="0" /></linearGradient></defs>
        <path d="M420 -40C430 120 120 150 180 320S480 490 350 640 100 820 220 980 440 1090 320 1240" stroke="url(#flow-gradient)" strokeWidth="2" />
        <path d="M475 -40C475 140 165 170 225 320S515 500 390 660 150 830 270 980 490 1110 370 1240" stroke="url(#flow-gradient)" strokeWidth="1" strokeDasharray="5 11" />
        <path d="M365 -40C390 100 75 130 135 320S440 480 310 630 55 810 170 980 390 1080 270 1240" stroke="url(#flow-gradient)" strokeWidth="1" opacity=".5" />
        {[['180','320'],['350','640'],['220','980']].map(([cx, cy]) => <g key={cy}><circle cx={cx} cy={cy} r="12" fill="#171c20" stroke="#d2fc86" /><circle cx={cx} cy={cy} r="3" fill="#d2fc86" /></g>)}
      </Box>
    </Box>

    <Box component={m.div} style={{ y: counterFlow }} sx={{ position: 'absolute', left: { xs: '-125px', md: '-45px', xl: 0 }, top: '5%', width: { xs: 240, md: 360 }, height: '150%', opacity: { xs: .17, md: .3 }, color: 'primary.main' }}>
      <Box component="svg" viewBox="0 0 360 900" preserveAspectRatio="none" fill="none" sx={{ width: '100%', height: '100%' }}>
        <path d="M-20 170h115l32-32h145m-290 320H80l36-36h172M-20 745h110l35-35h135" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-20 190h125l32-32h115M-20 480h110l36-36h142M-20 765h120l35-35h105" stroke="currentColor" strokeOpacity=".45" strokeDasharray="3 8" />
        {[['272','138'],['288','422'],['260','710']].map(([cx, cy]) => <g key={cy}><circle cx={cx} cy={cy} r="9" stroke="currentColor" /><circle cx={cx} cy={cy} r="3" fill="currentColor" /></g>)}
      </Box>
    </Box>

    <Box component={m.div} style={{ rotate: rotation }} sx={{ position: 'absolute', right: { xs: '-90px', md: '1%' }, bottom: { xs: '8%', md: '9%' }, width: { xs: 180, md: 280 }, aspectRatio: '1', opacity: { xs: .1, md: .19 }, border: '1px solid', borderColor: 'primary.main', borderRadius: '50%', '&::before, &::after': { content: '""', position: 'absolute', border: '1px solid', borderColor: 'primary.main', borderRadius: '50%' }, '&::before': { inset: '14%', borderStyle: 'dashed' }, '&::after': { inset: '32%' } }} />
    <Box component="svg" viewBox="0 0 260 120" fill="none" sx={{ position: 'absolute', right: { xs: '-50px', md: '3%' }, bottom: '16%', width: { xs: 170, md: 250 }, opacity: { xs: .16, md: .28 }, color: 'primary.main', overflow: 'visible' }}>
      <m.path d="M10 104 55 83 92 91 137 55 171 62 222 20 249 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: graphProgress }} />
      <circle cx="137" cy="55" r="3" fill="currentColor" /><circle cx="222" cy="20" r="3" fill="currentColor" />
    </Box>
  </Box>;
};
