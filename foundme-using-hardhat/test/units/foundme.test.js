import { network } from "hardhat";
import { loadAndExecuteDeploymentsFromFiles } from "../../rocketh/environment.js";
import { describe, it } from "node:test";
import { expect } from "chai";

// 1. Connect to the network and get the provider and networkHelpers objects for interacting with the blockchain and managing deployments.
// This is a v3 replacement for the v1 getNamedAccounts() and getUnnamedAccounts() functions, which are now accessed through the env object returned by loadAndExecuteDeploymentsFromFiles().
const { provider, networkHelpers } = await network.connect();

// 2. This function deploys EVERYTHING in your deploy/ folder, then hands you
//    an `env` object you can pull deployed contracts and named accounts from.
//    It's the v3 replacement for `deployments.fixture()`.
async function deployAll() {
  const env = await loadAndExecuteDeploymentsFromFiles({ provider });
  return { env, deployer: env.namedAccounts.deployer }; // deployer = your v1 getNamedAccounts().deployer
}

describe("All contracts", function () {
  it("deploys and checks each contract", async function () {
    // loadFixture snapshots state after first run, so re-running tests is fast
    // (same speedup `deployments.fixture()` gave you for free in v1)
    const { env, deployer } = await networkHelpers.loadFixture(deployAll);

    // Edit this list to match the contracts in your contracts/ folder
    const contractNames = ["FundMe", "MockV3Aggregator"];

    // Loop once, test each contract the same way — that's your "minimal code, one test" goal
    for (const name of contractNames) {
      const contract = env.get(name); // v3 replacement for deployments.get(name)
      console.log(`${name} → ${contract.address}`);
      expect(contract.address).to.not.equal(undefined); // sanity check it actually deployed
    }

    console.log("deployer:", deployer);
  });
});
