// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {

    // called when ETH is sent with empty calldata
    receive() external payable {
        // logic here
    }

    // called when ETH is sent with unknown function call or no receive exists
    fallback() external payable {
        // logic here
    }
}