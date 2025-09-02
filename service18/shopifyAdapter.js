const dataForwarder = require('../services/dataForwarder');

exports.handleOrder = async (data) => {
  const formatted = {
    source: 'Shopify',
    orderId: data.id,
    customerEmail: data.email,
    items: data.line_items
  };

  await dataForwarder.sendToIngestion(formatted);
};
