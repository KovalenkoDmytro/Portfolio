'use client';

import { useState } from 'react';
import { m } from 'motion/react';
import { useMotionPaused } from './motion';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ApartmentOutlined from '@mui/icons-material/ApartmentOutlined';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { alpha } from '@mui/material/styles';
import { arcCategories, estateRoles } from './content';
import type { ArcCategory, EstateRole } from './content';

export const AuditVisual = () => {
  const paused = useMotionPaused();
  const events = [
    { action: 'Updated custom field', target: 'SEO title · Yoast', time: 'just now', tone: '#d2fc86' },
    { action: 'Deactivated plugin', target: 'Old Analytics', time: '2 min ago', tone: '#ffcf8a' },
    { action: 'Restored post', target: 'Privacy policy', time: '8 min ago', tone: '#bac8ff' },
  ];
  return <Box component={m.div} initial={paused ? false : { opacity: 0, x: 28, rotate: 1.5 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} animate={paused ? { opacity: 1, x: 0, rotate: 0 } : undefined} whileHover={paused ? undefined : { y: -6, scale: 1.012 }} viewport={{ once: true, amount: .18 }} transition={{ duration: paused ? 0 : .8, ease: [.22, 1, .36, 1] }} sx={{ bgcolor: '#263449', color: 'primary.contrastText', p: { xs: 3, md: 5 }, height: '100%', minHeight: 440, display: 'flex', flexDirection: 'column', borderRadius: 3, transformOrigin: 'right center' }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}><Typography sx={{ fontSize: 22, fontWeight: 600, letterSpacing: '-.06em' }}>Kovalenko Audit</Typography><Typography variant="overline">Activity log</Typography></Stack>
    <Typography component="p" variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mt: 4, mb: 3 }}>Every change.<br />Clear context.</Typography>
    <Stack spacing={1.25} aria-label="Recent administrator activity">
      {events.map((event, index) => <Box key={event.action} sx={{ bgcolor: 'rgba(255,255,255,.06)', borderRadius: 1.5, p: 1.5, borderLeft: 3, borderColor: event.tone }}>
        <Stack direction="row" justifyContent="space-between" gap={2} alignItems="baseline"><Typography variant="body2" sx={{ fontWeight: 600 }}>{event.action}</Typography><Typography variant="caption" sx={{ opacity: .65, whiteSpace: 'nowrap' }}>{event.time}</Typography></Stack>
        <Typography variant="body2" sx={{ opacity: .72, mt: .35 }}>{event.target}</Typography>
        {index === 0 && <Typography variant="caption" sx={{ display: 'block', mt: 1, color: event.tone }}>Before → After comparison available</Typography>}
      </Box>)}
    </Stack>
    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 'auto', pt: 3 }}>
      {['Owner only', 'No third parties', 'Live updates'].map(label => <Box key={label} component="span" sx={{ border: 1, borderColor: 'rgba(255,255,255,.24)', borderRadius: 10, px: 1.25, py: .5, fontSize: '.75rem' }}>{label}</Box>)}
    </Stack>
  </Box>;
};

export const TrackFlowVisual = () => {
  const paused = useMotionPaused();
  return <Box component={m.div} initial={paused ? false : { opacity: 0, x: -28, rotate: -1.5 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} animate={paused ? { opacity: 1, x: 0, rotate: 0 } : undefined} whileHover={paused ? undefined : { y: -6, scale: 1.012 }} viewport={{ once: true, amount: .18 }} transition={{ duration: paused ? 0 : .8, ease: [.22, 1, .36, 1] }} sx={{ bgcolor: '#a9dfd0', color: 'primary.contrastText', p: { xs: 3, md: 5 }, height: '100%', minHeight: 440, display: 'flex', flexDirection: 'column', borderRadius: 3, transformOrigin: 'left center' }}>
    <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={1}>
      <Typography sx={{ fontSize: 28, fontWeight: 600, letterSpacing: '-.06em' }}>TrackFlow ↗</Typography>
      <Typography variant="overline">Delivery flow</Typography>
    </Stack>
    <Typography component="p" variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mt: 4, mb: 3 }}>One event.<br />Multiple platforms.</Typography>
    <Box component="ol" aria-label="Event path from store to advertising platforms" sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {[
        { title: 'Shopify Web Pixel', detail: 'Product views · Purchases' },
        { title: 'TrackFlow · Server queue', detail: 'Deduplication · Rate limiting' },
        { title: 'Google Ads + Meta CAPI', detail: 'Enhanced Conversions · Conversions API' },
      ].map((step, index) => <Box component="li" key={step.title} sx={{ borderTop: 1, borderColor: (theme) => alpha(theme.palette.primary.contrastText, .2), py: 2 }}>
        <Stack direction="row" gap={1.5} alignItems="baseline">
          <Typography variant="overline">0{index + 1}</Typography>
          <Box><Typography sx={{ fontWeight: 600 }}>{step.title}</Typography><Typography variant="body2">{step.detail}</Typography></Box>
        </Stack>
      </Box>)}
    </Box>
    <Box sx={{ mt: 'auto', pt: 3 }}>
      <Typography variant="body2">Separate status for every platform</Typography>
      <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1.5 }}>
        {['queued', 'sent', 'failed'].map(status => <Box key={status} component="span" sx={{ border: 1, borderColor: (theme) => alpha(theme.palette.primary.contrastText, .3), borderRadius: 10, px: 1.5, py: .5, fontFamily: 'Consolas, monospace', fontSize: '.8125rem' }}>{status}</Box>)}
      </Stack>
      <Typography variant="body2" sx={{ mt: 2 }}>Also supports TikTok and GA4</Typography>
    </Box>
  </Box>;
};

