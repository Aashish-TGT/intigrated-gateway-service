const express = require("express");
const router = express.Router();
const { getAllMappings } = require("../controllers/mappingController");

// GET /api/v1/mapping → returns ESG/SDG mappings
router.get("/", getAllMappings);

module.exports = router;
