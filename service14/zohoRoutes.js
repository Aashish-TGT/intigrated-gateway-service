const express = require('express');
const router = express.Router();
const zohoAdapter = require('../adapters/zohoAdapter');

router.post('/order', async (req, res) => {
  try {
    await zohoAdapter.handleOrder(req.body);
    res.status(200).send('Zoho order received');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing order');
  }
});

module.exports = router;
