const express = require("express");
const router = express.Router();
const controller = require("../controllers/error.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, controller.getErrors);

module.exports = router;
