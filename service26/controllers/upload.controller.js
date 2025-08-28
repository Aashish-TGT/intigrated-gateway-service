const fs = require("fs");
const { XMLParser, XMLValidator } = require("fast-xml-parser");

exports.uploadXML = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const xmlData = fs.readFileSync(req.file.path, "utf-8");
    console.log("Raw XML Data:", xmlData);

    // ✅ Validate XML
    const validationResult = XMLValidator.validate(xmlData);
    if (validationResult !== true) {
      console.error("XML Parse Error:", validationResult);
      return res.status(400).json({
        msg: "XML parsing failed",
        error: validationResult,
      });
    }

    // ✅ Parse XML
    const parser = new XMLParser();
    const parsedData = parser.parse(xmlData);
    console.log("Parsed XML:", parsedData);

    // TODO: Save to DB or map to receipt format
    return res.json({ msg: "Import successful", parsedData });
  } catch (error) {
    console.error("XML Import Error:", error.message);
    return res.status(500).json({ msg: "Import failed", error: error.message });
  }
};
