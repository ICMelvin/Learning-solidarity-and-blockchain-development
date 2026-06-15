// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// Chainlink interface — tells Solidity what functions the price feed contract has
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    
    // Fetches the current ETH/USD price from Chainlink
    // Returns price with 8 decimal places (e.g., 3000_00000000 = $3000)
    function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {
        // latestRoundData() returns multiple values; we only need `answer` (the price)
        (, int256 answer, , , ) = priceFeed.latestRoundData();

        // Convert to 18 decimals to match ETH (wei), answer has 8 decimals
        return uint256(answer * 1e10);
    }

    // Converts an ETH amount (in wei) to its USD value
    function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);

        // Both ethPrice and ethAmount have 18 decimals
        // Dividing by 1e18 brings it back to a normal number
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;

        return ethAmountInUsd;
    }
}
