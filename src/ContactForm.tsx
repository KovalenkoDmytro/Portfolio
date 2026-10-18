'use client';

import { useActionState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import { submitContact } from './app/contact-actions';
import { enquiryTypes, initialContactState } from './contact';
import { profile } from './content';
import { useContactIntent } from './contact-intent';

export const ContactForm = () => {
  const { enquiry, setEnquiry } = useContactIntent();
  const [state, action, pending] = useActionState(submitContact, initialContactState);

  if (state.status === 'success') return <Stack role="status" aria-live="polite" spacing={2} sx={{ py: 5 }}>
    <Typography component="h3" sx={{ fontSize: '1.8rem' }}>Thanks for reaching out.</Typography>
    <Typography color="text.secondary">Your message has been submitted. I’ll reply to the email address you provided.</Typography>
  </Stack>;

  return <Box component="form" action={action} aria-label="Contact Dmytro" aria-busy={pending}>
    <Stack spacing={2.5}>
      <Typography component="h3" sx={{ fontSize: '1.5rem' }}>Tell me what you have in mind.</Typography>
      {state.status === 'error' ? <Alert severity="error" role="alert">{state.message} You can also <Link href={`mailto:${profile.email}`} color="inherit" underline="always">email me directly</Link>.</Alert> : null}
      <Box component="fieldset" disabled={pending} sx={{ border: 0, p: 0, m: 0, minWidth: 0 }}>
        <Stack spacing={2.5}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField id="contact-name" name="name" label="Your name" autoComplete="name" required fullWidth defaultValue={state.values.name} error={Boolean(state.errors.name)} helperText={state.errors.name} slotProps={{ htmlInput: { minLength: 2, maxLength: 100 } }} />
            <TextField id="contact-email" name="email" type="email" label="Email address" autoComplete="email" required fullWidth defaultValue={state.values.email} error={Boolean(state.errors.email)} helperText={state.errors.email} slotProps={{ htmlInput: { maxLength: 254 } }} />
          </Box>
          <TextField id="contact-company" name="company" label="Company (optional)" autoComplete="organization" fullWidth defaultValue={state.values.company} error={Boolean(state.errors.company)} helperText={state.errors.company} slotProps={{ htmlInput: { maxLength: 120 } }} />
          <TextField id="contact-enquiry" name="enquiry" label="What can I help with?" select required fullWidth value={enquiry} onChange={event => { const selected = enquiryTypes.find(type => type === event.target.value); if (selected) setEnquiry(selected); }} error={Boolean(state.errors.enquiry)} helperText={state.errors.enquiry} slotProps={{ select: { native: true } }}>{enquiryTypes.map(type => <option key={type} value={type}>{type}</option>)}</TextField>
          <TextField id="contact-message" name="message" label="Your message" required fullWidth multiline minRows={5} defaultValue={state.values.message} error={Boolean(state.errors.message)} helperText={state.errors.message ?? 'A few details about your project, goals or the role you’re hiring for.'} slotProps={{ htmlInput: { minLength: 20, maxLength: 5000 } }} />
          <Box aria-hidden="true" sx={{ display: 'none' }}><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></Box>
          <Button type="submit" variant="contained" disabled={pending} endIcon={<ArrowOutward />} sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}>{pending ? 'Sending…' : 'Send message'}</Button>
        </Stack>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '.75rem' }}>Your contact details and message are used to respond to your enquiry.</Typography>
    </Stack>
  </Box>;
};
