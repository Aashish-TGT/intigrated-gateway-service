const express = require('express');
const multer = require('multer');
const path = require('path');
const morgan = require('morgan'); // Logger

const templateRoutes = require('./routes/templateRoutes');

const app = express();

// Logging incoming requests in terminal
app.use(morgan('dev'));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');

// Static file serving (for uploaded templates)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/templates', templateRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Template Management Service running at http://localhost:${PORT}`);
});
