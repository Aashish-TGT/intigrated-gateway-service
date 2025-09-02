const express = require('express');
const router = express.Router();
const Receipt = require('../models/Receipt');

// 💡 Emission factor (4g CO2 saved per digital receipt)
const GRAMS_CO2_SAVED_PER_RECEIPT = 4;

router.get('/co2-saved/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;

    if (!businessId) {
      return res.status(400).json({ error: 'Business ID is required.' });
    }

    const digitalReceipts = await Receipt.find({ businessId, receiptType: 'digital' });

    const totalCO2Saved = digitalReceipts.length * GRAMS_CO2_SAVED_PER_RECEIPT;

    res.json({
      businessId,
      totalDigitalReceipts: digitalReceipts.length,
      totalCO2SavedInGrams: totalCO2Saved,
      totalCO2SavedInKg: (totalCO2Saved / 1000).toFixed(2)
    });
  } catch (error) {
    console.error('❌ Error in /co2-saved:', error);
    res.status(500).json({ error: 'Something went wrong while calculating CO₂ saved.' });
  }
});

module.exports = router;
