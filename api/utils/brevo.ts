/**
 * Brevo API integration
 * Using Brevo (Sendinblue) to manage contacts and send notifications
 */

export interface BrevoContactData {
  email: string;
  firstname: string;
  lastname?: string;
  phone?: string;
  SMS_OPT?: boolean;
}

export interface BrevoEmailData {
  to: { email: string; name: string }[];
  templateId: number;
  params: Record<string, any>;
  replyTo?: { email: string; name: string };
}

/**
 * Create or update contact in Brevo
 */
export async function createOrUpdateBrevoContact(
  email: string,
  name: string,
  phone?: string
): Promise<{ success: boolean; contactId?: string; error?: string }> {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not set');
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        email,
        firstname: name.split(' ')[0],
        lastname: name.split(' ').slice(1).join(' ') || '',
        phone: phone || null,
        updateEnabled: true // Update if contact exists
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo error:', errorData);
      return {
        success: false,
        error: 'Failed to create/update contact in Brevo'
      };
    }

    const data = await response.json();
    return {
      success: true,
      contactId: data.id?.toString()
    };
  } catch (error) {
    console.error('Error creating Brevo contact:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send email notification to admin via Brevo
 * Make sure to create a template in Brevo with ID and required variables
 */
export async function sendNotificationEmail(
  senderEmail: string,
  senderName: string,
  subject: string,
  message: string,
  phone?: string,
  company?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || 'contact@cistransit.com';
    const templateId = parseInt(process.env.BREVO_TEMPLATE_ID || '1', 10);

    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not set');
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        to: [
          {
            email: adminEmail,
            name: 'CIS Transit Team'
          }
        ],
        templateId: templateId,
        params: {
          senderName,
          senderEmail,
          subject,
          message,
          phone: phone || 'Not provided',
          company: company || 'Not provided'
        },
        replyTo: {
          email: senderEmail,
          name: senderName
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo email error:', errorData);
      return {
        success: false,
        error: 'Failed to send email notification'
      };
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.messageId
    };
  } catch (error) {
    console.error('Error sending Brevo email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send automated reply to user
 */
export async function sendAutoReply(
  userEmail: string,
  userName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const autoReplyTemplateId = parseInt(process.env.BREVO_AUTO_REPLY_TEMPLATE_ID || '2', 10);

    if (!apiKey) {
      throw new Error('BREVO_API_KEY is not set');
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        to: [
          {
            email: userEmail,
            name: userName
          }
        ],
        templateId: autoReplyTemplateId,
        params: {
          userName: userName.split(' ')[0]
        }
      })
    });

    if (!response.ok) {
      console.warn('Failed to send auto-reply');
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending auto-reply:', error);
    return { success: false };
  }
}
