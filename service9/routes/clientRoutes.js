const express = require('express');
const Client = require('../models/Client');
const Receipt = require('../models/Receipt');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(auth);

// List all clients
router.get('/', async (req, res) => {
  const clients = await Client.findAll();
  res.json(clients);
});

// Get usage & dues
router.get('/:id/usage', async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (!client) return res.status(404).json({ error: 'Client not found' });

  res.json({
    subscriptionUsed: client.subscriptionUsed,
    subscriptionLimit: client.subscriptionLimit,
    dueAmount: client.dueAmount,
  });
});

// All receipts of a client
router.get('/:id/receipts', async (req, res) => {
  const receipts = await Receipt.findAll({ where: { clientId: req.params.id } });
  res.json(receipts);
});

// 🔥 Create a new receipt for a client
router.post('/:id/receipts', async (req, res) => {
  try {
    const { receiptId, posId, datePrinted } = req.body;
    const clientId = req.params.id;

    const client = await Client.findByPk(clientId);
    if (!client) return res.status(404).json({ error: 'Client not found' });

    const receipt = await Receipt.create({ receiptId, clientId, posId, datePrinted });

    // Increase subscriptionUsed count
    client.subscriptionUsed += 1;
    await client.save();

    res.status(201).json(receipt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
