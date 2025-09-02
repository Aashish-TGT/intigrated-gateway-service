// routes/tenant.routes.js

const express = require('express');
const router = express.Router();

// Import controller that handles tenant logic
const tenantController = require('../controllers/tenant.controller');

/**
 * @route   POST /api/tenants
 * @desc    Create a new tenant
 * @access  Public
 */
router.post('/', tenantController.createTenant);

/**
 * @route   GET /api/tenants
 * @desc    Get a list of all tenants
 * @access  (Optional/Admin use)
 */
router.get('/', tenantController.getAllTenants);

// Export the router to use in app.js
module.exports = router;
