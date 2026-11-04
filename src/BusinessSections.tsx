import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import Add from '@mui/icons-material/Add';
import { SectionLabel } from './components';
import { faqs, services } from './services';
import { ContactButton } from './ContactButton';

export const ServicesSection = () => (
  <Box id="services" component="section" aria-labelledby="services-title" sx={{ py: { xs: 7, md: 10 } }}>
    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={3} sx={{ mb: 5 }}>
      <Box><SectionLabel>01 / What I can help you build</SectionLabel><Typography id="services-title" variant="h2" sx={{ mt: 2 }}>Your next step.<br /><Box component="span" sx={{ color: 'primary.main' }}>The right software.</Box></Typography></Box>
      <Typography color="text.secondary" sx={{ maxWidth: 370, alignSelf: { md: 'flex-end' } }}>Websites, apps and business software, supported by SEO, analytics and online advertising for Calgary businesses and teams across Canada.</Typography>
    </Stack>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, columnGap: { md: 6, lg: 10 }, borderTop: 1, borderColor: 'divider' }}>
      {services.map(service => <Box key={service.slug} component="article" sx={{ py: { xs: 3, md: 4 }, borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" alignItems="baseline" gap={2}>
          <Typography variant="overline" color="primary.main">/{service.number}</Typography>
          <Typography component="h3" sx={{ fontSize: { xs: '1.4rem', md: '1.6rem' }, lineHeight: 1.3, letterSpacing: '-.03em' }}><Link href={`/services/${service.slug}`} color="text.primary" sx={{ textDecorationColor: 'transparent', '&:hover': { color: 'primary.main', textDecorationColor: 'currentColor' } }}>{service.name} <ArrowOutward sx={{ fontSize: '.8em', verticalAlign: 'middle' }} /></Link></Typography>
        </Stack>
        <Box sx={{ pl: { xs: 0, sm: 5 }, mt: 1.5, maxWidth: '55ch' }}><Typography color="text.secondary">{service.summary}</Typography><Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 2 }}>{service.tags.map(tag => <Typography key={tag} variant="overline" color="text.secondary" sx={{ fontSize: '.66rem' }}>{tag}</Typography>)}</Stack></Box>
      </Box>)}
    </Box>
    <Box sx={{ mt: 4 }}><ContactButton source="services">Discuss your project</ContactButton></Box>
  </Box>
);

export const ProcessSection = () => (
  <Box component="section" aria-labelledby="process-title" sx={{ py: { xs: 8, md: 11 }, borderTop: 1, borderColor: 'divider' }}>
    <SectionLabel>05 / How we work together</SectionLabel>
    <Typography id="process-title" variant="h2" sx={{ mt: 2, mb: 5 }}>Clear scope. Direct communication.</Typography>
    <Box component="ol" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 4, md: 5 }, p: 0, m: 0, listStyle: 'none' }}>
      {[
        { step: '01', title: 'Understand the business', text: 'We discuss your goals, users and existing systems. I help turn the problem into a focused scope with clear priorities.' },
        { step: '02', title: 'Build what matters', text: 'Design and development follow the agreed workflow. You see progress, discuss tradeoffs and give feedback as the product takes shape.' },
        { step: '03', title: 'Launch with a plan', text: 'We check the important journeys, prepare deployment and agree on handover, maintenance and the next improvements.' },
      ].map(item => <Box component="li" key={item.step} sx={{ pt: 3, borderTop: 1, borderColor: 'divider' }}><Typography variant="overline" color="primary.main">/{item.step}</Typography><Typography component="h3" sx={{ fontSize: '1.35rem', my: 2 }}>{item.title}</Typography><Typography variant="body2" color="text.secondary">{item.text}</Typography></Box>)}
    </Box>
  </Box>
);

export const FaqSection = () => (
  <Box component="section" aria-labelledby="faq-title" sx={{ py: { xs: 8, md: 10 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.4fr' }, gap: { xs: 4, md: 8 }, borderTop: 1, borderColor: 'divider' }}>
    <Box><SectionLabel>06 / A few useful answers</SectionLabel><Typography id="faq-title" variant="h2" sx={{ mt: 2 }}>Before we talk.</Typography><Typography color="text.secondary" sx={{ mt: 2 }}>A little context for your next project.</Typography><Button href="#contact" endIcon={<ArrowOutward />} sx={{ mt: 2 }}>Have another question?</Button></Box>
    <Box>{faqs.map(faq => <Box key={faq.question} component="details" sx={{ borderBottom: 1, borderColor: 'divider', '&[open] .faq-icon': { transform: 'rotate(45deg)' } }}>
      <Box component="summary" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, cursor: 'pointer', py: 2.5, minHeight: 64, listStyle: 'none', '&::-webkit-details-marker': { display: 'none' }, '&:hover': { color: 'primary.main' } }}><Typography component="h3" sx={{ fontSize: '1.05rem', fontWeight: 500 }}>{faq.question}</Typography><Add className="faq-icon" aria-hidden="true" sx={{ color: 'primary.main', flexShrink: 0, transition: 'transform .2s' }} /></Box>
      <Typography color="text.secondary" variant="body2" sx={{ pb: 3, pr: { xs: 0, md: 4 } }}>{faq.answer}</Typography>
    </Box>)}</Box>
  </Box>
);
