import { task } from "hardhat/config";
export const myNewTask = task("block-number", "Prints the current block number")
  .setInlineAction(
    // this is known as ananymous function, it is a function without a name, and it is used to define the action that will be executed when the task is run.
    async (taskArgs, hre) => {
      // hre is the hardhat runtime environment, it is an object that contains all the functionality that hardhat provides, such as access to the ethers.js library, the network configuration, and more.
      const { provider } = await hre.network.connect();
      const blockNumber = await provider.request({ method: "eth_blockNumber" });
      console.log("Current block number:", parseInt(blockNumber));
    },
  )
  .build();
