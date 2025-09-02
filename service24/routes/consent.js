// routes/consent.js
const express = require('express');
const router = express.Router();
const Consent = require('../models/Consent');

// POST /consent — save user consent
router.post('/', async (req, res) => {
  const { userId, consentGiven } = req.body;
  const newConsent = new Consent({ userId, consentGiven });
  await newConsent.save();
  res.json({ message: "Consent recorded." });
});

// GET /consent/:userId — get user's consent history
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const logs = await Consent.find({ userId });
  res.json(logs);
});

// DELETE /request-deletion — simulate delete request
router.delete('/request-deletion', async (req, res) => {
  const { userId } = req.body;
  await Consent.deleteMany({ userId });
  res.json({ message: "Consent history deleted for user." });
});

module.exports = router;
