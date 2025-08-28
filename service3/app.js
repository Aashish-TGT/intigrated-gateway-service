const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const receiptRoutes = require('./routes/receipt.routes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// ✅ Use built-in Express JSON parser
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ Mount routes and error middleware
app.use('/api/receipts', receiptRoutes);
app.use(errorHandler);

// ✅ Health check route (optional)
app.get('/', (req, res) => res.send('Business Sync Service is running 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
