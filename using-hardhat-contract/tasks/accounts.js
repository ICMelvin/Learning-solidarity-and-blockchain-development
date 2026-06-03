import { task } from "hardhat/config";
export const accountTask = task("accounts", "prints a list of accounts")
  .setInlineAction(async function (taskArgs, hre) {
    const { provider } = await hre.network.create();
    console.log(await provider.request({ method: "eth_accounts" }));
  })
  .build();
