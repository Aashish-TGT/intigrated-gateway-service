require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./config/db'); // MongoDB connection
const authRoutes = require('./routes/authRoutes'); // Auth routes

const app = express();
app.use(express.json()); // Enable JSON body parsing

connectDB(); // Connect to MongoDB

app.use('/api', authRoutes); // Use routes with /api prefix

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));