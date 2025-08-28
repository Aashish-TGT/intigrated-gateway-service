const { v4: uuidv4 } = require('uuid');

// Returns a random unique API key using UUID
const generateApiKey = () => {
  return `api_${uuidv4()}`;
};

module.exports = generateApiKey;