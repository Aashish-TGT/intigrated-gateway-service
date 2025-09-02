const EsgMetric = require("../utils/esgMetricModel");
const reportService = require("../services/reportService");
const excel = require("exceljs");

exports.uploadEsgData = async (req, res) => {
  try {
    const metric = new EsgMetric(req.body);
    await metric.save();
    res.status(201).json({ message: "ESG data saved successfully", metric });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEsgDataByTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const metrics = await EsgMetric.find({ tenantId });
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.downloadPdfReport = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const metrics = await EsgMetric.find({ tenantId });
    const buffer = await reportService.generateReport(tenantId, metrics[0]);
    res.setHeader("Content-Disposition", `attachment; filename=${tenantId}_report.pdf`);
    res.contentType("application/pdf").send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.downloadExcelReport = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const metrics = await EsgMetric.find({ tenantId });
    const workbook = new excel.Workbook();
    const sheet = workbook.addWorksheet("ESG Report");

    sheet.columns = [
      { header: "Period From", key: "from" },
      { header: "Period To", key: "to" },
      { header: "Paper Saved", key: "paperSaved" },
      { header: "CO₂ Saved", key: "co2Saved" },
      { header: "Trees Saved", key: "treesSaved" },
      { header: "Environmental", key: "env" },
      { header: "Social", key: "social" },
      { header: "Governance", key: "gov" },
      { header: "SDG Goals", key: "sdgGoals" }
    ];

    metrics.forEach((m) => {
      sheet.addRow({
        from: m.period.from,
        to: m.period.to,
        paperSaved: m.paperSaved,
        co2Saved: m.co2Saved,
        treesSaved: m.treesSaved,
        env: m.esgScore.Environmental,
        social: m.esgScore.Social,
        gov: m.esgScore.Governance,
        sdgGoals: m.sdgGoals.join(", ")
      });
    });

    res.setHeader("Content-Disposition", `attachment; filename=${tenantId}_report.xlsx`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
