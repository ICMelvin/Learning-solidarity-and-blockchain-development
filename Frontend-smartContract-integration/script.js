import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";
//in order to make this connect pop up come when we require it, we wrap this logic in an async func, that way it does not pop up all the time
async function Connect() {
  if (typeof window.ethereum !== "undefined") {
    console.log("Wallet detected! Connecting...");
    await window.ethereum.request({ method: "eth_requestAccounts" }); // connect to the wallet and request access to the user's accounts

    await alert("Wallet connected successfully!");
    document.getElementById("Connect").innerHTML = "Wallet Connected";
  } else {
    console.log(
      "No wallet detected. Please install MetaMask or another wallet.",
    );
  }
}
document.getElementById("Connect").onclick = Connect;

async function fund() {
  const ethAmount = "0.3";
  console.log(`Funding with ${ethAmount}...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(contractAddress, abi, signer); // with this, we have a contract to interract with
    const txResponse = await contract.fund({
      value: ethers.utils.parseEther(ethAmount),
    }); // this is the transaction response, we are sending the value of ethAmount to the fund function in the contract
    await listenForTransactionMine(txResponse, provider);
    console.log("Done!");
    alert(`Funded ${ethAmount} successfully !!`);
  }
}
document.getElementById("Fund").onclick = fund;
