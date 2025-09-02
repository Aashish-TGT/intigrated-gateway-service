const fs = require('fs');
const path = require('path');

const cacheDir = path.join(__dirname, 'cache');
const logFile = path.join(__dirname, 'logs', 'agent.log');

function syncTransactions() {
  const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));

  files.forEach(file => {
    const filePath = path.join(cacheDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Simulate sync
    console.log(`✅ Synced transaction ${data.id}`);

    // Log & delete
    fs.appendFileSync(logFile, `[${new Date().toISOString()}] Synced ${data.id}\n`);
    fs.unlinkSync(filePath);
  });
}

module.exports = syncTransactions;