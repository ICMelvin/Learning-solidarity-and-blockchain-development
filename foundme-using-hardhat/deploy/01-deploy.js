import { networkConfig } from "../helper-hardhat-config.js";

export default async function (hre) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const ethPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed;
  const args = [ethPriceFeedAddress];

  const fundMe = await deploy("FundMe", {
    from: deployer,
    log: true,
    args,
  });

  log(`FundMe deployed to ${fundMe.address}`);
}
export const tags = ["all", "fundme"];
