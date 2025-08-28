const express = require('express');
const router = express.Router();
const multer = require('multer');
const { handleUpload, getImportStatus } = require('../controllers/import.controller');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), handleUpload);
router.get('/status', getImportStatus);

module.exports = router;
