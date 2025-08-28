const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'supersecretkey';

function generateToken({ userId, receiptId, thirdParty, purpose, expiry }) {
  return jwt.sign(
    { userId, receiptId, thirdParty, purpose, expiry },
    SECRET,
    { expiresIn: '30d' }
  );
}

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, SECRET);
    const now = new Date();
    const expiry = new Date(payload.expiry);
    if (now > expiry) {
      return { valid: false, reason: 'Token expired' };
    }
    return { valid: true, payload };
  } catch (e) {
    return { valid: false, reason: 'Invalid token' };
  }
}

module.exports = { generateToken, verifyToken };
