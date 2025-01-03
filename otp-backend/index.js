// index.js
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Temporary store for OTPs
const otpStore = {};

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'arane3287@gmail.com',
    pass: 'qeobpyhznisbdezc', // Use app-specific password or env variables for security
  },
});

// Generate and send OTP
app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
  otpStore[email] = otp;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error sending OTP');
    }
    console.log('OTP sent: ' + info.response);
    res.status(200).send('OTP sent');
  });
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] === parseInt(otp)) {
    delete otpStore[email]; // Clear OTP after successful verification
    res.status(200).send('OTP verified');
  } else {
    res.status(400).send('Invalid OTP');
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
