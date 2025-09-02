// routes/walletRoutes.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const walletController = require('../controllers/walletController');
const { validateWalletRequest } = require('../middlewares/validateWalletRequest');

const router = express.Router();

// POST route to add receipt to wallet
router.post('/add', validateWalletRequest, asyncHandler(walletController.addToWallet));

module.exports = router;
