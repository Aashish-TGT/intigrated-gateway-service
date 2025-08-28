const express = require("express");
const router = express.Router();
const { authorizeDevice, getDeviceData } = require("../controllers/deviceController");
const authMiddleware = require("../utils/authMiddleware");

router.post("/authorize", authorizeDevice);
router.get("/data/:deviceId", authMiddleware, getDeviceData);

module.exports = router;