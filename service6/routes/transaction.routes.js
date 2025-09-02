const express = require("express");
const router = express.Router();
const controller = require("../controllers/transaction.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, controller.getTransactions);

module.exports = router;
