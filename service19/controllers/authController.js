const Business = require('../models/Business');
const EmailToken = require('../models/EmailToken');
const generateApiKey = require('../utils/generateApiKey');
const generateTenantId = require('../utils/generateTenantId');
const crypto = require('crypto');

// POST /register
exports.registerBusiness = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Check if the email is already used
    const existing = await Business.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new business and save to DB
    const business = new Business({ name, email });
    await business.save();

    // Generate random verification token
    const token = crypto.randomBytes(16).toString('hex');

    // Save token to EmailToken collection with TTL
    await new EmailToken({ email, token }).save();

    // Create mock verification link (printed in console)
    const verifyUrl = `${process.env.BASE_URL}/api/verify-email/${token}`;
    console.log(`📧 Mock Email Sent: ${verifyUrl}`);

    // Send success response
    res.status(201).json({
      message: 'Registration successful. Check mock email for verification link.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /verify-email/:token
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    // Check if token exists in DB
    const emailToken = await EmailToken.findOne({ token });
    if (!emailToken) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Find business by email
    const business = await Business.findOne({ email: emailToken.email });
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Update business as verified and generate keys
    business.isVerified = true;
    business.tenantId = generateTenantId(business.name);
    business.apiKey = generateApiKey();
    await business.save();

    // Remove token after verification
    await EmailToken.deleteOne({ token });

    // Send success with tenant info
    res.status(200).json({
      message: 'Email verified successfully!',
      tenantId: business.tenantId,
      apiKey: business.apiKey
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};