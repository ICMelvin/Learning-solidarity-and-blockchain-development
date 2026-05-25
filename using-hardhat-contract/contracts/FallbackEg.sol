// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0 ;

contract fallbackEg{
    uint256 public result;
    receive() external payable{ // recieve is a function that is payable, but doesn't send transaction with data
        result = 1;
    }
    fallback() external payable{ // if recieve fails, the transaction is refered to fallback, fallback can send transaction with data.
        result = 2;
    }
}