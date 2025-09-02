const express = require('express');
const router = express.Router();
const controller = require('../controllers/receipt.controller');

router.post('/', controller.createReceipt);
router.post('/:id/sync', controller.syncReceipt);
router.get('/:id', controller.getReceipt);

module.exports = router;
