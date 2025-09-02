const hre = require("hardhat");

async function main() {
  const ReceiptNotary = await hre.ethers.getContractFactory("ReceiptNotary");
  const contract = await ReceiptNotary.deploy();
  await contract.deployed();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
