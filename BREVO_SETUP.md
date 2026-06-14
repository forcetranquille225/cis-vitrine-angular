# Setup Guide: Brevo Integration with Vercel Serverless Functions

## Overview

This guide walks you through setting up a secure contact form integration with Brevo using Vercel Serverless Functions and Google reCAPTCHA v3.

## Step 1: Install Dependencies

```bash
npm install axios zod dotenv
```

## Step 2: Get Brevo API Key

1. Go to [Brevo.com](https://www.brevo.com)
2. Sign up or log in
3. Go to **Settings > SMTP & API**
4. Click **Create a new API key**
5. Copy your API key

## Step 3: Create Email Templates in Brevo

### Template 1: Admin Notification

1. In Brevo, go to **Campaigns > Email templates**
2. Click **Create a template**
3. Use this structure:

```
Subject: New Contact Form Submission - {{params.subject}}

From: {{params.senderName}} <{{params.senderEmail}}>
Phone: {{params.phone}}
Company: {{params.company}}

Message:
{{params.message}}
```

4. Save and note the Template ID (use this for `BREVO_TEMPLATE_ID`)

### Template 2: Auto-Reply to User

1. Create another template with:

```
Subject: We received your message

Hello {{params.userName}},

Thank you for contacting us. We have received your message and will get back to you as soon as possible.

Best regards,
CIS Transit Team
```

4. Save and note the Template ID (use this for `BREVO_AUTO_REPLY_TEMPLATE_ID`)

## Step 4: Setup Google reCAPTCHA v3

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click **Create** or **+** to create a new site
3. Fill in:
   - **Label**: CIS Transit
   - **reCAPTCHA type**: reCAPTCHA v3
   - **Domains**: Your Vercel domain (e.g., `cis-vitrine-angular.vercel.app`)
4. Accept terms and click **Submit**
5. Copy your **Site Key** and **Secret Key**

## Step 5: Configure Environment Variables in Vercel

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Settings > Environment Variables**
3. Add these variables:

```
BREVO_API_KEY = your_api_key
BREVO_TEMPLATE_ID = 1
BREVO_AUTO_REPLY_TEMPLATE_ID = 2
ADMIN_EMAIL = contact@cistransit.com
RECAPTCHA_SECRET_KEY = your_secret_key
FRONTEND_URL = https://cis-vitrine-angular.vercel.app
```

## Step 6: Update Angular Service

In `src/app/core/services/contact.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '/api/contact'; // Vercel serverless function

  constructor(private http: HttpClient) {}

  submitContact(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
```

## Step 7: Update Contact Component

In `src/app/modules/visitor/contact/contact.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

@Component({
  selector: 'app-contact',
  // ... other config
})
export class ContactComponent implements OnInit {
  recaptchaToken: string = '';
  submitted = false;
  messageSent = false;
  errorMessage: string | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // Load reCAPTCHA
    this.loadRecaptcha();
  }

  loadRecaptcha() {
    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Get reCAPTCHA token
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute('YOUR_RECAPTCHA_SITE_KEY', { action: 'contact' }).then((token: string) => {
          this.recaptchaToken = token;
          this.submitForm(form);
        });
      });
    }
  }

  private submitForm(form: NgForm) {
    this.submitted = true;
    this.errorMessage = null;

    const contactData = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone || undefined,
      company: form.value.company || undefined,
      subject: form.value.subject,
      message: form.value.message,
      recaptchaToken: this.recaptchaToken
    };

    this.contactService.submitContact(contactData).subscribe({
      next: (response) => {
        console.log('Message envoyé avec succès ✅', response);
        this.messageSent = true;
        this.submitted = false;

        setTimeout(() => {
          this.messageSent = false;
          form.reset();
        }, 5000);
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi du message ❌', error);
        this.errorMessage = error.error?.error || 'Une erreur est survenue lors de l\'envoi.';
        this.submitted = false;

        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      }
    });
  }
}
```

## Step 8: Update HTML Template

Add reCAPTCHA script tag in `src/index.html`:

```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```

Replace `YOUR_RECAPTCHA_SITE_KEY` with your actual Site Key in the component.

## Step 9: Test Locally

1. Create a `.env.local` file with your variables
2. Run: `vercel env pull` (to get environment variables)
3. Test the function locally: `vercel dev`

## Step 10: Deploy

```bash
git add .
git commit -m "feat: add Brevo integration with serverless functions"
git push
```

Vercel will automatically redeploy with your new API routes.

## Security Features

✅ **Input Validation**: All fields validated for type, length, and format
✅ **Rate Limiting**: 5 requests per 15 minutes per IP
✅ **Spam Detection**: Keywords and link checking
✅ **reCAPTCHA v3**: Bot detection with score-based verification
✅ **API Key Protection**: Secrets stored only on server
✅ **CORS Protection**: Origin validation
✅ **Input Sanitization**: XSS prevention
✅ **Error Handling**: Proper HTTP status codes

## Troubleshooting

### Template ID not working
- Make sure you're using the numeric ID, not the template name
- Check template status is "Active" in Brevo

### reCAPTCHA not triggering
- Verify Site Key matches between frontend and reCAPTCHA console
- Check domain is whitelisted in reCAPTCHA settings

### Rate limit exceeded
- Wait 15 minutes before trying again
- Check if running from same network/proxy

### Email not sending
- Verify Brevo API key is correct
- Check ADMIN_EMAIL is valid
- Review Brevo logs for bounce/soft bounce

## Next Steps

1. Monitor Brevo dashboard for incoming contacts
2. Set up Brevo workflows for lead nurturing
3. Configure email deliverability settings
4. Test with spam filters (mail-tester.com)
5. Add tracking pixel for analytics
