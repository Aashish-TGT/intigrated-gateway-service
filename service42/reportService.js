const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

exports.generateReport = async (tenantId, data) => {
  const templatePath = path.join(__dirname, "../../reports/templates/report-template.html");
  const htmlTemplate = fs.readFileSync(templatePath, "utf8");

  const filledTemplate = htmlTemplate
    .replace(/{{tenantId}}/g, tenantId)
    .replace(/{{paperSaved}}/g, data.paperSaved)
    .replace(/{{co2Saved}}/g, data.co2Saved)
    .replace(/{{treesSaved}}/g, data.treesSaved)
    .replace(/{{sdgGoals}}/g, data.sdgGoals.join(", "));

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(filledTemplate);
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();
  return pdfBuffer;
};