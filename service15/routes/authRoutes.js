const express = require('express');
const router = express.Router();
const { registerBusiness, verifyEmail } = require('../controllers/authController');

// Route to register a business
router.post('/onboarding/register', registerBusiness);

// Route to verify email using token
router.get('/verify-email/:token', verifyEmail);

module.exports = router;
