
// Import mongoose to define schema and model
const mongoose = require('mongoose');

// Define the Offer schema
const offerSchema = new mongoose.Schema({
  receiptId: { type: String, required: true, unique: true }, // Unique receipt identifier
  merchantId: { type: String, required: true },               // Merchant who owns the offer
  location: { type: String },                                 // Optional location to target
  showTimeRange: {                                            // Start and end time for offer visibility
    start: { type: Date },
    end: { type: Date }
  },
  bannerText: { type: String, required: true },               // What message is shown to user
  ctaLink: { type: String, required: true },                  // Where user goes on clicking
  clicks: { type: Number, default: 0 },                       // Number of times clicked
  createdAt: { type: Date, default: Date.now }                // Auto timestamp
});

// Export the Offer model
module.exports = mongoose.model("Offer", offerSchema);
