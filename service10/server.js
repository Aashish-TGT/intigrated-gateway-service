// server.js

// Import the main Express app
const app = require('./app');

// Import Mongoose for MongoDB connection
const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

/**
 * Connect to MongoDB using Mongoose
 * If successful, start the Express server
 */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    // Start the Express server on the defined PORT
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    // Handle MongoDB connection errors
    console.error("❌ MongoDB connection error:", err);
  });
