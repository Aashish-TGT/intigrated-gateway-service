// updateServer.js
const express = require('express');
const app = express();
const port = 4000;
const LATEST_VERSION ="2.0.0";

app.get('/latest-version', (req, res) => {
  res.json({ version: LATEST_VERSION });
});

app.listen(port , () => {
  console.log(` Update server running at http://localhost:${port}`);
});