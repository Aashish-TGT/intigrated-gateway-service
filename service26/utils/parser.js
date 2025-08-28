const parser = require('fast-xml-parser');

exports.parseXML = (xmlString) => {
  const options = {
    ignoreAttributes: false,
    parseAttributeValue: true,
  };

  const isValid = parser.validate(xmlString);
  if (isValid !== true) {
    throw new Error("Invalid XML structure");
  }

  const parsed = parser.parse(xmlString, options);

  // Adjust this depending on your root/record structure
  const records = parsed.root?.record;
  if (!records) throw new Error("Missing <record> inside <root>");

  return Array.isArray(records) ? records : [records];
};  
