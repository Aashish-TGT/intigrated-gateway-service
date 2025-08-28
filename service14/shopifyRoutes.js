const express = require('express');
const router = express.Router();
const shopifyAdapter = require('../adapters/shopifyAdapter');

router.post('/order', async (req, res) => {
  try {
    await shopifyAdapter.handleOrder(req.body);
    res.status(200).send('Shopify order received');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing order');
  }
});

module.exports = router;
