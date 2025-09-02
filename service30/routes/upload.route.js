const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const uploadController = require("../controllers/upload.controller");

router.post("/upload", upload.single("file"), uploadController.uploadXML);

module.exports = router;
