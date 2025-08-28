const mongoose = require('mongoose');

// Schema for business registration
const businessSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // email must be unique
  isVerified: { type: Boolean, default: false }, // after email verification
  tenantId: String, // will be generated after verification
  apiKey: String,   // generated securely
  createdAt: { type: Date, default: Date.now } // auto timestamp
});

module.exports = mongoose.model('Business', businessSchema);