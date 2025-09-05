require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: false,
  debug: false,
});

// HTML Email Template Function
const getEmailTemplate = (type, content) => {
  const baseTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>NexaForge Email</title>
      <style>
          body {
              font-family: 'Inter', Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 20px 0;
              line-height: 1.6;
              color: #333333;
          }

          .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              overflow: hidden;
              border: 1px solid #e5e7eb;
          }

          /* Header */
          .header {
              background: #111827;
              color: #ffffff;
              padding: 25px 20px;
              text-align: center;
          }
          .header h2 {
              margin: 10px 0 0;
              font-size: 20px;
              font-weight: 600;
          }

          /* Illustration */
          .illustration-container {
              text-align: center;
              margin: 25px 0;
          }
          .illustration-image {
              width: 160px;
              height: auto;
              border-radius: 12px;
          }

          /* Content */
          .content {
              padding: 0 35px 40px;
              text-align: center;
          }
          .greeting {
              font-size: 15px;
              color: #6b7280;
              margin-bottom: 10px;
          }
          .main-heading {
              font-size: 28px;
              font-weight: 700;
              color: #111827;
              margin-bottom: 18px;
          }
          .subtext {
              font-size: 15px;
              color: #374151;
              line-height: 1.6;
              margin-bottom: 25px;
          }

          /* User Message Box */
          .message-content {
              background-color: #f3f4f6;
              border-radius: 8px;
              padding: 15px;
              margin: 20px 0;
              text-align: left;
              border-left: 4px solid #2563eb;
          }
          .message-label {
              font-weight: 600;
              font-size: 13px;
              margin-bottom: 6px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #111827;
          }
          .message-text {
              color: #374151;
              font-size: 14px;
              line-height: 1.6;
              white-space: pre-wrap;
          }

          /* Footer */
          .footer {
              background-color: #f9fafb;
              padding: 20px 30px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
          }
          .footer p {
              font-size: 13px;
              color: #6b7280;
              margin: 5px 0;
          }
          .social-icons {
              margin: 12px 0;
          }
          .social-icons a {
              display: inline-block;
              margin: 0 8px;
              width: 28px;
              height: 28px;
              background: #e5e7eb;
              border-radius: 50%;
              line-height: 28px;
              text-align: center;
              color: #374151;
              text-decoration: none;
              font-size: 13px;
          }
          .social-icons a:hover {
              background: #d1d5db;
          }

          @media only screen and (max-width: 600px) {
              .content { padding: 0 20px 30px; }
              .main-heading { font-size: 24px; }
              .subtext { font-size: 14px; }
              .illustration-image { width: 130px;}
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <!-- Header -->
          <div class="header">
              <img src="${content.logoImage || 'https://res.cloudinary.com/dlp7goalm/image/upload/v1757086594/nexa_ie1ex5.jpg'}" alt="NexaForge Logo" width="50" />
              <h2>NexaForge – Full Service Digital Agency</h2>
          </div>

          <!-- Illustration -->
          <div class="illustration-container">
              <img src="${content.illustrationImage}" alt="Illustration" class="illustration-image" />
          </div>

          <!-- Main Content -->
          <div class="content">
              <div class="greeting">${content.greeting}</div>
              <h1 class="main-heading">${content.heading}</h1>
              <p class="subtext">${content.subtext}</p>
              ${content.messageContent ? `
              <div class="message-content">
                  <div class="message-label">${content.messageLabel}</div>
                  <div class="message-text">${content.messageContent}</div>
              </div>
              ` : ''}
              <p style="margin-top:25px;">Best Regards,<br /><strong>The NexaForge Team</strong></p>
          </div>

          <!-- Footer -->
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} NexaForge</p>
              <div class="social-icons">
                  <a href="${process.env.LINKEDIN_URL || '#'}" title="LinkedIn">IN</a>
                  <a href="${process.env.INSTAGRAM_URL || '#'}" title="Instagram">IG</a>
                  <a href="${process.env.TWITTER_URL || '#'}" title="Twitter">T</a>
              </div>
              <p><a href="https://NexaForge.com" style="color:#2563eb; text-decoration:none;">Visit our Website</a></p>
              <p style="font-size:12px;">You're receiving this email because you contacted us. <a href="#" style="color:#6b7280; text-decoration:underline;">Unsubscribe</a></p>
          </div>
      </div>
  </body>
  </html>`;

  return baseTemplate;
};

// POST /api/contact - Handle contact form submission
router.post('/', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }
  if (!process.env.COMPANY_EMAIL) {
    console.error('COMPANY_EMAIL is not set in .env');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Fixed email regex - removed double backslashes
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Email to company
    const companyEmailHTML = getEmailTemplate('company', {
      logoImage: process.env.LOGO_URL,
      illustrationImage: 'https://res.cloudinary.com/dlp7goalm/image/upload/v1757093559/emailimg2_ipdvhm.png',
      greeting: 'New Message Received,',
      heading: 'Contact Form Submission',
      subtext: `You have received a new message from ${email}. Please respond promptly to maintain excellent customer service.`,
      messageContent: message,
      messageLabel: 'Customer Message:',
    });

    // Email to customer
    const customerEmailHTML = getEmailTemplate('customer', {
      logoImage: process.env.LOGO_URL,
      illustrationImage: 'https://res.cloudinary.com/dlp7goalm/image/upload/v1757093559/emailimg2_ipdvhm.png',
      greeting: 'Hello,',
      heading: 'Thank You for Contacting NexaForge!',
      subtext: 'We\'ve received your message and our team will get back to you within 24 hours. Here\'s a copy of what you sent us:',
      messageContent: message,
      messageLabel: 'Your Message:',
    });

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL,
      subject: 'New Contact Form Submission',
      text: `New message from ${email}\n\nMessage:\n${message}`,
      html: companyEmailHTML,
    });

    await transporter.sendMail({
      from: `"NexaForge" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank You for Contacting NexaForge',
      text: `Dear customer,\n\nThank you for reaching out to us! We have received your message and will get back to you within 24 hours.\n\nYour message:\n${message}\n\nBest regards,\nThe NexaForge Team`,
      html: customerEmailHTML,
    });

    console.log(`Email sent to: ${email}`);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;