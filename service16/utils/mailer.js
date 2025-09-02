const nodemailer = require('nodemailer');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send auto-response email
const sendAutoResponse = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thanks for your feedback!',
    text: `Hi ${name || 'User'},\n\nThank you for your feedback. Our team will review it soon.\n\n– Support Team`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendAutoResponse };
