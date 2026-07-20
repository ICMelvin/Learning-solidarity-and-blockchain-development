import { defineConfig } from "hardhat/config";
import hardhatDeploy from "hardhat-deploy";
import hardhatNodeTestRunner from "@nomicfoundation/hardhat-node-test-runner";
import hardhatNetworkHelpers from "@nomicfoundation/hardhat-network-helpers";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import hardhatEthersChaiMatchers from "@nomicfoundation/hardhat-ethers-chai-matchers";
import hardhatVerify from "@nomicfoundation/hardhat-verify";

import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [
    hardhatDeploy,
    hardhatNodeTestRunner,
    hardhatNetworkHelpers,
    hardhatEthers,
    hardhatEthersChaiMatchers,
    hardhatVerify,
  ],
  solidity: {
    compilers: [{ version: "0.8.28" }],
  },
  networks: {
    hardhat: {
      type: "edr-simulated",
      chainId: 31337,
    },
    sepolia: {
      type: "http",
      url: process.env.SEPOLIA_URL || "",
      accounts: [process.env.PRIVATE_KEY || ""],
      chainId: 11155111,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
      11155111: 0,
    },
  },
  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY || "",
    },
  },
});
