const mongoose = require('mongoose');

// Define schema for feedback collection
const feedbackSchema = new mongoose.Schema({
  user: String,
  email: String,
  category: { type: String, enum: ['bug', 'ui', 'request'], required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'in_review', 'resolved'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

// Export model
module.exports = mongoose.model('Feedback', feedbackSchema);
