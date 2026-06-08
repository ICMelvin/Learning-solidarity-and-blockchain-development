import * as chai from "chai";
const { assert, expect } = chai;
import { network } from "hardhat";
import hre from "hardhat";
import dotenv from "dotenv";
dotenv.config();
// describe function takes two arguments: a string describing the test suite and a callback function that contains the tests. the function passed is an ananymous function
describe("SimpStore", () => {
  let contract; // declare a variable to hold the contract instance

  beforeEach(async () => {
    const { ethers, networkName } = await hre.network.connect(); // connect to the network and get the ethers object for contract interaction
    contract = await ethers.deployContract("SimpStore"); // deploy the SimpStore contract before each test
    await contract.waitForDeployment(1); // wait for the deployment transaction to be mined and confirmed on the network
  });

  it("should store and retrieve a value correctly", async () => {
    const currentV = await contract.Retrieval(); // call the Retrieval function to get the current value stored in the contract
    console.log(`Current value: ${currentV}`); // log the current value to the console
    const expV = "0";
    assert.equal(expV.toString(), "0", "Initial value should be 0"); // assert that the initial value is 0
  });
  it("should update the stored value correctly", async () => {
    await contract.store(1000); // call the store function to update the value to 1000
    const newV = await contract.Retrieval(); // call the Retrieval function again to get the updated value
    console.log(`New value: ${newV}`); // log the new value to the console
    const expV = "1000";
    assert.equal(
      expV.toString(),
      newV.toString(),
      "Updated value should be 1000",
    ); // assert that the updated value is 1000
  });
  it("it should should add a students data to the array ", async () => {
    await contract.addStudent("Melvin", 23);
    console.log("New student added");
    const getStud = await contract.getStudent(0);
    console.log(`Student name: ${getStud[0]}, Student age: ${getStud[1]}`);
    assert.equal(getStud[0], "Melvin", "Student name should be Melvin");
    assert.equal(getStud[1].toString(), "23", "Student age should be 23");
  });
});
