const usageLimits = {
    dailyLimit: 1000, // Example daily limit for QR code usage
    monthlyLimit: 30000 // Example monthly limit for QR code usage
};

let usageData = {
    dailyUsage: 0,
    monthlyUsage: 0
};

function trackUsage(qrCount) {
    usageData.dailyUsage += qrCount;
    usageData.monthlyUsage += qrCount;

    checkLimits();
}

function checkLimits() {
    if (usageData.dailyUsage > usageLimits.dailyLimit) {
        sendOverageAlert('daily', usageData.dailyUsage);
    }
    if (usageData.monthlyUsage > usageLimits.monthlyLimit) {
        sendOverageAlert('monthly', usageData.monthlyUsage);
    }
}

function sendOverageAlert(period, usage) {
    // Logic to send an alert (e.g., email, SMS, etc.)
    console.log(`Overage alert! ${period.charAt(0).toUpperCase() + period.slice(1)} usage exceeded: ${usage}`);
}

function resetDailyUsage() {
    usageData.dailyUsage = 0;
}

function resetMonthlyUsage() {
    usageData.monthlyUsage = 0;
}

module.exports = {
    trackUsage,
    resetDailyUsage,
    resetMonthlyUsage
};