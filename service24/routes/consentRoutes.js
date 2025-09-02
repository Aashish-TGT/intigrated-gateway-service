const express = require('express');
const router = express.Router();
const consentController = require('../Controllers/consentController');

// POST /consent
router.post('/consent', consentController.createConsent);

// GET /consent/:userId
router.get('/consent/:userId', consentController.getUserConsent);

// DELETE /consent/request-deletion
router.delete('/consent/request-deletion', consentController.requestDeletion);

module.exports = router;
