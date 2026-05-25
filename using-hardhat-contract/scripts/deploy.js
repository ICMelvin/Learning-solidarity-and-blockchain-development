import { network } from "hardhat"; // import the network object from hardhat to connect to a blockchain network
import hre from "hardhat" // hardhat runtime environment - gives access to hardhat's full toolset
import fs from "fs-extra"; // file system module for reading/writing files
import dotenv from "dotenv"; // loads environment variables from .env file
import { SlowBuffer } from "buffer";
dotenv.config(); // initializes dotenv so process.env variables are available

async function Contract(){

    // connect to the network and destructure ethers (for contract interaction)
    // and networkName (the name of the network we're deploying to e.g "hardhat", "sepolia")
    const {ethers, networkName} = await network.connect();
    
    console.log(`Deploying contract to ${ networkName}... `);
    
    // deployContract finds the compiled artifact of "SimpStore" and deploys it
    // this replaces the v2 pattern of getContractFactory("SimpStore").deploy()
    const contract = await ethers.deployContract("SimpStore");
    
    // wait for the deployment transaction to be mined and confirmed on the network
    await contract.waitForDeployment();
    
    // getAddress() returns the contract's deployed address on the blockchain
    let conAddress = await contract.getAddress();
    
    console.log(`Contract deployed to ${conAddress}`);
}

Contract()
    .then(() => process.exit(0)) // exit cleanly if deployment succeeds
    .catch((error) => {
        console.error(error); // log the error if something goes wrong
        process.exit(1); // exit with failure code
    });