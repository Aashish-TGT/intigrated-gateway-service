const express = require('express');
const router = express.Router();
const {
  serveTwoTemplates,
  trackEvent,
  getABReport
} = require('../controllers/templateController');

router.get('/pair', serveTwoTemplates);       // Get 2 random templates
router.post('/track', trackEvent);            // Track "open" / "share"
router.get('/report', getABReport);           // Compare performance

module.exports = router;
