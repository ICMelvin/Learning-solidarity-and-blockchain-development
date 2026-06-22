import { deployScript, artifacts } from "../rocketh/deploy.js";
import { networkConfig, developmentChains } from "../helper-hardhat-config.js";

export default deployScript(
  async (env) => {
    const { deployer } = env.namedAccounts;
    const chainId = env.network.chain.id;

    let ethUsdPriceFeedAddress;
    if (developmentChains.includes(chainId)) {
      const mockV3Aggregator = env.get("MockV3Aggregator");
      ethUsdPriceFeedAddress = mockV3Aggregator.address;
    } else {
      ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed;
    }

    const fundMe = await env.deploy("FundMe", {
      account: deployer,
      artifact: artifacts.FundMe,
      args: [ethUsdPriceFeedAddress],
    });

    console.log(`FundMe deployed to ${fundMe.address}`);
  },
  { tags: ["all", "fundme"] },
);
