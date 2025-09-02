// routes/user.routes.js

const express = require('express');
const router = express.Router();

// Import the user controller functions
const userController = require('../controllers/user.controller');

// Import the authentication middleware to protect routes
const auth = require('../middleware/auth.middleware');

/**
 * @route   POST /api/users/register
 * @desc    Register a new user under a tenant
 * @access  Public
 */
router.post('/register', userController.register);

/**
 * @route   POST /api/users/login
 * @desc    Login user and return JWT token
 * @access  Public
 */
router.post('/login', userController.login);

/**
 * @route   GET /api/users
 * @desc    Get all users under the logged-in user's tenant
 * @access  Private (requires valid token)
 */
router.get('/', auth, userController.getUsersByTenant);

// Export the router to use in app.js
module.exports = router;
