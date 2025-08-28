const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  businessId: {
    type: String,
    required: true
  },
  receiptType: {
    type: String,
    enum: ['paper', 'digital'],
    required: true,
    default: 'digital'
  },
  co2Saved: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Receipt', receiptSchema);
