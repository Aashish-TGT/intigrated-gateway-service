
const mongoose = require('mongoose');

// Define schema for each tenant (i.e., client/company)
const tenantSchema = new mongoose.Schema({
  // Name of the tenant (required)
  name: { type: String, required: true },

  // Subscription plan (e.g., basic, premium)
  plan: { type: String, default: 'basic' },

  // Limits based on the tenant's plan
  limits: {
    // Maximum number of users allowed
    users: { type: Number, default: 10 },

    // Storage limit assigned (can be string like '1GB', '10GB')
    storage: { type: String, default: '1GB' }
  },

  // Tenant-specific configuration options
  config: {
    // UI theme preference (light/dark mode)
    theme: { type: String, default: 'light' }
  }
});

// Export the Tenant model to use it elsewhere
module.exports = mongoose.model('Tenant', tenantSchema);