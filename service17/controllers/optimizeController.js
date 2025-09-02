// controllers/optimizeController.js

const path = require('path');
const fs = require('fs');
const { compressPDF } = require('../utils/ghostscript');

const optimizePDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const inputPath = path.join(__dirname, '..', 'uploads', req.file.filename);
    const outputPath = path.join(__dirname, '..', 'optimized', req.file.filename);

    console.log("📥 Input file:", inputPath);
    console.log("📤 Output file:", outputPath);

    // Run Ghostscript compression
    const result = await compressPDF(inputPath, outputPath);
    console.log("✅ Compression result:", result);

    // Send optimized PDF back
    res.download(outputPath);
  } catch (error) {
    console.error("❌ Server error:", error); // <-- Important log
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
};

module.exports = { optimizePDF };