export const EstateVisual = () => {
  const paused = useMotionPaused();
  const [role, setRole] = useState<EstateRole>('Buyer');
  const active = estateRoles[role];
  return <Box component={m.div} initial={paused ? false : { opacity: 0, x: -28, rotate: -1.5 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} animate={paused ? { opacity: 1, x: 0, rotate: 0 } : undefined} whileHover={paused ? undefined : { y: -6, scale: 1.012 }} viewport={{ once: true, amount: .18 }} transition={{ duration: paused ? 0 : .8, ease: [.22, 1, .36, 1] }} sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: { xs: 3, md: 5 }, height: '100%', minHeight: 440, display: 'flex', flexDirection: 'column', borderRadius: 3, transformOrigin: 'left center' }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}><Stack direction="row" gap={1} alignItems="center"><ApartmentOutlined /><Typography sx={{ fontSize: 22, fontWeight: 600, letterSpacing: '-.06em' }}>estatehub</Typography></Stack><Typography variant="overline">Workflow overview</Typography></Stack>
    <Box sx={{ mt: 4, mb: 3 }}><Tabs value={role} onChange={(_event, value: EstateRole) => setRole(value)} aria-label="EstateHub user roles" variant="fullWidth" sx={{ bgcolor: (theme) => alpha(theme.palette.primary.contrastText, .08), borderRadius: 10, '& .MuiTabs-indicator': { display: 'none' }, '& .MuiTab-root': { textTransform: 'none', color: 'primary.contrastText', minWidth: 0, borderRadius: 10, px: 1 }, '& .Mui-selected': { bgcolor: 'primary.contrastText', color: 'primary.main !important' } }}>{(Object.keys(estateRoles) as EstateRole[]).map(item => <Tab key={item} value={item} label={item} id={`role-${item}`} aria-controls={role === item ? `panel-${item}` : undefined} />)}</Tabs></Box>
    <Box component={m.div} initial={paused ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: paused ? 0 : .35 }} role="tabpanel" key={role} id={`panel-${role}`} aria-labelledby={`role-${role}`} tabIndex={0} sx={{ flex: 1 }}><Typography component="p" variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, maxWidth: 360 }}>{active.title}</Typography><Typography sx={{ my: 2, maxWidth: 410, fontSize: '.9375rem' }}>{active.detail}</Typography><Stack spacing={0} sx={{ mt: 3 }}>{active.steps.map((step, index) => <Stack key={step} direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1.1, borderBottom: 1, borderColor: (theme) => alpha(theme.palette.primary.contrastText, .2) }}><Typography variant="body2"><Box component="span" sx={{ fontFamily: 'Consolas, monospace', mr: 2, opacity: .65 }}>0{index + 1}</Box>{step}</Typography><ArrowForward sx={{ fontSize: 17 }} /></Stack>)}</Stack></Box>
  </Box>;
};

export const ArcVisual = () => {
  const paused = useMotionPaused();
  const [category, setCategory] = useState<ArcCategory>('General');
  return <Box component={m.div} initial={paused ? false : { opacity: 0, x: 28, rotate: 1.5 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} animate={paused ? { opacity: 1, x: 0, rotate: 0 } : undefined} whileHover={paused ? undefined : { y: -6, scale: 1.012 }} viewport={{ once: true, amount: .18 }} transition={{ duration: paused ? 0 : .8, ease: [.22, 1, .36, 1] }} sx={{ bgcolor: 'secondary.main', color: 'primary.contrastText', p: { xs: 3, md: 5 }, height: '100%', minHeight: 440, display: 'flex', flexDirection: 'column', borderRadius: 3, transformOrigin: 'right center' }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}><Typography sx={{ fontSize: 30, fontWeight: 600, letterSpacing: '-.08em' }}>ARC<span>↗</span></Typography><Typography variant="overline">Analysis architecture</Typography></Stack>
    <Box sx={{ my: 4, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 1 }}><Box sx={{ border: 1, borderRadius: 2, p: { xs: 1.5, md: 2 } }}><Typography variant="overline">Input</Typography><Typography>Company<br />fundamentals</Typography></Box><ArrowForward /><Box sx={{ border: 1, borderRadius: 2, p: { xs: 1.5, md: 2 } }}><Typography variant="overline">Output</Typography><Typography>Structured<br />analysis</Typography></Box></Box>
    <Typography variant="h3" component="p" sx={{ fontSize: '2.3rem', mb: 3 }}>Different businesses.<br />Different rules.</Typography>
    <Tabs value={category} onChange={(_event, value: ArcCategory) => setCategory(value)} aria-label="ARC analysis rulesets" variant="fullWidth" sx={{ '& .MuiTab-root': { color: 'primary.contrastText', textTransform: 'none' }, '& .Mui-selected': { color: 'primary.contrastText !important', fontWeight: 700 }, '& .MuiTabs-indicator': { bgcolor: 'primary.contrastText' }, borderBottom: 1 }}>{(Object.keys(arcCategories) as ArcCategory[]).map(item => <Tab key={item} value={item} label={item === 'General' ? 'General companies' : 'Banks'} id={`arc-${item}`} aria-controls={category === item ? `arc-panel-${item}` : undefined} />)}</Tabs>
    <Box component={m.div} initial={paused ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: paused ? 0 : .35 }} role="tabpanel" tabIndex={0} key={category} id={`arc-panel-${category}`} aria-labelledby={`arc-${category}`} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mt: 3 }}>{arcCategories[category].map((item, index) => <Box key={item} sx={{ bgcolor: (theme) => alpha(theme.palette.primary.contrastText, .07), borderRadius: 1, p: 1.5 }}><Typography variant="overline">0{index + 1}</Typography><Typography variant="body2">{item}</Typography></Box>)}</Box>
  </Box>;
};
