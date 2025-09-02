const { CosmosClient } = require('@azure/cosmos');
const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY
});
const database = client.database(process.env.COSMOS_DATABASE);
const container = database.container(process.env.COSMOS_CONTAINER);

async function insertEvent(event) {
  event.timestamp = new Date().toISOString();
  await container.items.create(event);
}

async function queryEvents(filter = {}) {
  const query = {
    query: 'SELECT * FROM c WHERE (@userId IS NULL OR c.userId = @userId)',
    parameters: [{ name: '@userId', value: filter.userId || null }]
  };
  const { resources } = await container.items.query(query).fetchAll();
  return resources;
}

module.exports = { insertEvent, queryEvents };
