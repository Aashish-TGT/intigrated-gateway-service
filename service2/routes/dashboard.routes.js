const express = require("express");
const router = express.Router();
const controller = require("../controllers/dashboard.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/summary", verifyToken, controller.getSummary);

module.exports = router;
