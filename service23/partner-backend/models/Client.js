// models/Client.js
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  partnerCode: String,
  revenue: Number,
});

module.exports = mongoose.model('Client', clientSchema);
