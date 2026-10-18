export const enquiryTypes = ['Project enquiry', 'Hiring / opportunity', 'Other'] as const;
export type EnquiryType = typeof enquiryTypes[number];

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  enquiry: string;
  message: string;
};

export type ContactState = {
  status: 'idle' | 'error' | 'success';
  message: string;
  errors: Partial<Record<keyof ContactValues, string>>;
  values: ContactValues;
};

export const initialContactState: ContactState = {
  status: 'idle',
  message: '',
  errors: {},
  values: { name: '', email: '', company: '', enquiry: enquiryTypes[0], message: '' },
};

const readText = (data: FormData, key: string): string => {
  const value = data.get(key);
  return typeof value === 'string' ? value.trim() : '';
};

// English only: printable ASCII (plus newline/tab in the message). Blocks Cyrillic, Arabic, CJK, emoji, control chars.
const singleLineText = /^[\x20-\x7E]*$/;
const multiLineText = /^[\x20-\x7E\r\n\t]*$/;
// Markup / script / template / protocol injection attempts.
const injection = /[<>`\\]|\$\{|\{\{|\}\}|&#|&[a-z]+;|%3c|%3e|\b(?:javascript|vbscript|data|file):|\bon[a-z]+\s*=|\b(?:script|iframe|onerror|onload|eval|document\.cookie)\b|\b(?:union\s+select|select\s+.+\s+from|drop\s+table|insert\s+into|delete\s+from)\b|(?:--|\/\*|\*\/|;)\s*(?:select|drop|insert|update|delete)\b|\bbcc\s*:|\bcc\s*:|\bcontent-type\s*:/i;
const link = /(?:https?:\/\/|ftp:\/\/|www\.|t\.me\/|\b[a-z0-9-]+\.(?:com|net|org|ru|cn|xyz|top|info|biz|io|ly|me|click|site|online|shop|bet|casino|porn|sex|xxx)\b)/i;
const spamWords = /\b(?:casino|porn\w*|sex\w*|xxx|viagra|cialis|escort\w*|nude|onlyfans|betting|bet365|poker|jackpot|slots?|crypto\w*|bitcoin|forex|loans?|payday|seo\s+services|backlinks?|weight\s+loss)\b/i;

const isClean = (text: string, multiline = false) =>
  (multiline ? multiLineText : singleLineText).test(text) && !injection.test(text) && !spamWords.test(text);

export const validateContact = (data: FormData) => {
  const values: ContactValues = {
    name: readText(data, 'name'),
    email: readText(data, 'email'),
    company: readText(data, 'company'),
    enquiry: readText(data, 'enquiry'),
    message: readText(data, 'message'),
  };
  const errors: ContactState['errors'] = {};

  if (values.name.length < 2 || values.name.length > 100 || !/^[A-Za-z][A-Za-z .,'’-]*$/.test(values.name) || !isClean(values.name)) errors.name = 'Enter your name using English letters only (2–100 characters).';
  if (values.email.length > 254 || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(values.email)) errors.email = 'Enter a valid email address (English characters only).';
  if (values.company.length > 120 || !isClean(values.company) || link.test(values.company)) errors.company = 'Use English characters only, under 120 characters, with no links.';
  if (!enquiryTypes.some(type => type === values.enquiry)) errors.enquiry = 'Choose an enquiry type.';
  if (values.message.length < 20 || values.message.length > 5000) errors.message = 'Tell me a little more (20–5,000 characters).';
  else if (!isClean(values.message, true) || link.test(values.message)) errors.message = 'Please write in English only, without links, code or markup.';

  return { values, errors, valid: Object.keys(errors).length === 0, spam: readText(data, 'website') !== '' };
};
