const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

async function generatePDF(data, outputFilePath) {
  const templatePath = path.join(__dirname, 'templates', 'receipt.html');
  const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

  // Step 1: Generate QR Code as Data URL
  const qrData = await QRCode.toDataURL(JSON.stringify(data));

  // Step 2: Inject transaction data and QR into template
  const filledHtml = htmlTemplate
    .replace('{{name}}', data.name)
    .replace('{{amount}}', data.amount)
    .replace('{{qrCode}}', `<img src="${qrData}" alt="QR Code"/>`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(filledHtml);
  await page.pdf({ path: outputFilePath, format: 'A4' });
  await browser.close();

  console.log('PDF with QR generated:', outputFilePath);
}

module.exports = generatePDF;