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

async function getBalance() {
  console.log("getting balance...");
  if (typeof window.ethereum !== undefined) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);

    console.log(
      `Balance: ${Number(ethers.utils.formatEther(balance)).toFixed(4)}`,
    );
    document.getElementById("balanceOut").innerHTML =
      `Balance: ${Number(ethers.utils.formatEther(balance)).toFixed(4)} ETH`;
  }
}
document.getElementById("balance").onclick = getBalance;

async function fund() {
  const ethAmount = document.getElementById("ethAmount").value;
  console.log(`Funding with ${ethAmount}...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(); // this returns the wallet address of any wallet or account we are connected to, which is then used to sign transactions.
    console.log(signer);
    console.log(await signer.getAddress());
    const contract = new ethers.Contract(contractAddress, abi, signer); // with this, we have a contract to interract with

    // try(){}catch{} is used for error handling, instead of the error breaking out code, it just catches and displays it.
    try {
      const txResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      }); // this is the transaction response, we are sending the value of ethAmount to the fund function in the contract

      await txListerner(txResponse, provider);
      console.log("Done!");
      alert(`Funded ${ethAmount} successfully !!`);
    } catch (error) {
      console.log("Transaction failed");
      alert("Transaction failed ");
    }
  } else {
    console.log(`No wallet dictated`);
  }
}
document.getElementById("Fund").onclick = fund;

function txListerner(txResponse, provider) {
  console.log(`Minig at ${txResponse.hash}`);
  return new Promise((resolve, reject) => {
    // provider.once() is ethers own listener used to listen for transaction events, but in our case it's listening to a transaction response
    provider.once(txResponse.hash, () => {
      console.log(`complete ${txResponse.confirmations} confirmation`);
      resolve();
    });
  });
}

async function withdrawal() {
  if (typeof window.ethereum !== "undefined") {
    console.log("withdrawal processing...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const txResponse = await contract.withdraw();
      await txListerner(txResponse, provider);
      console.log("successfully");
    } catch (error) {
      console.log(`failed to withdraw`, error);
    }
  }
}
document.getElementById("withdraw").onclick = withdrawal;
