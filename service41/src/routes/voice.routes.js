const express = require("express");
const router = express.Router();
const { searchReceipts } = require("../controllers/voice.controller");

router.post("/search", searchReceipts);

module.exports = router;
