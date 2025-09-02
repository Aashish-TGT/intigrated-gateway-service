require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const { generateHash } = require("./utils/hashGenerator");

const app = express();
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractABI = [
  "function notarizeHash(string memory hash) public",
  "function verifyHash(string memory hash) public view returns (bool)"
];
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

// 🔐 POST /notarize
app.post("/notarize", async (req, res) => {
  const { receiptData } = req.body;
  const hash = generateHash(receiptData);

  try {
    const tx = await contract.notarizeHash(hash);
    await tx.wait();
    res.json({ status: "success", hash, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 GET /verify?hash=...
app.get("/verify", async (req, res) => {
  const { hash } = req.query;
  try {
    const exists = await contract.verifyHash(hash);
    res.json({ exists, hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("🧾 Receipt Notarization API running at http://localhost:3000");
});
