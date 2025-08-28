const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { Parser } = require('json2csv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// 🌱 Constants
const GRAMS_CO2_SAVED_PER_DIGITAL_RECEIPT = 4;
const emissionFactors = {
  paperReceipt: { gramsCO2PerReceipt: 2.5 }
};

// ✅ Mongoose Models
const ImpactSchema = new mongoose.Schema({
  businessId: String,
  month: String,
  receiptCount: Number,
  savedCO2: Number,
  createdAt: { type: Date, default: Date.now }
});
const Impact = mongoose.model('Impact', ImpactSchema);

const ReceiptSchema = new mongoose.Schema({
  businessId: { type: String, required: true },
  receiptType: { type: String, enum: ['paper', 'digital'], required: true, default: 'digital' },
  co2Saved: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
});
const Receipt = mongoose.model('Receipt', ReceiptSchema);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/carbon', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ 1. Calculate & Save CO₂ Savings (manual input)
app.post('/calculate-saving', async (req, res) => {
  try {
    const { numberOfReceipts, businessId = 'books4all' } = req.body;
    if (!numberOfReceipts || numberOfReceipts < 1) {
      return res.status(400).json({ error: "numberOfReceipts is required and must be positive." });
    }

    const savedCO2 = numberOfReceipts * emissionFactors.paperReceipt.gramsCO2PerReceipt;

    const newImpact = new Impact({
      businessId,
      month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
      receiptCount: numberOfReceipts,
      savedCO2
    });

    await newImpact.save();
    res.json({ numberOfReceipts, savedCO2 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate CO2 savings.' });
  }
});

// ✅ 2. Fetch CO₂ Report by Business ID
app.get('/report/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const data = await Impact.find({ businessId }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch report.' });
  }
});

// ✅ 3. Export CSV Report
app.get('/report/:businessId/export', async (req, res) => {
  try {
    const { businessId } = req.params;
    const data = await Impact.find({ businessId });

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No report found' });
    }

    const fields = ['month', 'receiptCount', 'savedCO2'];
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment(`carbon-report-${businessId}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'CSV export failed.' });
  }
});

// ✅ 4. CO2 Saved from Digital Receipts
app.get('/co2-saved/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;

    const digitalReceipts = await Receipt.find({ businessId, receiptType: 'digital' });
    const totalCO2Saved = digitalReceipts.length * GRAMS_CO2_SAVED_PER_DIGITAL_RECEIPT;

    res.json({
      businessId,
      totalDigitalReceipts: digitalReceipts.length,
      totalCO2SavedInGrams: totalCO2Saved,
      totalCO2SavedInKg: (totalCO2Saved / 1000).toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate digital receipt savings.' });
  }
});

// ✅ Default Health Route
app.get('/', (req, res) => {
  res.send('🌍 MS36 Carbon Receipt API is Live');
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ MS36 running at http://localhost:${port}`);
});
