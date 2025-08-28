const express = require('express');
require('dotenv').config();
const insights = require('./insights');
const logRoutes = require('./routes/logRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api', logRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Analytics service running on port ${PORT}`);
  if (insights) {
    insights.trackEvent({ name: "ServiceStarted", properties: { port: PORT } });
  }
});
