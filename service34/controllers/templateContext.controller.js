const TemplateContext = require('../models/templateContext.model');
const { findBestTemplate } = require('../services/contextSelector.service');

/**
 * Save a new template-context mapping to the database.
 */
exports.createContext = async (req, res) => {
  try {
    const saved = await TemplateContext.create(req.body);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Find the best template ID for a given context.
 */
exports.getTemplateByContext = async (req, res) => {
  try {
    const templateId = await findBestTemplate(req.body);
    if (!templateId) return res.status(404).json({ message: 'No matching template found' });
    res.json({ templateId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
