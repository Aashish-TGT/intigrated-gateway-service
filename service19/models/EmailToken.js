const mongoose = require('mongoose');

// Schema to store email verification token (expires in 1 day)
const emailTokenSchema = new mongoose.Schema({
  email: String,     // email linked to the token
  token: String,     // random token string
  createdAt: { type: Date, default: Date.now, expires: 86400 } // TTL: 24 hours
});

module.exports = mongoose.model('EmailToken', emailTokenSchema);