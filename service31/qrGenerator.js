const QRCode = require('qrcode');

/**
 * Generate a QR code as a data URL from input string.
 * @param {string} data - The content to encode in the QR code.
 * @returns {Promise<string>} - Data URL of the generated QR code.
 */
async function generateQR(data) {
  try {
    const qrImageData = await QRCode.toDataURL(data);
    return qrImageData;
  } catch (error) {
    console.error("QR Generation failed:", error);
    return null;
  }
}

module.exports = { generateQR };