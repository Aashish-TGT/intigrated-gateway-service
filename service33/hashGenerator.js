const crypto = require("crypto");

function generateHash(data, algo = "sha256") {
  return crypto.createHash(algo).update(data).digest("hex");
}

module.exports = { generateHash };
