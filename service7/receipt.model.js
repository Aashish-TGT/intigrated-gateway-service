// models/receipt.model.js

const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true }
});

const ReceiptSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['quickbooks', 'zoho', 'tally'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  items: {
    type: [ItemSchema],
    required: true,
    validate: [arr => arr.length > 0, 'At least one item is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Receipt', ReceiptSchema);

