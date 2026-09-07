// SPDX-License-Identifier: MIT

// Raffle objective
  // User enter the lottery to participate in the raffle by paying 0.01 eth 
  // A Random verifyable number should be generated vai VRF for the winner to be selected
  // The winner should be selected after a certain time period has passed (automated)
  // The Winners wallets address should be autamatically funded with the total amount of eth collected from the participants.

// Some things needed
  // Chainlink VRF : for randomness
  // Chainlink Keepers : for automated contract interactions or driven event
  // Chainlink Price Feeds

pragma solidity ^0.8.28;
   error Raffle__NotEnoughEthEntered();
contract Raffle{
  // State Variables
  uint256 private immutable i_entranceFee;
  address payable[] private s_players;
  // Functions
  constructor(uint256 entranceFee){
    i_entranceFee = entranceFee;
  }
  
  // For entering the game and keeping track of players
  function enterGame() public payable{
    if(msg.value < i_entranceFee){
      revert Raffle__NotEnoughEthEntered();
    }
    s_players.push(payable(msg.sender));
  }
  
  // View functions for seeing the entrance fee and players
  function seeEntranceFee() public view returns(uint256){
    return i_entranceFee;
  }
  function seePlayers(uint256 index) public view returns(address){
    return s_players[index];
  }
  
  //funtion pickWinner( )public{}
}