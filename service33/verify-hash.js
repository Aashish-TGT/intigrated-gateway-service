const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const contractAddress = "your_deployed_contract_address"; // Replace
  const contract = await ethers.getContractAt("ReceiptHashStorage", contractAddress);

  const hash = "0xabc123..."; // Replace with actual SHA-256 or Keccak256 hash
  const result = await contract.verifyHash(hash);

  if (result) {
    console.log("✅ Hash exists on blockchain.");
  } else {
    console.log("❌ Hash not found on blockchain.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
