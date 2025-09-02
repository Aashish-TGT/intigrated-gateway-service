const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: String,
  templateData: Object,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Template', templateSchema);
