// middleware/upload.js
// This handles file upload using multer

const multer = require('multer');
const path = require('path');

// Set up storage configuration for multer
const storage = multer.diskStorage({
  // Uploaded files go to /uploads folder
  destination: './uploads/',

  // Rename file using current timestamp + original extension
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// ✅ File type filter – allow only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // accept file
  } else {
    cb(new Error('Only PDF files are allowed'), false); // reject file
  }
};

// Export configured multer middleware
module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // optional: 10 MB file limit
});
