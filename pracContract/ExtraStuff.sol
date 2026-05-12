// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28 ;
// in this contract we are to understand stuff about inheritence 
import './SimpStore.sol';
contract ExtraStuff is SimpStore{ 
    // to make a contract inherit the functions of another contract we use the (is) keyword
    function store(uint256 stores) public override{
        MyNum = stores + 5;
    }

}