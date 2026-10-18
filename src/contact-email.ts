import nodemailer from 'nodemailer';
import type { ContactValues } from './contact';
import { profile } from './content';

export const sendContactEmail = async (values: ContactValues): Promise<boolean> => {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '');
  const to = process.env.CONTACT_EMAIL_TO || profile.email;

  if (!user || !pass) return false;

  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });

  const info = await transport.sendMail({
    from: `Portfolio <${user}>`,
    to,
    replyTo: values.email,
    subject: `Portfolio: ${values.enquiry}`,
    text: [
      'New enquiry from your portfolio',
      '',
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company: ${values.company || 'Not provided'}`,
      `Enquiry: ${values.enquiry}`,
      '',
      'Message:',
      values.message,
    ].join('\n'),
  });

  return info.accepted.length > 0 && info.rejected.length === 0;
};
