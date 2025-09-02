const express = require("express");
const router = express.Router();
const { createTransaction, getAllTransactions } = require("../controllers/transactionController");
const authMiddleware = require("../utils/authMiddleware");

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getAllTransactions);

module.exports = router;