// models/user.model.js

const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
  // Name of the user
  name: String,

  // Email must be unique across all users
  email: { type: String, unique: true },

  // Encrypted password will be stored here
  password: String,

  // Reference to the tenant the user belongs to (foreign key)
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',         // Reference model
    required: true         // Must belong to a tenant
  },

  // Role of the user (admin or user), default is 'user'
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

// Export the User model
module.exports = mongoose.model('User', userSchema);