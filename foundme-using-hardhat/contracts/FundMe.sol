// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {PriceConverter} from "./PriceConverter.sol";

contract FundMe {

    // Attach library functions to uint256 type
    // So you can call ethAmount.getConversionRate() directly
    using PriceConverter for uint256;

    // Minimum funding amount in USD (18 decimals to match wei math)
    uint256 public constant MINIMUM_USD = 5e18; // $5

    address public immutable owner;

    // Chainlink ETH/USD price feed contract
    AggregatorV3Interface private s_priceFeed;

    // Tracks how much each address has funded
    mapping(address => uint256) public addressToAmountFunded;

    // List of all funders
    address[] public funders;

    constructor(address priceFeedAddress) {
        owner = msg.sender;

        // Pass in the Chainlink price feed address for your network
        // Sepolia ETH/USD: 0x694AA1769357215DE4FAC081bf1f309aDC325306
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    // payable = this function can receive ETH
    function fund() public payable {
        // msg.value is in wei — convert it to USD using the library
        // then check it meets the minimum
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "Send at least $5 worth of ETH"
        );

        addressToAmountFunded[msg.sender] += msg.value;
        funders.push(msg.sender);
    }

    // Only the deployer can withdraw
    function withdraw() public onlyOwner {
        // Reset all funder balances
        for (uint256 i = 0; i < funders.length; i++) {
            addressToAmountFunded[funders[i]] = 0;
        }

        // Clear funders array
        funders = new address[](0);

        // Send entire contract balance to owner
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }

    // Modifier: reusable guard that checks caller is owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _; // continues executing the function body
    }

    // Fallback — handles ETH sent directly without calling fund()
    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
