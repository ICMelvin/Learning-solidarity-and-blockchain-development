//SPDX-license-identifier : MIT
pragma solidity ^0.8.28;

// we use the import function to give this contract accces to the other contract for composability, thereby importing other contracts into this one
import "./SimpStore.sol";
contract factory {
// below is how to make a contract interact or deploy other contract{ composability}, i also made it a dynamic array so that it can keep a list of all contracts we call
SimpStore[] public callSimpStoreAr;
    function callSimp() public {
      SimpStore callSimpStore = new SimpStore(); // the new keyword is used to call a the smart contract we want to interact with
      callSimpStoreAr.push(callSimpStore); // pushing to the array
    }

  function sfStore(uint256 simpIndex, uint256 simpNumber) public {
     callSimpStoreAr[simpIndex].store(simpNumber);
   
  }
  function sfRetrieve (uint256 simpIndex) public view returns(uint256){
    return callSimpStoreAr[simpIndex].Retrieval();
  }
}