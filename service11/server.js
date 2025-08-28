const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    loadAverage: os.loadavg(),
  });
});

app.listen(port, () => {
  console.log(`✅ Health check running at http://localhost:${port}/health`);
});
