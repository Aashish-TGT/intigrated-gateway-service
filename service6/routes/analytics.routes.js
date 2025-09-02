const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/summary", verifyToken, analyticsController.getSummary);

module.exports = router;
