const container = require('./cosmosClient');
const client = require('./insights');

exports.logEvent = async (req, res) => {
  const event = req.body;

  // Basic validation
  if (!event || typeof event !== 'object' || !event.type || !event.timestamp) {
    return res.status(400).json({ error: "Invalid or incomplete event data" });
  }

  try {
    // Store in Cosmos DB
    const { resource } = await container.items.create(event);

    // Sanitize and log to App Insights
    const safeEvent = { ...event };
    delete safeEvent.password;
    delete safeEvent.token;

    if (client) {
      client.trackEvent({ name: "CustomLogEvent", properties: safeEvent });
    }

    res.status(201).json({ message: 'Log stored successfully', id: resource.id });
  } catch (error) {
    if (client) client.trackException({ exception: error });
    res.status(500).json({ error: 'Failed to log event' });
  }
};
