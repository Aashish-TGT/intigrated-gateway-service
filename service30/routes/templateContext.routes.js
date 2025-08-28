const express = require('express');
const router = express.Router();
const controller = require('../controllers/templateContext.controller');

// Create new template mapping
router.post('/template-context', controller.createContext);

// Get best matching template based on input context
router.post('/template-context/find', controller.getTemplateByContext);

module.exports = router;
