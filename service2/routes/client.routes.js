const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// ✅ Existing routes here...

// 🔄 Update client plan
router.put("/:id/plan", verifyToken, clientController.updateClientPlan);

module.exports = router;
