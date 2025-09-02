const express = require('express');
const router = express.Router();
const { logEvent } = require('../logController');

// @route   POST /api/log
// @desc    Store analytics/log event
// @access  Public
router.post('/log', logEvent);

module.exports = router;
