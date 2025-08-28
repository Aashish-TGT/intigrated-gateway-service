const express = require("express");
const router = express.Router();
const controller = require("../controllers/log.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, controller.getLogs);

module.exports = router;
