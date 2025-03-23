const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const Greeter = await hre.ethers.getContractFactory("Greeter");

  // Deploy the contract with a constructor argument
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  // Wait for the contract to be deployed
  await greeter.waitForDeployment();

  // Log the contract address
  console.log("Greeter deployed to:", await greeter.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });