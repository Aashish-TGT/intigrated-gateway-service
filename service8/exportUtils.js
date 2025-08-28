const { Parser } = require('json2csv');
const fs = require('fs');
const PDFDocument = require('pdfkit');

function exportToCSV(data, filePath) {
  const parser = new Parser();
  const csv = parser.parse(data);
  fs.writeFileSync(filePath, csv);
}

function exportToPDF(data, filePath) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));
  data.forEach(event => {
    doc.text(JSON.stringify(event), { paragraphGap: 10 });
  });
  doc.end();
}

module.exports = { exportToCSV, exportToPDF };
