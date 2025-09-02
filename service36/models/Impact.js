const mongoose = require('mongoose');

const ImpactSchema = new mongoose.Schema({
  businessId: { type: String, required: true },
  month: { type: String, required: true },
  receiptCount: { type: Number, required: true },
  savedCO2: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Impact', ImpactSchema);
