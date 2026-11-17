'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { m } from 'motion/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { useMotionPaused } from './motion';
import CodeRounded from '@mui/icons-material/CodeRounded';
import HubRounded from '@mui/icons-material/HubRounded';
import DataObjectRounded from '@mui/icons-material/DataObjectRounded';
import StorageRounded from '@mui/icons-material/StorageRounded';
import BoltRounded from '@mui/icons-material/BoltRounded';
import MapRounded from '@mui/icons-material/MapRounded';
import DashboardCustomizeRounded from '@mui/icons-material/DashboardCustomizeRounded';
import AnalyticsRounded from '@mui/icons-material/AnalyticsRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import ArchitectureRounded from '@mui/icons-material/ArchitectureRounded';
import QueryStatsRounded from '@mui/icons-material/QueryStatsRounded';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import type { SvgIconComponent } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';

export type GalleryImage = { src: string; alt: string; label: string; description: string };

type ProjectGalleryProps = {
  project: string;
  images: GalleryImage[];
};

export const ProjectGallery = ({ project, images }: ProjectGalleryProps) => {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const current = images[active];
  const hasImage = !failedImages.includes(current.src);
  const move = (direction: 1 | -1) => setActive((index) => (index + direction + images.length) % images.length);

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowRight') setActive((index) => (index + 1) % images.length);
      if (event.key === 'ArrowLeft') setActive((index) => (index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [images.length, lightboxOpen]);

  const markFailed = (src: string) => setFailedImages((items) => items.includes(src) ? items : [...items, src]);
  const Placeholder = ({ compact = false }: { compact?: boolean }) => <Box sx={{ height: '100%', minHeight: compact ? 74 : 320, display: 'grid', placeItems: 'center', p: 2, textAlign: 'center', background: 'linear-gradient(135deg, rgba(210,252,134,.16), rgba(186,200,255,.08))' }}><Box><Typography variant="overline" color="primary">{project} / screenshot {String(active + 1).padStart(2, '0')}</Typography><Typography variant={compact ? 'caption' : 'h6'} display="block" color="text.secondary">Add an image at<br /><code>src/assets/projects/{project.toLowerCase()}/{String(active + 1).padStart(2, '0')}.webp</code></Typography></Box></Box>;

  return <Box component="section" aria-label={`${project} project gallery`}>
    <Box sx={{ position: 'relative', overflow: 'hidden', border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper', cursor: 'zoom-in' }} onClick={() => setLightboxOpen(true)}>
      {hasImage ? <Box component="img" src={current.src} alt={current.alt} onError={() => markFailed(current.src)} sx={{ display: 'block', width: '100%', height: { xs: 220, md: 320 }, objectFit: 'cover' }} /> : <Placeholder />}
      <Box sx={{ position: 'absolute', left: 12, right: 12, bottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}><Box sx={{ px: 1.25, py: .5, borderRadius: 10, bgcolor: 'rgba(17,19,16,.78)', color: 'text.primary', fontSize: '.75rem' }}>{current.label}</Box><Box sx={{ px: 1.25, py: .5, borderRadius: 10, bgcolor: 'rgba(17,19,16,.78)', color: 'text.primary', fontSize: '.75rem' }}>Open gallery ↗</Box></Box>
    </Box>
    <Stack direction="row" spacing={1} sx={{ mt: 1.25, overflowX: 'auto', pb: .5 }}>
      {images.map((image, index) => <Box key={image.src} component="button" type="button" aria-label={`Show ${image.label}`} aria-current={index === active ? 'true' : undefined} onClick={() => setActive(index)} sx={{ flex: '0 0 92px', height: 74, p: 0, overflow: 'hidden', border: 2, borderColor: index === active ? 'primary.main' : 'divider', borderRadius: 1.5, cursor: 'pointer', bgcolor: 'background.paper' }}>
        {failedImages.includes(image.src) ? <Placeholder compact /> : <Box component="img" src={image.src} alt="" onError={() => markFailed(image.src)} sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />}
      </Box>)}
    </Stack>
    <Dialog open={lightboxOpen} onClose={() => setLightboxOpen(false)} fullScreen aria-labelledby={`${project}-lightbox-title`} PaperProps={{ sx: { bgcolor: 'background.paper', borderRadius: 0, overflow: 'hidden' } }}>
      <DialogContent sx={{ p: { xs: 1, md: 2 }, position: 'relative', height: '100%', boxSizing: 'border-box' }}>
        <IconButton aria-label="Close gallery" onClick={() => setLightboxOpen(false)} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, bgcolor: 'rgba(17,19,16,.78)', color: 'text.primary' }}><CloseRounded /></IconButton>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 4fr) minmax(260px, 1fr)' }, gap: { xs: 1, md: 2 }, alignItems: 'stretch', height: '100%' }}>
          <Box sx={{ minHeight: { xs: 360, md: 'calc(100vh - 32px)' }, display: 'grid', placeItems: 'center', position: 'relative', bgcolor: '#0c0e0c', borderRadius: 2, overflow: 'hidden' }}>
            {hasImage ? <Box component="img" src={current.src} alt={current.alt} onError={() => markFailed(current.src)} sx={{ maxWidth: '100%', maxHeight: { xs: 360, md: 'calc(100vh - 32px)' }, objectFit: 'contain' }} /> : <Placeholder />}
          </Box>
          <Stack sx={{ p: { xs: 2, md: 3 }, minWidth: 0, justifyContent: 'space-between', border: 1, borderColor: 'divider', borderRadius: 2 }}>
            <Box><Typography variant="overline" color="primary">Project gallery</Typography><Typography id={`${project}-lightbox-title`} variant="h5" sx={{ mt: 1, pr: 3 }}>{project}</Typography><Typography sx={{ mt: 3, fontWeight: 600 }}>{current.label}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7 }}>{current.description}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Image {active + 1} of {images.length}</Typography></Box>
            <Stack direction="row" spacing={1} sx={{ mt: 4 }}><IconButton aria-label="Previous image" onClick={() => move(-1)} sx={{ border: 1, borderColor: 'divider' }}><ChevronLeftRounded /></IconButton><IconButton aria-label="Next image" onClick={() => move(1)} sx={{ border: 1, borderColor: 'divider' }}><ChevronRightRounded /></IconButton></Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  </Box>;
};

