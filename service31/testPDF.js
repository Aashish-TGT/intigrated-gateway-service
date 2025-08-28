const generatePDF = require('./pdfGenerator');
const path = require('path');

const testData = {
  name: 'Siya Grover',
  amount: '₹1500'
};

const outputFilePath = path.join(__dirname, 'output', 'test_receipt.pdf');

generatePDF(testData, outputFilePath)
  .then(() => console.log('Test PDF created successfully!'))
  .catch(err => console.error('Error generating test PDF:', err));