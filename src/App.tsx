import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowOutward from '@mui/icons-material/ArrowOutward';

import { ProjectAccordion, Reveal, SectionLabel, TechTag } from './components';
import { KineticHero } from './KineticHero';
import { AboutSection } from './AboutSection';
import { EstateVisual, ArcVisual } from './ProjectVisuals';
import { profile } from './content';
import { ExperienceSection } from './ExperienceSection';
import { PortfolioShell } from './PortfolioShell';
import { ServicesSection, ProcessSection, FaqSection } from './BusinessSections';
import { SiteHeader, SiteFooter } from './SiteNavigation';
import { PublishedProjects } from './PublishedProjects';
import { ContactForm } from './ContactForm';
import { WebsiteGallery } from './WebsiteGallery';
import { loadWebsiteWork } from './website-work-loader';
import { ConversionCTA } from './ConversionCTA';

const projectDetails = [
  { title: 'Architecture & ownership', content: 'I designed and built EstateHub solo: the Laravel REST API, PostgreSQL schema, Redis queues and React/TypeScript frontend. The domain model connects multiple participants across an eight-stage transaction lifecycle.' },
  { title: 'Access & workflow', content: 'Four user types, role-based permissions and JWT authentication. Buyers, sellers and lawyers share a structured workspace for offers, documents, appointments and milestones, with Docker-based deployment.' },
];

