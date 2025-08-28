// insights.js
const appInsights = require("applicationinsights");
require("dotenv").config();

const instrumentationKey = process.env.INSTRUMENTATION_KEY;

if (!instrumentationKey) {
  console.warn("⚠️ INSTRUMENTATION_KEY not set. Application Insights is disabled.");
  module.exports = null;
  return;
}

appInsights.setup(instrumentationKey)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .start();

module.exports = appInsights.defaultClient;
