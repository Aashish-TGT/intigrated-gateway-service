const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const partnerRoutes = require('./routes/partnerRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/partner', partnerRoutes); // ✅ register routes

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/partnerdb')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));



// Sample Commission Report Route
app.get('/api/partners/commission-report', (req, res) => {
  res.json([
    {
      partnerId: 'abc123',
      name: 'John Partner',
      commission: 1200,
      month: 'June 2025'
    },
    {
      partnerId: 'xyz789',
      name: 'Jane Agency',
      commission: 850,
      month: 'June 2025'
    }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
