const express = require('express');
const router = express.Router();
const { verifyReceipt } = require('../controllers/verifyController');

router.post('/:receiptId', verifyReceipt);

module.exports = router;
