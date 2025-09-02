import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import puppeteer from "puppeteer";
import { config } from "../config.js";
import { registry } from "./templateRegistry.js";

// Generate PDF using Puppeteer (HTML -> PDF)
export async function generatePDF(data, { templateName = "default", version } = {}) {
  let template;

  // ✅ Check registry
  if (registry[templateName]) {
    if (version && registry[templateName].versions[version]) {
      template = registry[templateName].versions[version];
    } else if (registry[templateName].current) {
      template = registry[templateName].current;
    }
  }

  // ✅ Fallback template
  if (!template) {
    const fallbackPath = path.join(config.paths.templatesDir, "default", "v1.hbs");
    const exists = await fs.promises
      .access(fallbackPath)
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      throw new Error(`No template found for ${templateName}, and no default fallback available.`);
    }

    template = { path: fallbackPath };
  }

  // Load and compile Handlebars template
  const source = await fs.promises.readFile(template.path, "utf-8");
  const compiled = Handlebars.compile(source);

  // Render HTML with data
  const html = compiled(data);

  // Output path
  const fileName = `receipt-${Date.now()}.pdf`;
  const outputPath = path.join(config.paths.receiptsDir, fileName);

  // ✅ Generate PDF using Puppeteer
  const browser = await puppeteer.launch({
    headless: "new", // Puppeteer v20+ syntax
  });
  const page = await browser.newPage();

  // Load HTML into Puppeteer
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Save as PDF
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
  });

  await browser.close();

  return outputPath;
}