export const App = () => {
  const websiteWork = loadWebsiteWork();
  const showGallery = websiteWork.length > 0 || process.env.NODE_ENV === 'development';
  return <PortfolioShell>
    <Link href="#main" sx={{ position: 'absolute', top: -100, left: 24, zIndex: 10, bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, '&:focus': { top: 16 } }}>Skip to content</Link>
    <Container maxWidth={false} sx={{ px: { xs: 3, md: 5, lg: 7, xl: 8 }, position: 'relative', zIndex: 1 }}>
      <SiteHeader home showGallery={showGallery} />
      <Box component="main" id="main">
        <KineticHero hasWebsiteWork={websiteWork.length > 0} />
        <WebsiteGallery items={websiteWork} previewEmpty={process.env.NODE_ENV === 'development'} />
        <ServicesSection />

        <Box id="work" component="section" aria-labelledby="work-title" sx={{ py: { xs: 8, md: 11 }, borderTop: 1, borderColor: 'divider' }}>
          <Reveal><Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'flex-end' }} spacing={3} sx={{ mb: 6 }}><Box><SectionLabel>02 / Selected work</SectionLabel><Typography id="work-title" variant="h2" sx={{ mt: 2 }}>Real products.<br />Real business problems.</Typography></Box><Typography color="text.secondary" sx={{ maxWidth: 320 }}>From custom platforms to published Shopify apps and WordPress plugins. Product thinking, backed by working software.</Typography></Stack></Reveal>
          <Reveal><Box component="article" aria-labelledby="estate-title" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.08fr 1fr' }, gap: { xs: 4, md: 7 }, alignItems: 'center', mb: 10 }}>
            <EstateVisual />
            <Box><Stack direction="row" flexWrap="wrap" gap={2} sx={{ mb: 2 }}><Typography variant="overline" color="text.secondary">01 / Proptech</Typography><Typography variant="overline" color="primary">Solo founder & engineer</Typography></Stack><Typography id="estate-title" variant="h3" sx={{ fontSize: '3.3rem' }}>EstateHub</Typography><Typography sx={{ fontSize: '1.4rem', lineHeight: 1.4, mt: 2 }}>A real estate transaction.<br />Connected from start to finish.</Typography><Typography color="text.secondary" sx={{ my: 3 }}>Real estate transactions bring multiple people, documents and deadlines together. I built EstateHub as one shared workspace, helping buyers, sellers and lawyers follow the process from property discovery to closing.</Typography><Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>{['Laravel', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Mapbox'].map(tag => <TechTag key={tag}>{tag}</TechTag>)}</Stack>
              <ProjectAccordion title={projectDetails[0].title} content={projectDetails[0].content} icon="architecture" id="estate-architecture" />
              <ProjectAccordion title={projectDetails[1].title} content={projectDetails[1].content} icon="workflow" id="estate-workflow" />
              <Button href="https://mprealestate.dmytro-kovalenko.ca/demo" target="_blank" rel="noreferrer" endIcon={<ArrowOutward />} sx={{ mt: 3 }}>Explore the live demo</Button><Typography variant="body2" color="text.secondary">Preconfigured demo accounts · No signup required</Typography>
            </Box>
          </Box></Reveal>
          <Reveal><Box component="article" aria-labelledby="arc-title" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.08fr' }, gap: { xs: 4, md: 7 }, alignItems: 'center' }}>
            <Box sx={{ order: { xs: 2, md: 1 } }}><Typography variant="overline" color="text.secondary">02 / Financial analytics</Typography><Typography id="arc-title" variant="h3" sx={{ fontSize: '3.3rem', mt: 2 }}>ARC</Typography><Typography sx={{ color: 'secondary.main', mt: 1 }}>Adaptive Rules for Capital Score</Typography><Typography sx={{ fontSize: '1.4rem', lineHeight: 1.4, mt: 3 }}>Company fundamentals.<br />A clearer analytical picture.</Typography><Typography color="text.secondary" sx={{ my: 3 }}>Financial research often means jumping between disconnected tools. ARC brings US and Canadian company fundamentals, personal watchlists and sector-aware scoring into a single research workflow.</Typography><Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>{['Laravel', 'React', 'TypeScript', 'MUI', 'MySQL', 'ROIC API'].map(tag => <TechTag key={tag}>{tag}</TechTag>)}</Stack>
              <ProjectAccordion title="Inside the engineering" content="Laravel services integrate with the ROIC API for search and fundamentals. Separate rulesets handle banks and general companies. Personal watchlists sit alongside shared company data, while recent analyses are reused to reduce repeated provider requests." icon="engineering" id="arc-engineering" />
              <Button href="https://arcs.dmytro-kovalenko.ca/" target="_blank" rel="noreferrer" endIcon={<ArrowOutward />} sx={{ mt: 3, color: 'secondary.main' }}>Explore ARC live</Button>
            </Box><Box sx={{ order: { xs: 1, md: 2 }, height: '100%' }}><ArcVisual /></Box>
          </Box></Reveal>
          <PublishedProjects />
          <ConversionCTA title="Have a product or workflow in mind?" description="Let’s talk about the people using it, the problem to solve and what a useful first release could look like." label="Discuss your application" source="selected-projects" />
        </Box>

        <AboutSection />

        <ExperienceSection />

        <ProcessSection />
        <FaqSection />

        <Box id="contact" component="section" tabIndex={-1} aria-labelledby="contact-title" sx={{ my: { xs: 3, md: 5 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' }, border: 1, borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{ p: { xs: 3, md: 5 }, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <Typography variant="overline">07 / Let’s build something useful</Typography>
            <Typography id="contact-title" variant="h2" sx={{ mt: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>Your next chapter.<br />Let’s build it together.</Typography>
            <Typography sx={{ mt: 3 }}>Need a website, an application or a better way to run your business? Tell me what you’re working on. Hiring for your team? I’d like to hear about that too.</Typography>
            <Typography variant="body2" sx={{ mt: 3 }}>Based in Calgary, Alberta<br />Working with teams across Canada</Typography>
            <Typography variant="body2" sx={{ mt: 5 }}>Prefer email?</Typography>
            <Link href={`mailto:${profile.email}`} sx={{ display: 'inline-block', mt: .5, color: 'primary.contrastText', fontSize: '.9rem', overflowWrap: 'anywhere', py: 1 }}>{profile.email}</Link>
          </Box>
          <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: 'background.paper' }}><ContactForm /></Box>
        </Box>
      </Box>
      <SiteFooter />
    </Container>
  </PortfolioShell>;
};
