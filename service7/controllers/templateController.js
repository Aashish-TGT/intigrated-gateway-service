const fs = require('fs');
const path = require('path');
const sandboxRenderer = require('../utils/sandboxRenderer');

exports.uploadTemplate = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  res.status(201).json({
    message: 'Template uploaded successfully',
    filename: req.file.filename
  });
};

exports.renderTemplatePreview = async (req, res) => {
  const { filename } = req.params;
  const templatePath = path.join(__dirname, '..', 'uploads', filename);

  if (!fs.existsSync(templatePath)) {
    return res.status(404).json({ error: 'Template not found' });
  }

  const dynamicData = {
    customerName: "Minakshi Saini",
    orderId: "ORD123456",
    amount: "₹750.00",
    region: "Delhi",
    date: new Date().toLocaleDateString()
  };

  try {
    const rendered = await sandboxRenderer(templatePath, dynamicData);
    res.send(rendered);
  } catch (error) {
    res.status(500).json({ error: 'Template rendering failed', detail: error.message });
  }
};

exports.listTemplates = (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, '..', 'uploads'));
  res.json({ templates: files });
};
