const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { google } = require('googleapis'); // <-- Add this

const app = express();
const PORT = process.env.PORT || 5000; 

// --- DYNAMIC CORS CONFIGURATION ---
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// --- SETUP FOR GMAIL API ---
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

// --- Helper function to send email ---
async function sendMail(mailOptions) {
  try {
    // 1. Get an access token
    const accessToken = await oAuth2Client.getAccessToken();

    // 2. Create the Gmail API client
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    // 3. Construct the email message in the required format
    const emailLines = [
      `From: "Your Name or App" <${process.env.EMAIL_USER}>`,
      `To: ${mailOptions.to}`,
      'Content-type: text/plain;charset=iso-8859-1',
      'MIME-Version: 1.0',
      `Subject: ${mailOptions.subject}`,
      '',
      mailOptions.text
    ];
    const email = emailLines.join('\r\n');

    // 4. Encode the message for the API
    const encodedMessage = Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    
    // 5. Send the email
    const res = await gmail.users.messages.send({
      userId: 'me', // 'me' refers to the authenticated user
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log('Email sent successfully:', res.data);
    return res.data;

  } catch (error) {
    console.error('Error sending email:', error);
    // It's good to check for specific OAuth errors here
    if (error.response && error.response.data) {
        console.error('API Error Details:', error.response.data);
    }
    throw new Error('Failed to send email via Gmail API.');
  }
}

// --- YOUR API ROUTES ---
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.post('/api/contact', async (req, res) => {
  
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  // Define the content for the email
  const cardTitle = `New Contact Form Submission from ${name}`;
  const cardDescription = `
    You have a new message!

    From: ${name}
    Email: ${email}
    -------------------
    Message:
    ${message}
  `;

  // Define the mail options object
  const mailOptions = {
    to: process.env.TRELLO_EMAIL,
    subject: cardTitle,
    text: cardDescription,
  };

  // Use the new sendMail function
  try {
    await sendMail(mailOptions);
    console.log('Email sent to Trello successfully!');
    res.status(200).json({ success: 'Message sent and Trello card created!' });
  } catch (error) {
    console.error('Error in /api/contact:', error.message);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});