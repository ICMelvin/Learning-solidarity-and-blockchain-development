// test/staging/fundme-staging-test.js
//
// Staging tests run against a REAL deployed contract on a live testnet
// (e.g. Sepolia) — no mocks, no local price feed, real gas, real latency.
// Run with: yarn hardhat test test/staging/fundme-staging-test.js --network sepolia
//
// Uses Node's built-in node:test runner (Hardhat v3 default) — NOT Mocha,
// so describe/it/before come from "node:test", not chai/mocha globals.

import { describe, it, before } from "node:test";
import { expect } from "chai";
import hre, { network } from "hardhat";
import fs from "node:fs";
import path from "node:path";

const isStagingNetwork = network.name !== "hardhat";

describe(
  "FundMe Staging Tests",
  { skip: !isStagingNetwork && "skipping staging tests on local network" },
  function () {
    let ethers;
    let fundMe;
    let deployer;

    before(async function () {
      const connection = await network.create(network.name);
      ethers = connection.ethers;

      console.log("connection keys:", Object.keys(connection));
      console.log("networkName candidate:", connection.networkName);

      const accounts = await ethers.getSigners();
      deployer = accounts[0];

      // Read the deployment artifact straight off disk instead of going
      // through hardhat-deploy/rocketh's JS API, since the v1->v2 API
      // surface keeps moving. This file convention has stayed stable:
      // deployments/<network>/<ContractName>.json
      const deploymentPath = path.join(
        hre.config.paths.root,
        "deployments",
        connection.networkName,
        "FundMe.json",
      );

      if (!fs.existsSync(deploymentPath)) {
        throw new Error(
          `No deployment found at ${deploymentPath}. ` +
            `If your project stores deployments somewhere else (e.g. inside ` +
            `generated/), update deploymentPath above to match.`,
        );
      }

      const deploymentArtifact = JSON.parse(
        fs.readFileSync(deploymentPath, "utf8"),
      );

      fundMe = await ethers.getContractAt(
        "FundMe",
        deploymentArtifact.address,
        deployer,
      );
    });

    it(
      "allows people to fund and the owner to withdraw",
      { timeout: 300000 }, // 5 min — testnet txs are slow
      async function () {
        const fundAmount = ethers.parseEther("0.02"); // real ETH, keep it small

        console.log("Funding contract...");
        const fundTxResponse = await fundMe.fund({ value: fundAmount });
        await fundTxResponse.wait(1);
        console.log("Funded.");

        console.log("Withdrawing...");
        const withdrawTxResponse = await fundMe.withdraw();
        await withdrawTxResponse.wait(1);
        console.log("Withdrawn.");

        const endingFundMeBalance = await ethers.provider.getBalance(
          fundMe.target,
        );

        expect(endingFundMeBalance).to.equal(0n);
      },
    );

    it(
      "reverts when funding below the minimum USD threshold",
      { timeout: 300000 },
      async function () {
        const tinyAmount = 1n; // 1 wei, guaranteed below MINIMUM_USD

        await expect(
          fundMe.fund({ value: tinyAmount, gasLimit: 300000 }),
        ).to.be.revertedWith("Send at least $5 worth of ETH");
      },
    );

    it(
      "returns a sane price feed address",
      { timeout: 300000 },
      async function () {
        const priceFeedAddress = await fundMe.getPriceFeed();
        expect(priceFeedAddress).to.not.equal(ethers.ZeroAddress);
      },
    );
  },
);
