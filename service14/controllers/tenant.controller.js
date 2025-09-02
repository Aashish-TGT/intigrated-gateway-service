// controllers/tenant.controller.js

// Import the Tenant model
const Tenant = require('../models/tenant.model');

/**
 * @desc    Create a new tenant
 * @route   POST /api/tenants
 * @access  Public
 */
exports.createTenant = async (req, res) => {
  try {
    // Create a new tenant instance using request body data
    const tenant = new Tenant(req.body);

    // Save the tenant to the database
    await tenant.save();

    // Respond with the created tenant and 201 status
    res.status(201).json(tenant);
  } catch (err) {
    // Handle errors (e.g., validation failure)
    res.status(400).json({ error: err.message });
  }
};

/**
 * @desc    Get all tenants
 * @route   GET /api/tenants
 * @access  (Optional for admin)
 */
exports.getAllTenants = async (req, res) => {
  try {
    // Find all tenant records in the database
    const tenants = await Tenant.find();

    // Return list of tenants as JSON
    res.json(tenants);
  } catch (err) {
    // Handle any DB query errors
    res.status(500).json({ error: err.message });
  }
};