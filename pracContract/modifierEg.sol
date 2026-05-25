// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyContract {
    address public owner;
    uint256 public value;

    constructor() {
        owner = msg.sender;
    }

    // The modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _; // continues executing the rest of the function
    }

    // Using the modifier
    function setValue(uint256 _value) public onlyOwner {
        value = _value;
    }
}