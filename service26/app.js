require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const verifyRoutes = require('./routes/verify');
const { saveReceipt } = require('./models/receiptStore');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use('/verify', verifyRoutes);

// 🔄 Temporary: Save 1 test receipt for verification
// receiptId = "12345", data = "sample receipt data"
saveReceipt("12345", "sample receipt data");

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Receipt Verification Service running on port ${PORT}`);
});
