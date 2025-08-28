const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  uploadTemplate,
  renderTemplatePreview,
  listTemplates
} = require('../controllers/templateController');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('template'), uploadTemplate);
router.get('/preview/:filename', renderTemplatePreview);
router.get('/list', listTemplates);

module.exports = router;
