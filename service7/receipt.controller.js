const Receipt = require('../models/receipt.model');
const syncQuickBooks = require('../services/syncQuickBooks');
const syncZoho = require('../services/syncZoho');
const syncTally = require('../services/syncTally');

exports.createReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.create(req.body);
    res.status(201).json(receipt);
  } catch (err) {
    next(err);
  }
};

exports.getReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.findById(req.params.id).lean();
    if (!receipt) return res.status(404).json({ message: 'Receipt not found' });
    res.json(receipt);
  } catch (err) {
    next(err);
  }
};

exports.syncReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.findById(req.params.id).lean();
    if (!receipt) return res.status(404).json({ message: 'Receipt not found' });

    let result;
    switch (receipt.platform) {
      case 'quickbooks':
        result = await syncQuickBooks(receipt);
        break;
      case 'zoho':
        result = await syncZoho(receipt);
        break;
      case 'tally':
        result = await syncTally(receipt);
        break;
      default:
        return res.status(400).json({ message: 'Unsupported platform' });
    }

    res.json({ message: 'Sync successful', result });
  } catch (err) {
    next(err);
  }
};

