const fs = require('fs');
const path = require('path');

const logActivity = (activity) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        activity: activity,
    };

    const logFilePath = path.join(__dirname, '../logs/auditLog.json');

    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading log file:', err);
            return;
        }

        const logs = JSON.parse(data || '[]');
        logs.push(logEntry);

        fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    });
};

const getAuditLogs = () => {
    const logFilePath = path.join(__dirname, '../logs/auditLog.json');
    return new Promise((resolve, reject) => {
        fs.readFile(logFilePath, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading log file:', err);
            } else {
                resolve(JSON.parse(data || '[]'));
            }
        });
    });
};

module.exports = {
    logActivity,
    getAuditLogs,
};