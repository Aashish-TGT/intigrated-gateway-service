const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Bug', 'Suggestion', 'Other'], // ✅ Allowed values only
    required: true
  },
  description: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
