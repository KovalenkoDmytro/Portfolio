'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { EnquiryType } from './contact';

type ContactIntent = { enquiry: EnquiryType; setEnquiry: (value: EnquiryType) => void };
const ContactIntentContext = createContext<ContactIntent | null>(null);

export const ContactIntentProvider = ({ children }: { children: ReactNode }) => {
  const [enquiry, setEnquiry] = useState<EnquiryType>('Project enquiry');
  return <ContactIntentContext.Provider value={{ enquiry, setEnquiry }}>{children}</ContactIntentContext.Provider>;
};

export const useContactIntent = () => {
  const intent = useContext(ContactIntentContext);
  if (!intent) throw new Error('Contact controls require ContactIntentProvider.');
  return intent;
};
