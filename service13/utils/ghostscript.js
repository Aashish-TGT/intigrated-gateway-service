// utils/ghostscript.js

const { exec } = require('child_process');

/**
 * Compress a PDF using Ghostscript
 * @param {string} inputPath - Path to uploaded file
 * @param {string} outputPath - Path to save compressed file
 */
function compressPDF(inputPath, outputPath) {
  // Full path to Ghostscript (DO NOT use just 'gs')
  const gsCommand = '"C:\\Program Files\\gs\\gs10.05.1\\bin\\gs.exe"';

  // Command to run
  const command = `${gsCommand} -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook ` +
                  `-dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;

  // DEBUG
  console.log("🧪 Running GS Command:\n", command);

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      // DEBUG
      console.log("🖨️ STDOUT:", stdout);
      console.log("⚠️ STDERR:", stderr);

      if (error) {
        console.error("❌ Compression error:", error);
        reject(stderr || error.message);
      } else {
        resolve("✅ PDF compressed successfully");
      }
    });
  });
}

module.exports = { compressPDF };