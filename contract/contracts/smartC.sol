// SPDX-License-Identifier: SEE LICENSE IN LICENSE
    // first this is to declare the version of solidity to be used and (^) is to allow newer versions 
pragma solidity ^0.8.28;

    // to start a smart contract we use the contraction keyword

contract SimpStore {
    uint256 public MyNum;
    function storing(uint256 stores)  public {
       MyNum = stores;
    }
}
