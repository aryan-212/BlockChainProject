const hre = require("hardhat");

async function main() {
  console.log("Deploying PropertyRegistry contract to Goerli testnet...");

  const PropertyRegistry = await hre.ethers.getContractFactory("PropertyRegistry");
  const propertyRegistry = await PropertyRegistry.deploy();

  await propertyRegistry.deployed();

  console.log("PropertyRegistry deployed to:", propertyRegistry.address);
  console.log("Transaction hash:", propertyRegistry.deployTransaction.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 