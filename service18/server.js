require('dotenv').config();
const express = require('express');
const app = express();

const shopifyRoutes = require('./routes/shopifyRoutes');
const zohoRoutes = require('./routes/zohoRoutes');

app.use(express.json());

app.use('/webhook/shopify', shopifyRoutes);
app.use('/webhook/zoho', zohoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`POS Integration Service running on port ${PORT}`);
});
