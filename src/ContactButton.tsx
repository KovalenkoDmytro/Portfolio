'use client';

import type { ReactNode } from 'react';
import Button from '@mui/material/Button';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import type { EnquiryType } from './contact';
import { useContactIntent } from './contact-intent';

type Props = { children: ReactNode; intent?: EnquiryType; source: string; variant?: 'contained' | 'outlined' | 'text' };

export const ContactButton = ({ children, intent = 'Project enquiry', source, variant = 'contained' }: Props) => {
  const { setEnquiry } = useContactIntent();
  return <Button href="#contact" variant={variant} data-cta={source} data-enquiry={intent} onClick={() => setEnquiry(intent)} endIcon={<ArrowOutward />} sx={{ flexShrink: 0, alignSelf: { xs: 'stretch', sm: 'flex-start' } }}>{children}</Button>;
};
