const dataForwarder = require('../services/dataForwarder');

exports.handleOrder = async (data) => {
  const formatted = {
    source: 'ZohoPOS',
    orderId: data.order_number,
    customerEmail: data.customer?.email,
    items: data.products
  };

  await dataForwarder.sendToIngestion(formatted);
};
