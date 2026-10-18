'use server';

import type { ContactState } from '../contact';
import { validateContact } from '../contact';
import { sendContactEmail } from '../contact-email';

export async function submitContact(_previous: ContactState, data: FormData): Promise<ContactState> {
  const { values, errors, valid, spam } = validateContact(data);
  if (!valid || spam) return { status: 'error', message: 'Please check the form and try again.', errors, values };

  try {
    if (await sendContactEmail(values)) return { status: 'success', message: 'Your message has been submitted.', errors: {}, values };
  } catch {
    // Keep provider failures and credentials out of the browser response.
  }

  return { status: 'error', message: 'Your message could not be sent. Please try again later.', errors: {}, values };
}