export const Reveal = ({ children }: { children: ReactNode }) => {
  const paused = useMotionPaused();
  return <m.div initial={paused ? false : { opacity: 0, y: 35 }}
    whileInView={{ opacity: 1, y: 0 }} animate={paused ? { opacity: 1, y: 0 } : undefined}
    viewport={{ once: true, amount: .08 }} transition={{ duration: paused ? 0 : .75, ease: [.22, 1, .36, 1] }}>
    {children}
  </m.div>;
};

export const SectionLabel = ({ children }: { children: ReactNode }) => <Typography variant="overline" color="primary.main">{children}</Typography>;
export const Tag = ({ children }: { children: ReactNode }) => <Box component="span" sx={{ px: 1.5, py: .6, border: 1, borderColor: 'divider', borderRadius: 10, fontSize: '.8125rem', color: 'text.secondary', display: 'inline-flex' }}>{children}</Box>;

const technologyIcons: Record<string, SvgIconComponent> = {
  Laravel: CodeRounded,
  React: HubRounded,
  TypeScript: DataObjectRounded,
  Redis: BoltRounded,
  Mapbox: MapRounded,
  MUI: DashboardCustomizeRounded,
  MySQL: StorageRounded,
  'ROIC API': AnalyticsRounded,
};

export const TechTag = ({ children }: { children: string }) => {
  const Icon = technologyIcons[children] ?? CodeRounded;
  return <Box component="span" sx={{ px: 1.35, py: .65, border: 1, borderColor: 'divider', borderRadius: 10, fontSize: '.8125rem', color: 'text.secondary', display: 'inline-flex', alignItems: 'center', gap: .7, transition: 'border-color .2s, color .2s, transform .2s', '&:hover': { borderColor: 'primary.main', color: 'text.primary', transform: 'translateY(-2px)' } }}>
    <Icon aria-hidden="true" sx={{ fontSize: 15, color: 'primary.main' }} />
    <span>{children}</span>
  </Box>;
};

type ProjectAccordionProps = {
  title: string;
  content: string;
  id: string;
  icon: 'architecture' | 'workflow' | 'engineering';
  detailLabel?: string;
};

const accordionIcons = {
  architecture: ArchitectureRounded,
  workflow: AccountTreeRounded,
  engineering: QueryStatsRounded,
} as const;

export const ProjectAccordion = ({ title, content, id, icon, detailLabel = 'Project detail' }: ProjectAccordionProps) => {
  const Icon = accordionIcons[icon];
  const contentId = `${id}-content`;
  return <Accordion disableGutters elevation={0} sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden', mb: 1.25, transition: 'border-color .2s, background-color .2s', '&:before': { display: 'none' }, '&:hover': { borderColor: 'primary.main', bgcolor: (theme) => alpha(theme.palette.primary.main, .035) }, '&.Mui-expanded': { m: '0 0 10px', borderColor: 'primary.main' } }}>
    <AccordionSummary expandIcon={<ExpandMoreRounded sx={{ transition: 'transform .25s', '.Mui-expanded &': { transform: 'rotate(180deg)' } }} />} id={id} aria-controls={contentId} sx={{ minHeight: 64, px: { xs: 1.5, md: 2 }, '&.Mui-expanded': { minHeight: 64 }, '& .MuiAccordionSummary-content': { my: 1.5, '&.Mui-expanded': { my: 1.5 } } }}>
      <Box sx={{ width: 34, height: 34, mr: 1.5, display: 'grid', placeItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1.25, color: 'primary.main', flexShrink: 0 }}><Icon aria-hidden="true" sx={{ fontSize: 18 }} /></Box>
      <Box><Typography variant="body2" sx={{ fontWeight: 600 }}>{title}</Typography><Typography variant="overline" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' }, fontSize: 9, mt: .25 }}>{detailLabel}</Typography></Box>
    </AccordionSummary>
    <AccordionDetails id={contentId} sx={{ mx: { xs: 1.5, md: 2 }, mb: 2, pl: 2, borderLeft: 2, borderColor: 'primary.main' }}><Typography color="text.secondary" variant="body2">{content}</Typography></AccordionDetails>
  </Accordion>;
};
