const express = require('express');
const router = express.Router();

const Partner = require('../models/Partner');
const Client = require('../models/Client');

// POST /partner/signup
router.post('/signup', async (req, res) => {
  try {
    // ✅ ADD THIS: print the request body to the terminal
    console.log('📦 Incoming request body:', req.body);

    const { name, email } = req.body;
    const partnerId = require('uuid').v4();

    const newPartner = new Partner({ name, email, partnerId, clients: [], commission: 0 });
    await newPartner.save();

    res.json({ message: '✅ Partner created successfully', partnerId });
  } catch (err) {
    // ✅ ADD THIS: print the error
    console.error('❌ Error while registering partner:', err);
    res.status(500).json({ error: '❌ Failed to register partner' });
  }
});


// POST /partner/client/signup
router.post('/client/signup', async (req, res) => {
  try {
    const { name, email, partnerId } = req.body;

    const client = new Client({ name, email, partnerId });
    await client.save();

    await Partner.findOneAndUpdate(
      { partnerId },
      {
        $push: { clients: { name, email } },
        $inc: { commission: 100 }
      }
    );

    res.json({ message: '✅ Client registered successfully' });
  } catch (err) {
    res.status(500).json({ error: '❌ Client signup failed' });
  }
});

// GET /partner/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const { partnerId } = req.query;
    const partner = await Partner.findOne({ partnerId });

    if (!partner) return res.status(404).json({ error: 'Partner not found' });

    res.json({
      partnerId: partner.partnerId,
      name: partner.name,
      email: partner.email,
      clients: partner.clients,
      commission: partner.commission
    });
  } catch (err) {
    res.status(500).json({ error: 'Dashboard error' });
  }
});

// GET /partner/:partnerId/commission-report
router.get('/:partnerId/commission-report', async (req, res) => {
  try {
    const partner = await Partner.findOne({ partnerId: req.params.partnerId });

    if (!partner) return res.status(404).json({ error: 'Partner not found' });

    res.json({
      partnerId: partner.partnerId,
      clients: partner.clients,
      totalCommission: partner.commission
    });
  } catch (err) {
    res.status(500).json({ error: 'Error loading report' });
  }
});
router.get('/all', async (req, res) => {
  try {
    const partners = await Partner.find({}, 'partnerId name email');
    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch partners' });
  }
});

module.exports = router;

