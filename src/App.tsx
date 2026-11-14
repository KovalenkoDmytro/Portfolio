import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Reveal, SectionLabel } from './components';
import { KineticHero } from './KineticHero';
import { AboutSection } from './AboutSection';
import { profile } from './content';
import { ExperienceSection } from './ExperienceSection';
import { PortfolioShell } from './PortfolioShell';
import { ServicesSection, ProcessSection, FaqSection } from './BusinessSections';
import { SiteHeader, SiteFooter } from './SiteNavigation';
import { PublishedProjects } from './PublishedProjects';
import { ContactForm } from './ContactForm';
import { ConversionCTA } from './ConversionCTA';
import { ClientLogos } from './ClientLogos';
import { FeaturedProjects } from './FeaturedProjects';

export const App = () => {
  return <PortfolioShell>
    <Link href="#main" sx={{ position: 'absolute', top: -100, left: 24, zIndex: 10, bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, '&:focus': { top: 16 } }}>Skip to content</Link>
    <Container maxWidth={false} sx={{ px: { xs: 3, md: 5, lg: 7, xl: 8 }, position: 'relative', zIndex: 1 }}>
      <SiteHeader home />
      <Box component="main" id="main">
        <KineticHero />
        <ServicesSection />

        <Box id="work" component="section" aria-labelledby="work-title" sx={{ py: { xs: 8, md: 11 }, borderTop: 1, borderColor: 'divider' }}>
          <Reveal><Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'flex-end' }} spacing={3} sx={{ mb: 6 }}><Box><SectionLabel>02 / Selected work</SectionLabel><Typography id="work-title" variant="h2" sx={{ mt: 2 }}>Real products.<br />Real business problems.</Typography></Box><Typography color="text.secondary" sx={{ maxWidth: 320 }}>From custom platforms to published Shopify apps and WordPress plugins. Product thinking, backed by working software.</Typography></Stack></Reveal>
          <FeaturedProjects />
          <PublishedProjects />
          <ConversionCTA title="Have a product or workflow in mind?" description="Let’s talk about the people using it, the problem to solve and what a useful first release could look like." label="Discuss your application" source="selected-projects" />
        </Box>

        <ClientLogos />

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
