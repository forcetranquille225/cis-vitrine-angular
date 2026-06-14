/**
 * Validation utilities for contact form data
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-\+\(\)]+$/;
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const MIN_EMAIL_LENGTH = 5;
const MAX_EMAIL_LENGTH = 255;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 5000;
const MIN_SUBJECT_LENGTH = 5;
const MAX_SUBJECT_LENGTH = 200;

export function validateContactForm(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate name
  if (!data.name || typeof data.name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (data.name.trim().length < MIN_NAME_LENGTH) {
    errors.push({ field: 'name', message: `Name must be at least ${MIN_NAME_LENGTH} characters` });
  } else if (data.name.trim().length > MAX_NAME_LENGTH) {
    errors.push({ field: 'name', message: `Name must not exceed ${MAX_NAME_LENGTH} characters` });
  }

  // Validate email
  if (!data.email || typeof data.email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (data.email.trim().length < MIN_EMAIL_LENGTH || data.email.trim().length > MAX_EMAIL_LENGTH) {
    errors.push({ field: 'email', message: 'Email length is invalid' });
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.push({ field: 'email', message: 'Email format is invalid' });
  }

  // Validate phone (optional but validate if provided)
  if (data.phone && typeof data.phone === 'string') {
    if (!PHONE_REGEX.test(data.phone.trim())) {
      errors.push({ field: 'phone', message: 'Phone format is invalid' });
    }
  }

  // Validate company (optional)
  if (data.company && typeof data.company === 'string') {
    if (data.company.trim().length > 200) {
      errors.push({ field: 'company', message: 'Company name must not exceed 200 characters' });
    }
  }

  // Validate subject
  if (!data.subject || typeof data.subject !== 'string') {
    errors.push({ field: 'subject', message: 'Subject is required' });
  } else if (data.subject.trim().length < MIN_SUBJECT_LENGTH) {
    errors.push({ field: 'subject', message: `Subject must be at least ${MIN_SUBJECT_LENGTH} characters` });
  } else if (data.subject.trim().length > MAX_SUBJECT_LENGTH) {
    errors.push({ field: 'subject', message: `Subject must not exceed ${MAX_SUBJECT_LENGTH} characters` });
  }

  // Validate message
  if (!data.message || typeof data.message !== 'string') {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (data.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.push({ field: 'message', message: `Message must be at least ${MIN_MESSAGE_LENGTH} characters` });
  } else if (data.message.trim().length > MAX_MESSAGE_LENGTH) {
    errors.push({ field: 'message', message: `Message must not exceed ${MAX_MESSAGE_LENGTH} characters` });
  }

  return errors;
}

/**
 * Sanitize string input to prevent XSS
 */
export function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 5000);
}

/**
 * Check for common spam patterns
 */
export function isLikelySpam(data: ContactFormData): boolean {
  const message = data.message.toLowerCase();
  const spamKeywords = [
    'viagra',
    'cialis',
    'casino',
    'lottery',
    'prize',
    'click here',
    'buy now',
    'free money',
    'work from home',
    'bitcoin',
    'crypto'
  ];

  for (const keyword of spamKeywords) {
    if (message.includes(keyword)) {
      return true;
    }
  }

  // Check for excessive links
  const linkCount = (message.match(/https?:\/\//g) || []).length;
  if (linkCount > 2) {
    return true;
  }

  return false;
}
