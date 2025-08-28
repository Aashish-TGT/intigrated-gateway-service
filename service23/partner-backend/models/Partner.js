const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  partnerId: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: String,

  // ✅ Fix: Make clients an array of subdocuments
  clients: [
    {
      name: String,
      email: String
    }
  ],

  commission: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Partner', partnerSchema);
