const express = require('express');
const router = express.Router();

// Import controller functions
const { createFeedback, getAllFeedback } = require('../controllers/feedbackController');

// Import middleware (but don't use verifyToken now)
const spamFilter = require('../middleware/spamFilter');

// ✅ POST /api/feedback - submit feedback (without verifyToken)
router.post('/', spamFilter, createFeedback);

// ✅ GET /api/feedback - get all feedbacks (without verifyToken)
router.get('/', getAllFeedback);

module.exports = router;
