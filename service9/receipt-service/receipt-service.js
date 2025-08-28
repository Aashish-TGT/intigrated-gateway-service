const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post(
  '/v1/receipt',
  [
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('items').isArray({ min: 1 }).withMessage('Items should be an array'),
    body('totalAmount').isFloat({ gt: 0 }).withMessage('Total amount must be a positive number')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customerName, items, totalAmount } = req.body;
    const receiptId = uuidv4();
    const pdfPath = `receipt-${receiptId}.pdf`;

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    doc.fontSize(16).text(`Receipt ID: ${receiptId}`);
    doc.text(`Customer: ${customerName}`);
    doc.text(`Total Amount: ₹${totalAmount}`);
    doc.text('Items:');
    items.forEach((item, i) => doc.text(`${i + 1}. ${item}`));

    const qrCode = await QRCode.toDataURL(receiptId);
    doc.image(Buffer.from(qrCode.split(',')[1], 'base64'), {
      fit: [150, 150],
      align: 'center'
    });

    doc.end();

    stream.on('finish', () => {
      res.download(pdfPath, () => fs.unlinkSync(pdfPath));
    });
  }
);

app.listen(PORT, () => console.log(`✅ Receipt service running at http://localhost:${PORT}`));
