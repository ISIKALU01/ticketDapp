require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.4", // Use your Solidity version
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Default Hardhat Network URL
    },
  },
};


