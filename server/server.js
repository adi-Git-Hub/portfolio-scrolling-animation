import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendContactEmail } from './mailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  const emailPass = process.env.EMAIL_PASS || '';
  const isLive = !!(
    process.env.EMAIL_USER &&
    emailPass &&
    !emailPass.includes('app_password') &&
    !emailPass.includes('your_') &&
    emailPass !== 'your_16_character_app_password_here' &&
    emailPass.length >= 8
  );
  res.json({
    status: 'ok',
    mode: isLive ? 'live (Gmail/SMTP)' : 'test (Ethereal Email)',
    recipient: process.env.EMAIL_TO || 'hrutujadhoble483@gmail.com',
  });
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message.',
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    const result = await sendContactEmail({ name, email, message });
    return res.status(200).json(result);
  } catch (err) {
    console.error('[Nodemailer Server Error]:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to send email. Please try again.',
    });
  }
});

// Serve frontend dist build if present
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Nodemailer Email Server running on http://localhost:${PORT}`);
  console.log(`📧 Destination: ${process.env.EMAIL_TO || 'hrutujadhoble483@gmail.com'}`);
});
