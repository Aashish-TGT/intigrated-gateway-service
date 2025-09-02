// routes/optimizeRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // for handling file upload
const { optimizePDF } = require('../controllers/optimizeController'); // your controller logic

// ✅ Test route to check if API is working
router.get('/test', (req, res) => {
  res.send('✅ Test route working!');
});

// ✅ Main route to upload + compress PDF
router.post('/optimize', upload.single('pdf'), optimizePDF);

// ✅ Export the router so it can be used in app.js
module.exports = router;
