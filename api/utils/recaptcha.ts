/**
 * Google reCAPTCHA v3 verification
 */

export async function verifyRecaptcha(
  token: string,
  remoteIp?: string
): Promise<{ success: boolean; score?: number; error?: string }> {
  try {
    const secretKey = process.env['RECAPTCHA_SECRET_KEY'];
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not set');
      return { success: false, error: 'reCAPTCHA not configured' };
    }

    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);
    if (remoteIp) {
      params.append('remoteip', remoteIp);
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    // reCAPTCHA v3 returns a score between 0.0 (bot) and 1.0 (human)
    // Typically, scores below 0.5 are considered suspicious
    const score = data.score || 0;
    const isValid = data.success && score > 0.5;

    return {
      success: isValid,
      score,
      error: !isValid ? 'reCAPTCHA verification failed' : undefined
    };
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
