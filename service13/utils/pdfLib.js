// utils/pdfLib.js
// Adds watermark text to PDF using pdf-lib

const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

// Function to add watermark text to all PDF pages
async function addWatermark(pdfPath, watermarkText) {
  const existingPdfBytes = fs.readFileSync(pdfPath); // Read PDF file
  const pdfDoc = await PDFDocument.load(existingPdfBytes); // Load into PDFDocument
  const pages = pdfDoc.getPages(); // Get all pages

  // Draw watermark on each page
  for (let page of pages) {
    page.drawText(watermarkText, {
      x: 50,
      y: 50,
      size: 12,
      color: rgb(0.5, 0.5, 0.5), // Light gray color
      opacity: 0.5,              // Slightly transparent
    });
  }

  const pdfBytes = await pdfDoc.save(); // Save modified PDF
  fs.writeFileSync(pdfPath, pdfBytes);  // Write to same path
}

module.exports = addWatermark;
