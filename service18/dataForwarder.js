const axios = require('axios');
const INTAKE_URL = process.env.INGESTION_SERVICE_URL;

exports.sendToIngestion = async (payload) => {
  await axios.post(INTAKE_URL, payload);
  console.log(`Data sent to ingestion:`, payload);
};
