// events/eventLogger.js
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/events.log');

// Ensure logs directory exists
if (!fs.existsSync(path.join(__dirname, '../logs'))) {
  fs.mkdirSync(path.join(__dirname, '../logs'));
}

exports.log = (event) => {
  const logEntry = {
    ...event,
    loggedAt: new Date().toISOString()
  };

  // Console Log (for quick view)
  console.log(`📘 Event Logged:`, logEntry);

  // Append to file (persistent log)
  fs.appendFile(logFilePath, JSON.stringify(logEntry) + '\n', (err) => {
    if (err) {
      console.error('❌ Error writing log:', err);
    }
  });
};
