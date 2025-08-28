// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const walletRoutes = require('./routes/walletRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/wallet', walletRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Digital Wallet Connector' });
});

// Error Handling
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Digital Wallet Connector Service running on port ${PORT}`);
});
