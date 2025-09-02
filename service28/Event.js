const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', default: null },
  userId: String,
  eventType: String, // "exposure", "open", "share"
  metadata: Object,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
