const fs = require('fs');
const csv = require('csv-parser');
const { parseXML } = require('../utils/parser');

let lastImportStatus = [];

exports.handleUpload = async (req, res) => {
  const file = req.file;

  if (!file) return res.status(400).json({ msg: "No file uploaded" });

  const results = [];

  try {
    if (file.mimetype === 'text/csv') {
      fs.createReadStream(file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          lastImportStatus = results;
          res.status(200).json({ msg: "CSV file processed", records: results.length });
        });
    } else if (
      file.mimetype === 'text/xml' ||
      file.mimetype === 'application/xml'
    ) {
      try {
        const xmlData = fs.readFileSync(file.path, 'utf-8');
        console.log("Raw XML Data:", xmlData);

        const parsed = parseXML(xmlData);
        console.log("Parsed XML:", parsed);

        lastImportStatus = parsed;
        res.status(200).json({ msg: "XML parsed", records: parsed.length });
      } catch (e) {
        console.error("XML Parse Error:", e.message);
        res.status(500).json({ msg: "XML parsing failed", error: e.message });
      }
    } else {
      return res.status(400).json({ msg: "Unsupported file type" });
    }
  } catch (err) {
    console.error("General Error:", err.message);
    res.status(500).json({ msg: "Import failed", error: err.message });
  }
};

exports.getImportStatus = (req, res) => {
  res.json({ status: "last import", data: lastImportStatus });
};
