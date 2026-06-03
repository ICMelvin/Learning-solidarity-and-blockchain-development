import { network } from "hardhat"; // import the network object from hardhat to connect to a blockchain network
import hre from "hardhat"; // hardhat runtime environment - gives access to hardhat's full toolset
import dotenv from "dotenv"; // loads environment variables from .env file
dotenv.config(); // initializes dotenv so process.env variables are available

async function Contract() {
  // connect to the network and destructure ethers (for contract interaction)
  // and networkName (the name of the network we're deploying to e.g "hardhat", "sepolia")
  const { ethers, networkName } = await hre.network.connect();

  console.log(`Deploying contract to ${networkName}... `);

  // deployContract finds the compiled artifact of "SimpStore" and deploys it
  // this replaces the v2 pattern of getContractFactory("SimpStore").deploy()
  const contract = await ethers.deployContract("SimpStore");
  const contraAdd = await ethers.deployContract("myName");

  // wait for the deployment transaction to be mined and confirmed on the network, to get transaction reciept
  await contract.waitForDeployment(1);
  await contraAdd.waitForDeployment(1);

  // getAddress() returns the contract's deployed address on the blockchain
  let conAddress = await contract.getAddress();
  let contraAddAddress = await contraAdd.getAddress();

  console.log(`Contract SimpStore deployed to ${conAddress}`);
  console.log(`Contract myName deployed to ${contraAddAddress}`);

  // Interracting with our smart contract after deployment

  const currentV = await contract.Retrieval(); // call the Retrieval function to get the current value stored in the contract
  console.log(`Current value: ${currentV}`); // log the current value to the console
  const AddN = (await contract.store(1000)).toString();
  console.log(`New value: ${await contract.Retrieval()}`); // log the new value after storing 1000 to the console

  const storeName = await contraAdd.storing("LORD MELVIN !");
  const seeName = await contraAdd.see();
  console.log(seeName);
}

Contract()
  .then(() => process.exit(0)) // exit cleanly if deployment succeeds
  .catch((error) => {
    console.error(error); // log the error if something goes wrong
    process.exit(1); // exit with failure code
  });
