const express = require("express");
const router = express.Router();
const {
  uploadEsgData,
  getEsgDataByTenant,
  downloadPdfReport,
  downloadExcelReport
} = require("../controllers/esgController");

router.post("/upload", uploadEsgData);
router.get("/:tenantId", getEsgDataByTenant);
router.get("/:tenantId/pdf", downloadPdfReport);
router.get("/:tenantId/excel", downloadExcelReport);

module.exports = router;