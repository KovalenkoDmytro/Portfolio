'use client';

import type { ReactNode } from 'react';
import { m } from 'motion/react';
import Box from '@mui/material/Box';
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
  PostgreSQL: StorageRounded,
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
};

const accordionIcons = {
  architecture: ArchitectureRounded,
  workflow: AccountTreeRounded,
  engineering: QueryStatsRounded,
} as const;

export const ProjectAccordion = ({ title, content, id, icon }: ProjectAccordionProps) => {
  const Icon = accordionIcons[icon];
  const contentId = `${id}-content`;
  return <Accordion disableGutters elevation={0} sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden', mb: 1.25, transition: 'border-color .2s, background-color .2s', '&:before': { display: 'none' }, '&:hover': { borderColor: 'primary.main', bgcolor: (theme) => alpha(theme.palette.primary.main, .035) }, '&.Mui-expanded': { m: '0 0 10px', borderColor: 'primary.main' } }}>
    <AccordionSummary expandIcon={<ExpandMoreRounded sx={{ transition: 'transform .25s', '.Mui-expanded &': { transform: 'rotate(180deg)' } }} />} id={id} aria-controls={contentId} sx={{ minHeight: 64, px: { xs: 1.5, md: 2 }, '&.Mui-expanded': { minHeight: 64 }, '& .MuiAccordionSummary-content': { my: 1.5, '&.Mui-expanded': { my: 1.5 } } }}>
      <Box sx={{ width: 34, height: 34, mr: 1.5, display: 'grid', placeItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1.25, color: 'primary.main', flexShrink: 0 }}><Icon aria-hidden="true" sx={{ fontSize: 18 }} /></Box>
      <Box><Typography variant="body2" sx={{ fontWeight: 600 }}>{title}</Typography><Typography variant="overline" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' }, fontSize: 9, mt: .25 }}>Project detail</Typography></Box>
    </AccordionSummary>
    <AccordionDetails id={contentId} sx={{ mx: { xs: 1.5, md: 2 }, mb: 2, pl: 2, borderLeft: 2, borderColor: 'primary.main' }}><Typography color="text.secondary" variant="body2">{content}</Typography></AccordionDetails>
  </Accordion>;
};
