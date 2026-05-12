// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Fund {
  uint256  minimumFund = 50;
    function Pay() public payable{
        require(msg.value >= minimumFund, "insufficient balance");
    }

    function getPrice() public {

    }

    function convertRate() public{

    }
}