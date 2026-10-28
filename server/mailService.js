import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env in project root or current folder
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let cachedTestTransporter = null;

/**
 * Creates and returns the appropriate Nodemailer transporter.
 * If EMAIL_USER and EMAIL_PASS are set in .env, it uses those credentials (e.g., Gmail SMTP).
 * Otherwise, it creates/reuses an Ethereal test account for instant zero-config testing.
 */
export async function getTransporter() {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  const isRealPassword = emailUser && emailPass && 
    !emailPass.includes('app_password') && 
    !emailPass.includes('your_') && 
    emailPass !== 'your_16_character_app_password_here' && 
    emailPass.length >= 8;

  // If live credentials are provided and not placeholders
  if (isRealPassword) {
    const isGmail = !process.env.EMAIL_HOST || process.env.EMAIL_HOST.includes('gmail');
    
    const transporterConfig = isGmail
      ? {
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        }
      : {
          host: process.env.EMAIL_HOST,
          port: parseInt(process.env.EMAIL_PORT || '587'),
          secure: process.env.EMAIL_SECURE === 'true',
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        };

    return {
      transporter: nodemailer.createTransport(transporterConfig),
      mode: 'live',
      senderEmail: emailUser,
    };
  }

  // Fallback to Ethereal Email for testing
  if (!cachedTestTransporter) {
    const testAccount = await nodemailer.createTestAccount();
    cachedTestTransporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('[Nodemailer] Using Ethereal test account:', testAccount.user);
  }

  return {
    transporter: cachedTestTransporter,
    mode: 'test',
    senderEmail: 'test-portfolio@ethereal.email',
  };
}

/**
 * Generates a clean, styled HTML email template.
 */
function generateEmailHtml({ name, email, message, date }) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Portfolio Message</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0f0f11; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f0f11; padding: 40px 15px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width: 600px; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <!-- Header Banner -->
            <tr>
              <td style="background: linear-gradient(135deg, #eb5e55 0%, #c93b32 100%); padding: 32px 30px; text-align: left;">
                <p style="margin: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #ffe5e3;">
                  Portfolio Contact Notification
                </p>
                <h1 style="margin: 6px 0 0 0; font-size: 24px; font-weight: 800; color: #ffffff;">
                  New Message from ${name}
                </h1>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="padding: 32px 30px;">
                <!-- Sender Info Card -->
                <table role="presentation" width="100%" style="background-color: #222226; border-radius: 10px; margin-bottom: 24px; padding: 18px 20px;">
                  <tr>
                    <td style="font-size: 13px; color: #a1a1aa; padding-bottom: 8px;">
                      <strong style="color: #e4e4e7;">Sender Name:</strong> ${name}
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 13px; color: #a1a1aa; padding-bottom: 8px;">
                      <strong style="color: #e4e4e7;">Email Address:</strong> 
                      <a href="mailto:${email}" style="color: #eb5e55; text-decoration: none; font-weight: 600;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 13px; color: #a1a1aa;">
                      <strong style="color: #e4e4e7;">Date &amp; Time:</strong> ${date}
                    </td>
                  </tr>
                </table>

                <!-- Message Box -->
                <div style="margin-bottom: 28px;">
                  <h2 style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa; margin: 0 0 10px 0;">
                    Message Content
                  </h2>
                  <div style="background-color: #121214; border-left: 4px solid #eb5e55; border-radius: 6px; padding: 18px 20px; font-size: 15px; line-height: 1.6; color: #f4f4f5; white-space: pre-wrap;">
${message}
                  </div>
                </div>

                <!-- Call to action button -->
                <div style="text-align: center; padding-top: 10px;">
                  <a href="mailto:${email}?subject=Re:%20Portfolio%20Inquiry" style="display: inline-block; background-color: #eb5e55; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 9999px; box-shadow: 0 4px 14px rgba(235, 94, 85, 0.4);">
                    Reply to ${name} &rarr;
                  </a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="border-top: 1px solid #27272a; padding: 20px 30px; text-align: center; font-size: 12px; color: #71717a;">
                This message was sent from Hrutuja Dhoble's Portfolio website via Nodemailer.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

/**
 * Sends an email using Nodemailer.
 * @param {Object} options
 * @param {string} options.name Sender's name
 * @param {string} options.email Sender's email
 * @param {string} options.message Sender's message
 * @returns {Promise<Object>} Result with status, messageId, and optional previewUrl
 */
export async function sendContactEmail({ name, email, message }) {
  if (!name || !email || !message) {
    throw new Error('Name, email, and message are required.');
  }

  const { transporter, mode, senderEmail } = await getTransporter();
  const recipientEmail = process.env.EMAIL_TO || 'hrutujadhoble483@gmail.com';
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const mailOptions = {
    from: `"${name} (Portfolio Inquiry)" <${senderEmail}>`,
    to: recipientEmail,
    replyTo: email,
    subject: `Portfolio Contact — ${name}`,
    text: `New Portfolio Message from ${name} (${email}) at ${timestamp}:\n\n${message}`,
    html: generateEmailHtml({ name, email, message, date: timestamp }),
  };

  const info = await transporter.sendMail(mailOptions);
  
  let previewUrl = null;
  if (mode === 'test') {
    previewUrl = nodemailer.getTestMessageUrl(info);
    console.log(`[Nodemailer] [TEST MODE] Email sent! View preview at: ${previewUrl}`);
  } else {
    console.log(`[Nodemailer] [LIVE MODE] Email successfully sent to ${recipientEmail}! Message ID: ${info.messageId}`);
  }

  return {
    success: true,
    mode,
    messageId: info.messageId,
    previewUrl,
    recipient: recipientEmail,
  };
}
