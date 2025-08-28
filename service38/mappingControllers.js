const mappingData = require("../esg-mapping.json");

exports.getAllMappings = (req, res) => {
  res.json(mappingData);
};