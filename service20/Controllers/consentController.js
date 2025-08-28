const Consent = require('../models/Consent');
exports.createConsent = async (req, res) => {
  console.log("Incoming request body:", req.body); // ✅ Add this here

  const { userId, consentType, given } = req.body;
  const newConsent = new Consent({ userId, consentType, given });

  try {
    await newConsent.save();
    res.status(201).json({ message: "Consent recorded." });
  } catch (error) {
    console.error("❌ Error saving consent:", error.message);
    res.status(500).json({ error: error.message });
  }
};


exports.getUserConsent = async (req, res) => {
  const { userId } = req.params;
  const consents = await Consent.find({ userId });
  res.status(200).json(consents);
};

exports.requestDeletion = async (req, res) => {
  const { userId } = req.body;
  // Add userId to deletion queue (fake it here)
  console.log(`User ${userId} requested deletion.`);
  res.status(200).json({ message: "User added to deletion queue." });
};
