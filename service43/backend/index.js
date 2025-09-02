const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { generateToken, verifyToken } = require('./tokenUtils');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Load logs
const consentLogPath = './consent-log.json';
const auditLogPath = './audit-log.json';

// Ensure logs exist
if (!fs.existsSync(consentLogPath)) fs.writeFileSync(consentLogPath, '[]');
if (!fs.existsSync(auditLogPath)) fs.writeFileSync(auditLogPath, '[]');

// POST /consent
app.post('/consent', (req, res) => {
  const token = generateToken(req.body);
  const logEntry = { ...req.body, token, timestamp: new Date().toISOString() };
  const logs = JSON.parse(fs.readFileSync(consentLogPath));
  logs.push(logEntry);
  fs.writeFileSync(consentLogPath, JSON.stringify(logs, null, 2));
  res.json({ token });
});

// GET /access-receipt?token=...
app.get('/access-receipt', (req, res) => {
  const { token } = req.query;
  const result = verifyToken(token);

  const auditEntry = {
    token,
    accessedAt: new Date().toISOString(),
    status: result.valid ? 'Access Granted' : 'Access Denied',
    reason: result.reason || null
  };

  const auditLogs = JSON.parse(fs.readFileSync(auditLogPath));
  auditLogs.push(auditEntry);
  fs.writeFileSync(auditLogPath, JSON.stringify(auditLogs, null, 2));

  if (!result.valid) {
    return res.status(403).json({ error: result.reason });
  }

  // Simulate returning a digital receipt
  res.json({
    receiptId: result.payload.receiptId,
    from: 'Amazon',
    total: '₹1500',
    issuedDate: '2025-06-20'
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(` Backend running on http://localhost:${PORT}`));
