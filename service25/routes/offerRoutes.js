const express = require('express');
const router = express.Router(); // Create router instance
const offerController = require('../controllers/offerController');

// Define all routes and link to controller functions
router.post('/offer/attach', offerController.attachOffer);
router.get('/offer/:receiptId', offerController.getOffer);
router.post('/offer/click/:receiptId', offerController.trackClick);

// Export router
module.exports = router;
