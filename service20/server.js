const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const consentRoutes = require('./routes/consentRoutes');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', consentRoutes);

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/consentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`✅ Consent service running on http://localhost:${PORT}`);
  });
})
.catch(err => console.error('❌ MongoDB connection error:', err));
