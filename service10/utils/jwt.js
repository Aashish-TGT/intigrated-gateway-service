// utils/generateToken.js (or any helper file name)

// Import jsonwebtoken to generate secure tokens
const jwt = require('jsonwebtoken');

/**
 * @desc    Generates a JWT token with user payload
 * @param   {Object} payload - Data to encode in token (e.g., user ID, tenant ID)
 * @returns {String} JWT token valid for 1 day
 */
exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};