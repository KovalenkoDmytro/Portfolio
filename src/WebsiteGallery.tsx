'use client';

import { useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Close from '@mui/icons-material/Close';
import OpenInFull from '@mui/icons-material/OpenInFull';
import ImageOutlined from '@mui/icons-material/ImageOutlined';
import type { WebsiteWork } from './website-work';
import { ConversionCTA } from './ConversionCTA';

type Props = { items: WebsiteWork[]; previewEmpty?: boolean };

export const WebsiteGallery = ({ items, previewEmpty = false }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedIndex = items.findIndex(item => item.id === selectedId);
  const selected = items[selectedIndex];

  const previous = () => { if (selectedIndex > 0) setSelectedId(items[selectedIndex - 1].id); };
  const next = () => { if (selectedIndex >= 0 && selectedIndex < items.length - 1) setSelectedId(items[selectedIndex + 1].id); };

  if (items.length === 0 && !previewEmpty) return null;

  return <Box id="website-work" component="section" aria-labelledby="website-work-title" sx={{ py: { xs: 6, md: 9 }, borderBottom: 1, borderColor: 'divider' }}>
    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={3} sx={{ mb: 4 }}>
      <Box><Typography variant="overline" color="primary.main">Selected website work</Typography><Typography id="website-work-title" variant="h2" sx={{ mt: 2 }}>The websites behind<br /><Box component="span" sx={{ color: 'primary.main' }}>the experience.</Box></Typography></Box>
      <Box sx={{ maxWidth: 360, alignSelf: { md: 'flex-end' } }}><Typography color="text.secondary">A closer look at websites I’ve worked on. Explore the previews and my contribution to each project.</Typography>{items.length > 0 ? <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>Select a website to see the full screenshot.</Typography> : null}</Box>
    </Stack>
    {items.length === 0 ? <Box sx={{ p: { xs: 4, md: 7 }, border: 1, borderStyle: 'dashed', borderColor: 'divider', borderRadius: 2, textAlign: 'center' }}><ImageOutlined aria-hidden="true" sx={{ color: 'primary.main', fontSize: 36, mb: 2 }} /><Typography component="h3" sx={{ fontSize: '1.3rem' }}>Website previews will appear here.</Typography><Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>A space for real screenshots and the work behind them.</Typography></Box> : <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' }, columnGap: 3, rowGap: 4 }}>
      {items.map(item => <Box component="article" key={item.id} sx={{ minWidth: 0 }}>
        <ButtonBase onClick={() => setSelectedId(item.id)} aria-label={`Open ${item.title} website preview`} aria-haspopup="dialog" sx={{ display: 'block', width: '100%', border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden', textAlign: 'left', '&:hover, &.Mui-focusVisible': { borderColor: 'primary.main' }, '&:hover .preview-corner, &.Mui-focusVisible .preview-corner': { bgcolor: 'primary.main', color: 'primary.contrastText' } }}>
          <Box sx={{ display: 'flex', gap: .75, p: 1.5, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }} aria-hidden="true">{['first', 'second', 'third'].map(dot => <Box key={dot} sx={{ width: 6, height: 6, bgcolor: 'text.secondary', opacity: .4, borderRadius: '50%' }} />)}</Box>
          <Box sx={{ position: 'relative', aspectRatio: '16 / 10', bgcolor: 'background.paper', '& > img': { objectFit: 'cover', objectPosition: 'top' } }}>
            <Image src={item.src} alt={item.alt} fill sizes="(max-width: 599px) calc(100vw - 48px), (max-width: 899px) calc((100vw - 72px) / 2), (max-width: 1199px) calc((100vw - 104px) / 2), (max-width: 1535px) calc((100vw - 136px) / 2), (max-width: 1759px) calc((100vw - 176px) / 3), 528px" />
            <Box className="preview-corner" sx={{ position: 'absolute', right: 12, bottom: 12, width: 44, height: 44, display: 'grid', placeItems: 'center', borderRadius: '50%', bgcolor: 'primary.main', color: 'primary.contrastText', border: 1, borderColor: 'divider', transition: 'background-color .2s, color .2s' }}><OpenInFull aria-hidden="true" sx={{ fontSize: 18 }} /></Box>
          </Box>
        </ButtonBase>
        <Stack direction="row" flexWrap="wrap" gap={1} justifyContent="space-between" alignItems="flex-start" sx={{ mt: 2 }}><Typography component="h3" sx={{ fontSize: '1.25rem', fontWeight: 500 }}>{item.title}</Typography>{item.platform ? <Typography variant="overline" color="primary.main" sx={{ fontSize: '.65rem' }}>{item.platform}</Typography> : null}</Stack>
        {item.industry || item.location ? <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>{[item.industry, item.location].filter(Boolean).join(' · ')}</Typography> : null}
        {item.contribution ? <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}><Box component="span" sx={{ color: 'text.primary' }}>My contribution: </Box>{item.contribution}</Typography> : null}
      </Box>)}
    </Box>}
    {items.length > 0 ? <ConversionCTA title="Like what you see? Let’s talk about your website." description="Tell me about your business and the experience you want your customers to have." label="Discuss your website" source="website-gallery" /> : null}
    <Dialog open={Boolean(selected)} onClose={() => setSelectedId(null)} fullWidth maxWidth="lg" aria-labelledby="website-preview-title" onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); previous(); } if (event.key === 'ArrowRight') { event.preventDefault(); next(); } }} slotProps={{ paper: { sx: { border: 1, borderColor: 'divider', borderRadius: 2, maxHeight: 'calc(100dvh - 32px)', m: 2 } } }}>
      {selected ? <>
        <DialogTitle id="website-preview-title" sx={{ pr: 8 }}>{selected.title}</DialogTitle>
        <IconButton onClick={() => setSelectedId(null)} aria-label="Close website preview" sx={{ position: 'absolute', right: 12, top: 12, minWidth: 44, minHeight: 44 }}><Close /></IconButton>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} sx={{ px: { xs: 2, md: 3 }, pb: 2 }}><Stack direction="row" alignItems="center" gap={1}><IconButton onClick={previous} disabled={selectedIndex === 0} aria-label="Previous website" sx={{ minWidth: 44, minHeight: 44 }}><ArrowBack /></IconButton><Typography variant="body2" aria-live="polite">{selectedIndex + 1} / {items.length}</Typography><IconButton onClick={next} disabled={selectedIndex === items.length - 1} aria-label="Next website" sx={{ minWidth: 44, minHeight: 44 }}><ArrowForward /></IconButton></Stack><Button href={selected.src} target="_blank" rel="noreferrer" size="small">Open original ↗</Button></Stack>
        <DialogContent dividers sx={{ p: { xs: 1.5, md: 3 } }}>
          {selected.contribution ? <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{selected.contribution}</Typography> : null}
          <Box component="img" src={selected.src} alt={selected.alt} sx={{ display: 'block', width: '100%', height: 'auto', borderRadius: 1 }} />
        </DialogContent>
      </> : null}
    </Dialog>
  </Box>;
};
