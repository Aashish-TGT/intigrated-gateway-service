// cosmosClient.js
const { CosmosClient } = require("@azure/cosmos");
require("dotenv").config();

const {
  COSMOS_ENDPOINT,
  COSMOS_KEY,
  COSMOS_DATABASE,
  COSMOS_CONTAINER
} = process.env;

if (!COSMOS_ENDPOINT || !COSMOS_KEY || !COSMOS_DATABASE || !COSMOS_CONTAINER) {
  throw new Error("❌ Missing Cosmos DB configuration in .env file.");
}

const client = new CosmosClient({
  endpoint: COSMOS_ENDPOINT,
  key: COSMOS_KEY,
});

const database = client.database(COSMOS_DATABASE);
const container = database.container(COSMOS_CONTAINER);

module.exports = container;
