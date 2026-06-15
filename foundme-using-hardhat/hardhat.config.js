import { defineConfig } from "hardhat/config";
import hardhatDeploy from "hardhat-deploy";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [hardhatDeploy],
  solidity: {
    compilers: [{ version: "0.8.28" }],
  },
  networks: {
    hardhat: {
      type: "edr-simulated",
      chainId: 31337,
    },
    localhost: {
      type: "http",
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    sepolia: {
      type: "http",
      url: process.env.SEPOLIA_URL || "",
      accounts: [],
      chainId: 11155111,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    },
  },
});
