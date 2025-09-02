const fs = require('fs');
const path = require('path');
const generatePDF = require('./pdfGenerator');
const { syncTransactions } = require('./syncManager');

const CACHE_DIR = path.join(__dirname, 'cache');
const OUTPUT_DIR = path.join(__dirname, 'output');
const LOG_FILE = path.join(__dirname, 'logs', 'agent.log');

function log(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(LOG_FILE, `[${timestamp}] ${message}\n`);
  console.log(message);
}

async function runAgent() {
  const files = fs.readdirSync(CACHE_DIR);

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(CACHE_DIR, file);
      const rawData = fs.readFileSync(filePath);
      const data = JSON.parse(rawData);

      const pdfPath = path.join(OUTPUT_DIR, `${data.id}.pdf`);
      await generatePDF(data, pdfPath);

      fs.unlinkSync(filePath); // Delete after processing
      log(` Transaction ${data.id} saved & PDF generated.`);
    }
  }

  syncTransactions();
}

runAgent();