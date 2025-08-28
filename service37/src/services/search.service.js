import Receipt from '../models/Receipt.js';
import mongoose from 'mongoose';

export async function searchReceipts(userId, entities, textQuery) {
  const filters = { userId };
  if (entities.startDate && entities.endDate) {
    filters.date = { $gte: entities.startDate, $lte: entities.endDate };
  }
  if (entities.minAmount || entities.maxAmount) {
    filters.amount = {};
    if (entities.minAmount) filters.amount.$gte = entities.minAmount;
    if (entities.maxAmount) filters.amount.$lte = entities.maxAmount;
  }
  if (entities.merchantHint) {
    filters.merchant = new RegExp(escapeRegex(entities.merchantHint), 'i');
  }

  let query = Receipt.find(filters).sort({ date: -1 }).limit(20);

  // If no strong entities, use text search fallback
  if ((!entities.startDate && !entities.merchantHint && !entities.minAmount && !entities.maxAmount) && textQuery) {
    query = Receipt.find({ $text: { $search: textQuery }, userId }).sort({ score: { $meta: 'textScore' } }).limit(20);
  }

  const results = await query.lean();
  return results;
}

function escapeRegex(s='') {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
