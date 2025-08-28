// utils/generatePayload.js
const { v4: uuidv4 } = require('uuid');

/**
 * Generate a standardized payload for syncing receipts to different wallet services.
 * 
 * @param {Object} receipt - Receipt object containing items, total, merchant, and date.
 * @param {String} userId - Unique user identifier.
 * @returns {Object} - Standardized payload.
 */
function generatePayload(receipt, userId) {
  if (!receipt || typeof receipt !== 'object') {
    throw new Error('Invalid receipt object');
  }
  if (!userId) {
    throw new Error('User ID is required');
  }

  return {
    id: uuidv4(),
    userId,
    items: Array.isArray(receipt.items) ? receipt.items : [],
    total: Number(receipt.total) || 0,
    merchant: receipt.merchant || 'Unknown Merchant',
    issuedAt: receipt.date || new Date().toISOString()
  };
}

module.exports = generatePayload;
