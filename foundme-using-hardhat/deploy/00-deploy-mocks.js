import {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} from "../helper-hardhat-config.js";

export default async function (hre) {
  const { deployments, getNamedAccounts, network } = hre; // destructure network from hre
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(network.name); // debug

  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploying mocks...");
    await deploy("MockV3Aggregator", {
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_ANSWER],
    });
    log("Mocks deployed!");
    log("------------------------------------------------");
  }
}

export const tags = ["all", "mocks"];
