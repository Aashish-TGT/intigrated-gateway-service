const { generateHash } = require('../utils/hashUtil');
const { getReceiptHash } = require('../models/receiptStore');

const verifyReceipt = (req, res) => {
  const receiptId = req.params.receiptId;
  const providedData = req.body.data;

  // 🖨️ Add logs to terminal:
  console.log("\n🔔 Request received:");
  console.log("🧾 Receipt ID:", receiptId);
  console.log("📥 Data from Postman:", providedData);

  const storedHash = getReceiptHash(receiptId);
  console.log("📦 Stored hash:", storedHash);

  if (!storedHash) {
    console.log("❗ Receipt not found");
    return res.status(404).json({ message: 'Receipt not found' });
  }

  const incomingHash = generateHash(providedData);
  console.log("🔐 Incoming hash:", incomingHash);

  if (incomingHash === storedHash) {
    console.log("✅ Receipt is authentic");
    return res.status(200).json({ verified: true, message: 'Receipt is authentic' });
  } else {
    console.log("⚠️ Receipt has been tampered");
    return res.status(400).json({ verified: false, message: 'Receipt has been tampered' });
  }
};

module.exports = { verifyReceipt };
