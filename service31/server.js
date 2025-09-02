const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const YAML = require('yamljs');
require('dotenv').config();

const app = express();
app.use(express.json());

// Load Swagger YAML
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Serve Swagger UI at /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve ReDoc HTML at /redoc
app.get('/redoc', (req, res) => {
  res.sendFile(path.join(__dirname, 'redoc.html'));
});

// Default Home Route
app.get('/', (req, res) => {
  res.send(`
    <h2>👋 Welcome to the Developer Portal Service</h2>
    <ul>
      <li><a href="/docs">Swagger UI Docs (/docs)</a></li>
      <li><a href="/redoc">ReDoc API Docs (/redoc)</a></li>
      <li><code>POST /get-sandbox-key</code> to get your test API key</li>
      <li><code>GET /sample-api</code> with header <code>x-api-key</code> to test protected APIs</li>
    </ul>
  `);
});

// POST /get-sandbox-key — generate a unique test key
app.post('/get-sandbox-key', (req, res) => {
  const apiKey = uuidv4();
  const keys = loadKeys();
  keys.push(apiKey);
  saveKeys(keys);
  res.json({ apiKey });
});

// GET /sample-api — protected test endpoint
app.get('/sample-api', (req, res) => {
  const userKey = req.headers['x-api-key'];
  const keys = loadKeys();

  if (!userKey || !keys.includes(userKey)) {
    return res.status(401).json({ error: 'Invalid or missing API Key' });
  }

  res.json({ message: '🎉 Welcome to the sandbox API!' });
});

// Helpers to manage sandbox keys
function loadKeys() {
  const filePath = path.join(__dirname, 'keys', 'sandbox-keys.json');
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveKeys(keys) {
  const filePath = path.join(__dirname, 'keys', 'sandbox-keys.json');
  fs.writeFileSync(filePath, JSON.stringify(keys, null, 2));
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Developer Portal running at http://localhost:${PORT}`);
});
