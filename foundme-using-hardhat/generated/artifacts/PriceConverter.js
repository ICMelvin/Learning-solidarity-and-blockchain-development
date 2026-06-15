export const Artifact_PriceConverter = /** @type {const} **/ ({
  "contractName": "PriceConverter",
  "sourceName": "contracts/PriceConverter.sol",
  "abi": [],
  "bytecode": "0x6055604b600b8282823980515f1a607314603f577f4e487b71000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b305f52607381538281f3fe730000000000000000000000000000000000000000301460806040525f5ffdfea26469706673582212205e60a04b10151e9d53c6bf5800f9e2e0b95172b86c32503fb72d30f06ae173f664736f6c634300081c0033",
  "deployedBytecode": "0x730000000000000000000000000000000000000000301460806040525f5ffdfea26469706673582212205e60a04b10151e9d53c6bf5800f9e2e0b95172b86c32503fb72d30f06ae173f664736f6c634300081c0033",
  "linkReferences": {},
  "deployedLinkReferences": {},
  "immutableReferences": {},
  "inputSourceName": "project/contracts/PriceConverter.sol",
  "devdoc": {
    "kind": "dev",
    "methods": {},
    "version": 1
  },
  "evm": {
    "bytecode": {
      "linkReferences": {},
      "object": "6055604b600b8282823980515f1a607314603f577f4e487b71000000000000000000000000000000000000000000000000000000005f525f60045260245ffd5b305f52607381538281f3fe730000000000000000000000000000000000000000301460806040525f5ffdfea26469706673582212205e60a04b10151e9d53c6bf5800f9e2e0b95172b86c32503fb72d30f06ae173f664736f6c634300081c0033",
      "opcodes": "PUSH1 0x55 PUSH1 0x4B PUSH1 0xB DUP3 DUP3 DUP3 CODECOPY DUP1 MLOAD PUSH0 BYTE PUSH1 0x73 EQ PUSH1 0x3F JUMPI PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH0 MSTORE PUSH0 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH0 REVERT JUMPDEST ADDRESS PUSH0 MSTORE PUSH1 0x73 DUP2 MSTORE8 DUP3 DUP2 RETURN INVALID PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH0 PUSH0 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 MCOPY PUSH1 0xA0 0x4B LT ISZERO 0x1E SWAP14 MSTORE8 0xC6 0xBF PC STOP 0xF9 0xE2 0xE0 0xB9 MLOAD PUSH19 0xB86C32503FB72D30F06AE173F664736F6C6343 STOP ADDMOD SHR STOP CALLER ",
      "sourceMap": "257:965:2:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;"
    },
    "deployedBytecode": {
      "immutableReferences": {},
      "linkReferences": {},
      "object": "730000000000000000000000000000000000000000301460806040525f5ffdfea26469706673582212205e60a04b10151e9d53c6bf5800f9e2e0b95172b86c32503fb72d30f06ae173f664736f6c634300081c0033",
      "opcodes": "PUSH20 0x0 ADDRESS EQ PUSH1 0x80 PUSH1 0x40 MSTORE PUSH0 PUSH0 REVERT INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 MCOPY PUSH1 0xA0 0x4B LT ISZERO 0x1E SWAP14 MSTORE8 0xC6 0xBF PC STOP 0xF9 0xE2 0xE0 0xB9 MLOAD PUSH19 0xB86C32503FB72D30F06AE173F664736F6C6343 STOP ADDMOD SHR STOP CALLER ",
      "sourceMap": "257:965:2:-:0;;;;;;;;"
    },
    "gasEstimates": {
      "creation": {
        "codeDepositCost": "17000",
        "executionCost": "92",
        "totalCost": "17092"
      },
      "internal": {
        "getConversionRate(uint256,contract AggregatorV3Interface)": "infinite",
        "getPrice(contract AggregatorV3Interface)": "infinite"
      }
    },
    "methodIdentifiers": {}
  },
  "metadata": "{\"compiler\":{\"version\":\"0.8.28+commit.7893614a\"},\"language\":\"Solidity\",\"output\":{\"abi\":[],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"project/contracts/PriceConverter.sol\":\"PriceConverter\"},\"evmVersion\":\"cancun\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\",\"useLiteralContent\":true},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[\"project/:@chainlink/contracts/=npm/@chainlink/contracts@1.5.0/\"]},\"sources\":{\"npm/@chainlink/contracts@1.5.0/src/v0.8/shared/interfaces/AggregatorV3Interface.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity ^0.8.0;\\n\\n// solhint-disable-next-line interface-starts-with-i\\ninterface AggregatorV3Interface {\\n  function decimals() external view returns (uint8);\\n\\n  function description() external view returns (string memory);\\n\\n  function version() external view returns (uint256);\\n\\n  function getRoundData(\\n    uint80 _roundId\\n  ) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);\\n\\n  function latestRoundData()\\n    external\\n    view\\n    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);\\n}\\n\",\"keccak256\":\"0x257a8d28fa83d3d942547c8e129ef465e4b5f3f31171e7be4739a4c98da6b4f0\",\"license\":\"MIT\"},\"project/contracts/PriceConverter.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity ^0.8.18;\\n\\n// Chainlink interface \\u2014 tells Solidity what functions the price feed contract has\\nimport {AggregatorV3Interface} from \\\"@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol\\\";\\n\\nlibrary PriceConverter {\\n    \\n    // Fetches the current ETH/USD price from Chainlink\\n    // Returns price with 8 decimal places (e.g., 3000_00000000 = $3000)\\n    function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {\\n        // latestRoundData() returns multiple values; we only need `answer` (the price)\\n        (, int256 answer, , , ) = priceFeed.latestRoundData();\\n\\n        // Convert to 18 decimals to match ETH (wei), answer has 8 decimals\\n        return uint256(answer * 1e10);\\n    }\\n\\n    // Converts an ETH amount (in wei) to its USD value\\n    function getConversionRate(uint256 ethAmount, AggregatorV3Interface priceFeed) internal view returns (uint256) {\\n        uint256 ethPrice = getPrice(priceFeed);\\n\\n        // Both ethPrice and ethAmount have 18 decimals\\n        // Dividing by 1e18 brings it back to a normal number\\n        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;\\n\\n        return ethAmountInUsd;\\n    }\\n}\\n\",\"keccak256\":\"0x1024a17245c5743f3d24ddfa15a72403d11686643267001e81a1836a4180cff4\",\"license\":\"MIT\"}},\"version\":1}",
  "storageLayout": {
    "storage": [],
    "types": null
  },
  "userdoc": {
    "kind": "user",
    "methods": {},
    "version": 1
  }
});