pragma solidity ^0.8.28;

contract myName{
    string me;
   function storing(string memory Me) public {
    me = Me;

   }
   function see() public view returns (string memory){
    return me;
   }

}