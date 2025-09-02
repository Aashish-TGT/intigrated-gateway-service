const mongoose = require('mongoose');

/**
 * TemplateContext schema stores mapping between:
 * - brand
 * - outlet
 * - transaction type (invoice, return, etc.)
 * - language (en, hi, etc.)
 * - versioning for updates
 */
const templateContextSchema = new mongoose.Schema({
  brand: String,
  outlet: String,
  type: String,
  language: String,
  templateId: String,
  version: Number
}, { timestamps: true }); // adds createdAt, updatedAt

module.exports = mongoose.model('TemplateContext', templateContextSchema);
