import hre from "hardhat";
import {
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
} from "../helper-hardhat-config.js";

async function main() {
  const network = hre.network;
  console.log("network name:", network.name);

  if (developmentChains.includes(network.name)) {
    console.log("Local network detected! Deploying mocks...");
    const mockV3Aggregator = await hre.network
      .connect()
      .ethers.deployContract("MockV3Aggregator", [DECIMALS, INITIAL_ANSWER]);
    await mockV3Aggregator.waitForDeployment();
    console.log(
      `MockV3Aggregator deployed to: ${await mockV3Aggregator.getAddress()}`,
    );
    console.log("------------------------------------------------");
  } else {
    console.log("Not a local network, skipping mocks.");
  }
}

main().catch(console.error);
