// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SafeMath{
    uint8 public num  = 255; // checked..means it throws an error when it exceeds the upper limit set., this is used mostly to set limits or a reset point.
    uint256 public Num;
    function add() public{
     unchecked { num = num +1; } // unchecked keyword is used to make a contract more gas efficient 
    }
    function deleteS() public {
        num = num = 0;
 
    }
   
}