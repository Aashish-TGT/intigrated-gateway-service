// routes/receiptRoutes.js

const express = require('express');
const router = express.Router();
const Impact = require('../models/Impact');
const { Parser } = require('json2csv');
const emissionFactors = require('../data/emissionFactors');

// 🌱 Calculate & Save CO₂ Savings for Paper Receipts
router.post('/calculate-saving', async (req, res) => {
  try {
    const { numberOfReceipts, businessId = 'books4all' } = req.body;

    if (!numberOfReceipts || numberOfReceipts < 1) {
      return res.status(400).json({ error: "numberOfReceipts is required and must be a positive number." });
    }

    const savedCO2 = numberOfReceipts * emissionFactors.paperReceipt.gramsCO2PerReceipt;

    const newImpact = new Impact({
      businessId,
      month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
      receiptCount: numberOfReceipts,
      savedCO2
    });

    await newImpact.save();
    res.status(201).json({ message: 'Impact recorded successfully', numberOfReceipts, savedCO2 });
  } catch (error) {
    console.error("❌ Error in /calculate-saving:", error);
    res.status(500).json({ error: 'Failed to save receipt data.' });
  }
});

// 📊 Get Monthly CO₂ Report by Business ID
router.get('/report/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const data = await Impact.find({ businessId }).sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    console.error("❌ Error in /report/:businessId:", error);
    res.status(500).json({ error: 'Failed to fetch report.' });
  }
});

// 📥 Export Monthly Report as CSV
router.get('/report/:businessId/export', async (req, res) => {
  try {
    const { businessId } = req.params;
    const data = await Impact.find({ businessId });

    if (!data.length) {
      return res.status(404).json({ error: 'No report found for this business.' });
    }

    const fields = ['month', 'receiptCount', 'savedCO2'];
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment(`carbon-report-${businessId}.csv`);
    res.send(csv);
  } catch (error) {
    console.error("❌ Error in /report/export:", error);
    res.status(500).json({ error: 'Failed to export CSV.' });
  }
});

module.exports = router;
