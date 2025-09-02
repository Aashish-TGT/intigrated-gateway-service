// Simulate database with a simple in-memory object
const receiptDB = {};

function saveReceipt(id, originalData) {
  const { generateHash } = require('../utils/hashUtil');
  receiptDB[id] = generateHash(originalData);
}

function getReceiptHash(id) {
  return receiptDB[id];
}

module.exports = { saveReceipt, getReceiptHash };
