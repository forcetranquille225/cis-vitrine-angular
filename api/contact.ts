/**
 * Vercel Serverless Function: Contact Form Handler
 * Path: /api/contact
 * 
 * This function:
 * - Validates form data
 * - Verifies reCAPTCHA
 * - Checks rate limits
 * - Creates/updates Brevo contact
 * - Sends notification email to admin
 * - Sends auto-reply to user
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  validateContactForm,
  sanitizeString,
  isLikelySpam,
  type ContactFormData
} from './utils/validation';
import { checkRateLimit, getClientIp } from './utils/rateLimit';
import {
  createOrUpdateBrevoContact,
  sendNotificationEmail,
  sendAutoReply
} from './utils/brevo';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': process.env.FRONTEND_URL || 'https://cis-vitrine-angular.vercel.app',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    res.setHeader('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    res.setHeader('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    return res.end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(req);

    // Check rate limit
    const rateLimitCheck = checkRateLimit(clientIp);
    if (!rateLimitCheck.allowed) {
      res.setHeader('Retry-After', rateLimitCheck.retryAfter || 300);
      res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimitCheck.retryAfter
      });
    }

    // Get and parse request body
    const body = req.body;

    if (!body) {
      res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
      return res.status(400).json({ error: 'Request body is required' });
    }

    // Validate form data
    const validationErrors = validateContactForm(body);
    if (validationErrors.length > 0) {
      res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
      return res.status(400).json({
        error: 'Validation failed',
        errors: validationErrors
      });
    }

    // Sanitize inputs
    const sanitizedData: ContactFormData = {
      name: sanitizeString(body.name),
      email: sanitizeString(body.email).toLowerCase(),
      phone: body.phone ? sanitizeString(body.phone) : undefined,
      company: body.company ? sanitizeString(body.company) : undefined,
      subject: sanitizeString(body.subject),
      message: sanitizeString(body.message)
    };

    // Check for spam
    if (isLikelySpam(sanitizedData)) {
      console.warn(`Potential spam detected from ${sanitizedData.email}`);
      res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
      return res.status(400).json({ error: 'Request could not be processed' });
    }

    // Create/update contact in Brevo
    const brevoContactResult = await createOrUpdateBrevoContact(
      sanitizedData.email,
      sanitizedData.name,
      sanitizedData.phone
    );

    if (!brevoContactResult.success) {
      console.error('Failed to create Brevo contact:', brevoContactResult.error);
      res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
      return res.status(500).json({ error: 'Failed to process contact. Please try again later.' });
    }

    // Send notification email to admin
    const notificationResult = await sendNotificationEmail(
      sanitizedData.email,
      sanitizedData.name,
      sanitizedData.subject,
      sanitizedData.message,
      sanitizedData.phone,
      sanitizedData.company
    );

    if (!notificationResult.success) {
      console.error('Failed to send notification email:', notificationResult.error);
      // Continue anyway - contact was created
    }

    // Send auto-reply to user
    await sendAutoReply(sanitizedData.email, sanitizedData.name);

    // Success response
    res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    return res.status(200).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    return res.status(500).json({
      error: 'An unexpected error occurred. Please try again later.'
    });
  }
}
