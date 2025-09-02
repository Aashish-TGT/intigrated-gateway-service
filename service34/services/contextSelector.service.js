const TemplateContext = require('../models/templateContext.model');

/**
 * Selects the best matching template ID based on priority:
 * 1. Exact match
 * 2. Match by brand only
 * 3. Fallback to global default
 */
async function findBestTemplate(context) {
  const fallbackLevels = [
    context, // exact match
    { brand: context.brand, outlet: null, type: null, language: null },
    { brand: null, outlet: null, type: null, language: null }
  ];

  for (const filter of fallbackLevels) {
    const match = await TemplateContext.findOne(filter).sort({ version: -1 });
    if (match) return match.templateId;
  }

  return null; // no match found
}

module.exports = { findBestTemplate };
