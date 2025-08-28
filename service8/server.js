require('dotenv').config();
const express = require('express');
const startConsumer = require('./kafka/consumer');
const auditRoutes = require('./routes/auditRoutes');

const app = express();
app.use(express.json());

app.use('/audit', auditRoutes);

app.listen(3000, () => {
  console.log('Audit service running on port 3000');
  startConsumer();
});
