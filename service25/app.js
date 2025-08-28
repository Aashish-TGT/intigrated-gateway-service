const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const offerRoutes = require('./routes/offerRoutes');
const path = require('path');

dotenv.config(); // Load .env variables

const app = express();

// Middleware to parse JSON & form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route definitions
app.use('/', offerRoutes);

// Connect MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
  });
}).catch(err => {
  console.error('❌ DB connection error:', err);
});
