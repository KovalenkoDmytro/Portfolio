import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { EnquiryType } from './contact';
import { ContactButton } from './ContactButton';

type Props = { title: string; description: string; label: string; source: string; intent?: EnquiryType };

export const ConversionCTA = ({ title, description, label, source, intent }: Props) => (
  <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', md: 'center' }} gap={3} sx={{ mt: 5, p: { xs: 3, md: 4 }, border: 1, borderColor: 'divider', borderLeft: 3, borderLeftColor: 'primary.main', borderRadius: 2, bgcolor: 'background.paper' }}>
    <Box><Typography component="h3" sx={{ fontSize: { xs: '1.3rem', md: '1.6rem' }, letterSpacing: '-.025em' }}>{title}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: '65ch' }}>{description}</Typography></Box>
    <ContactButton source={source} intent={intent}>{label}</ContactButton>
  </Stack>
);
