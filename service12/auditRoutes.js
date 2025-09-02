const express = require('express');
const router = express.Router();
const { queryEvents } = require('../cosmos/cosmosClient');
const { exportToCSV, exportToPDF } = require('../exports/exportUtils');

router.get('/events', async (req, res) => {
  const { userId, exportType } = req.query;
  const events = await queryEvents({ userId });

  if (exportType === 'csv') {
    const path = './exports/audit.csv';
    exportToCSV(events, path);
    return res.download(path);
  } else if (exportType === 'pdf') {
    const path = './exports/audit.pdf';
    exportToPDF(events, path);
    return res.download(path);
  }

  res.json(events);
});

module.exports = router;
