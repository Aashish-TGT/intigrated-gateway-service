// healthCheck.js
const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.send('✅ Health check working');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Simple test server running on http://localhost:${PORT}`);
});