import { deployScript, artifacts } from "../rocketh/deploy.js";
import {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} from "../helper-hardhat-config.js";

export default deployScript(
  async (env) => {
    const { deployer } = env.namedAccounts;
    const chainId = env.network.chain.id;

    if (developmentChains.includes(chainId)) {
      console.log("Local network detected! Deploying mocks...");
      await env.deploy("MockV3Aggregator", {
        account: deployer,
        artifact: artifacts.MockV3Aggregator,
        args: [DECIMALS, INITIAL_ANSWER],
      });
      console.log("Mocks deployed!");
      console.log("------------------------------------------------");
    }
  },
  { tags: ["all", "mocks"] },
);
