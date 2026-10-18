import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initialContactState, validateContact } from './contact';
import { submitContact } from './app/contact-actions';
import { profile } from './content';

const sendMail = vi.hoisted(() => vi.fn());
vi.mock('nodemailer', () => ({ default: { createTransport: () => ({ sendMail }) } }));

const validForm = () => {
  const data = new FormData();
  data.set('name', 'Test Visitor');
  data.set('email', 'visitor@example.com');
  data.set('company', 'Example business');
  data.set('enquiry', 'Project enquiry');
  data.set('message', 'I would like to discuss a new business website.');
  return data;
};

describe('Contact form validation and mail delivery', () => {
  const mailRequest = sendMail;

  beforeEach(() => {
    vi.stubEnv('GMAIL_USER', 'sender@gmail.com');
    vi.stubEnv('GMAIL_APP_PASSWORD', 'abcd efgh ijkl mnop');
    vi.stubEnv('CONTACT_EMAIL_TO', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    mailRequest.mockReset();
  });

  it.each([
    ['name', 'A'],
    ['email', 'someone@example.com\r\nBcc: other@example.com'],
    ['message', 'Too short'],
    ['message', 'x'.repeat(5001)],
    ['enquiry', 'Unrecognized option'],
  ])('rejects invalid %s before making a mail request', async (key, value) => {
    const form = validForm();
    form.set(key, value);
    const result = await submitContact(initialContactState, form);
    expect(result.status).toBe('error');
    expect(result.errors).toHaveProperty(key);
    expect(mailRequest).not.toHaveBeenCalled();
  });

  it.each([
    ['name', 'Иван Петров'],
    ['name', 'محمد'],
    ['name', '<script>alert(1)</script>'],
    ['company', '王公司'],
    ['company', 'Visit www.spam.com'],
    ['message', 'Привет, хочу сделать сайт для моего бизнеса.'],
    ['message', '这是一个关于网站开发的很长的中文消息内容测试'],
    ['message', 'مرحبا أريد موقع إلكتروني لشركتي الجديدة جدا'],
    ['message', 'Hello <script>alert(1)</script> and more text here'],
    ['message', 'Hello <img src=x onerror=alert(1)> more text'],
    ['message', 'Best online casino bonus, join us right now!'],
    ['message', 'Please check https://example.com for my brief details'],
    ['message', "Hi there'; DROP TABLE users; -- more text here ok"],
    ['message', 'Template ${process.env.SECRET} injection attempt'],
  ])('rejects spam/injection in %s: %s', async (key, value) => {
    const form = validForm();
    form.set(key, value);
    const result = await submitContact(initialContactState, form);
    expect(result.status).toBe('error');
    expect(result.errors).toHaveProperty(key);
    expect(mailRequest).not.toHaveBeenCalled();
  });

  it('accepts normal English input', () => {
    const form = validForm();
    form.set('name', "Anne-Marie O'Brien");
    form.set('message', 'Hi! I need a new website (about 5 pages) for my bakery.\nBudget: $3,000 - $5,000.');
    expect(validateContact(form).valid).toBe(true);
  });

  it('rejects file values in text fields', () => {
    const form = validForm();
    form.set('email', new Blob(['not an address']), 'file.txt');
    expect(validateContact(form).errors.email).toBeDefined();
  });

  it('blocks the honeypot without sending mail', async () => {
    const form = validForm();
    form.set('website', 'spam');
    expect((await submitContact(initialContactState, form)).status).toBe('error');
    expect(mailRequest).not.toHaveBeenCalled();
  });

  it('uses the fixed recipient and the validated sender as reply-to', async () => {
    mailRequest.mockResolvedValue({ accepted: [profile.email], rejected: [] });
    const form = validForm();
    form.set('to', 'untrusted@example.com');
    const result = await submitContact(initialContactState, form);
    expect(result.status).toBe('success');
    expect(mailRequest).toHaveBeenCalledOnce();
    const options: unknown = mailRequest.mock.calls[0][0];
    expect(options).toMatchObject({ to: profile.email, replyTo: 'visitor@example.com', subject: 'Portfolio: Project enquiry' });
    expect(options).not.toHaveProperty('html');
  });

  it('does not claim success or lose the message when mail is unconfigured', async () => {
    vi.stubEnv('GMAIL_APP_PASSWORD', '');
    const result = await submitContact(initialContactState, validForm());
    expect(result.status).toBe('error');
    expect(result.values.message).toBe(validForm().get('message'));
    expect(mailRequest).not.toHaveBeenCalled();
  });

  it('handles SMTP failure without exposing details', async () => {
    mailRequest.mockRejectedValue(new Error('Invalid login: private SMTP details'));
    const result = await submitContact(initialContactState, validForm());
    expect(result.status).toBe('error');
    expect(result.message).not.toContain('private SMTP details');
    expect(result.values.email).toBe('visitor@example.com');
  });

  it('does not report success when the recipient is rejected', async () => {
    mailRequest.mockResolvedValue({ accepted: [], rejected: [profile.email] });
    expect((await submitContact(initialContactState, validForm())).status).toBe('error');
  });
});
