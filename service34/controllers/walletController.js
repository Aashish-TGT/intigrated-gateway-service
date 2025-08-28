// controllers/walletController.js
const googleWallet = require('../services/googleWalletService');
const appleWallet = require('../services/appleWalletService');
const upiWallet = require('../services/upiWalletService');
const generatePayload = require('../utils/generatePayload');
const eventLogger = require('../events/eventLogger');
const receiptData = require('../mockData/receiptSample.json');

exports.addToWallet = async (req, res, next) => {
  try {
    const { wallet, receiptId, userId } = req.body;

    // Basic validation
    if (!wallet || !receiptId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'wallet, receiptId and userId are required'
      });
    }

    // Find receipt
    const receipt = receiptData.find(r => r.id === receiptId);
    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: 'Receipt not found'
      });
    }

    // Generate payload
    const payload = generatePayload(receipt, userId);

    // Wallet Sync
    let result;
    switch (wallet.toLowerCase()) {
      case 'google':
        result = await googleWallet.sync(payload);
        break;
      case 'apple':
        result = await appleWallet.sync(payload);
        break;
      case 'upi':
        result = await upiWallet.sync(payload);
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid wallet type. Use google, apple, or upi'
        });
    }

    // Log event
    eventLogger.log({
      wallet,
      userId,
      receiptId,
      status: 'success',
      timestamp: new Date()
    });

    // Success response
    return res.status(200).json({
      success: true,
      message: `${wallet} wallet sync successful`,
      data: result
    });

  } catch (error) {
    // Log error
    eventLogger.log({
      wallet: req.body.wallet,
      userId: req.body.userId,
      receiptId: req.body.receiptId,
      status: 'error',
      error: error.message,
      timestamp: new Date()
    });

    next(error); // Centralized error handler ko pass karo
  }
};
