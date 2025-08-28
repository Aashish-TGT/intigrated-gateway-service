
const mongoose = require('mongoose');

// This function connects to MongoDB using the URI from .env
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ DB Connection Error:', err.message);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;