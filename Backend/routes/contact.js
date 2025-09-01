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
  logger: true,
  debug: true,
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
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }
          
          body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
              background-color: #F5F7FA;
              margin: 0;
              padding: 20px 0;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
          }
          
          .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              overflow: hidden;
          }
          
          .header {
              padding: 40px 30px 20px;
              text-align: center;
          }
          
          .logo {
              width: 120px;
              height: auto;
              margin-bottom: 30px;
          }
          
          .illustration-container {
              text-align: center;
              margin-bottom: 30px;
          }
          
          .illustration-image {
              width: 120px;
              height: 120px;
              object-fit: contain;
              margin: 0 auto;
              display: block;
          }
          
          .content {
              padding: 0 40px 40px;
              text-align: center;
          }
          
          .greeting {
              font-size: 16px;
              color: #666666;
              margin-bottom: 8px;
              font-weight: 400;
          }
          
          .main-heading {
              font-size: 32px;
              font-weight: 700;
              color: #1a1a1a;
              margin-bottom: 24px;
              line-height: 1.2;
          }
          
          .subtext {
              font-size: 16px;
              color: #444444;
              line-height: 1.5;
              margin-bottom: 30px;
              max-width: 480px;
              margin-left: auto;
              margin-right: auto;
          }
          
          .message-content {
              background-color: #f8f9fa;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              text-align: left;
              border-left: 4px solid #667eea;
          }
          
          .message-label {
              font-weight: 600;
              color: #333333;
              font-size: 14px;
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
          }
          
          .message-text {
              color: #555555;
              font-size: 15px;
              line-height: 1.6;
              white-space: pre-wrap;
          }
          
          .footer {
              background-color: #fafbfc;
              padding: 30px 40px;
              border-top: 1px solid #e9ecef;
          }
          
          .footer-content {
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
          }
          
          .footer-text {
              font-size: 14px;
              color: #666666;
          }
          
          .footer-link {
              color: #E63946;
              text-decoration: none;
              font-weight: 500;
          }
          
          .footer-link:hover {
              text-decoration: underline;
          }
          
          .social-icons {
              display: flex;
              gap: 12px;
          }
          
          .social-icon {
              width: 32px;
              height: 32px;
              background-color: #e9ecef;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              text-decoration: none;
              color: #666666;
              font-size: 14px;
              transition: background-color 0.3s ease;
          }
          
          .social-icon:hover {
              background-color: #dee2e6;
          }
          
          @media only screen and (max-width: 600px) {
              body { padding: 10px 0; }
              .email-container { margin: 0 10px; border-radius: 8px; }
              .header { padding: 30px 20px 15px; }
              .content { padding: 0 20px 30px; }
              .main-heading { font-size: 28px; }
              .subtext { font-size: 15px; }
              .footer { padding: 20px; }
              .footer-content { flex-direction: column; gap: 15px; text-align: center; }
              .illustration-circle { width: 100px; height: 100px; }
              .illustration-icon { font-size: 40px; }
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <img src="${process.env.COMPANY_LOGO_URL || 'https://i.postimg.cc/mD9qdHPS/logoimg2.png'}" alt="NexaForge Logo" class="logo">
              <div class="illustration-container">
                  <img src="${content.illustrationImage}" alt="Illustration" class="illustration-image">
              </div>
          </div>
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
          </div>
          <div class="footer">
              <div class="footer-content">
                  <div class="footer-text">
                      Sent by <a href="https://nexaforge.com" class="footer-link">NexaForge.com</a>
                  </div>
                  <div class="social-icons">
                      <a href="${process.env.FACEBOOK_URL || '#'}" class="social-icon" title="Facebook">f</a>
                      <a href="${process.env.TWITTER_URL || '#'}" class="social-icon" title="Twitter">𝕏</a>
                  </div>
              </div>
          </div>
      </div>
  </body>
  </html>`;

  return baseTemplate;
};

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP configuration error:', error);
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check EMAIL_USER and EMAIL_PASS in .env.');
      console.error('Ensure EMAIL_PASS is a valid Gmail App Password.');
    }
    if (error.code === 'ESOCKET') {
      console.error('Network error. Check connectivity to smtp.gmail.com:587.');
    }
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

// POST /api/contact - Handle contact form submission
router.post('/', async (req, res) => {
  const { email, message } = req.body;

  // Validate input
  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }
  if (!process.env.COMPANY_EMAIL) {
    console.error('COMPANY_EMAIL is not set in .env');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Verify transporter before sending
    await transporter.verify();

    // Company notification email template
    const companyEmailHTML = getEmailTemplate('company', {
      illustrationImage: 'https://i.postimg.cc/TPQs90y9/emailimg.png',
      greeting: 'New Message,',
      heading: 'Contact Form Submission',
      subtext: `You have received a new message from ${email}. Please respond promptly to maintain excellent customer service.`,
      messageContent: message,
      messageLabel: 'Customer Message:'
    });

    // Customer thank you email template
    const customerEmailHTML = getEmailTemplate('customer', {
      illustrationImage: 'https://i.postimg.cc/TPQs90y9/emailimg.png',
      greeting: 'Hi There,',
      heading: 'Thank You!',
      subtext: 'Thank you for reaching out to us! We have received your message and will get back to you within 24 hours.',
      messageContent: message,
      messageLabel: 'Your Message:'
    });

    // Send email to company
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL,
      subject: 'New Contact Form Submission',
      text: `New message from ${email}\n\nMessage:\n${message}`,
      html: companyEmailHTML,
    });

    // Send thank-you email to client
    await transporter.sendMail({
      from: `"NexaForge" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank You for Contacting NexaForge',
      text: `Dear valued customer,\n\nThank you for reaching out to us! We have received your message and will get back to you within 24 hours.\n\nYour message:\n${message}\n\nBest regards,\nThe NexaForge Team`,
      html: customerEmailHTML,
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.code === 'EAUTH') {
      console.error('Authentication error. Verify EMAIL_USER and EMAIL_PASS in .env.');
    }
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;