import { ethers } from "ethers";
import toast from "react-hot-toast";
import abi from "../contractsAbi/abi.json";

export const getWeb3State = async () => {
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      toast.error("MetaMask is not installed. Please install it to use this feature.");
      throw new Error("MetaMask is not installed");
    }

    // Request account access from MetaMask
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const selectedAccount = accounts[0];

    // Get the current chain ID
    const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
    const chainId = parseInt(chainIdHex, 16);

    // Create a provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Set up the contract instance with ABI and signer
    const contractAddress = "0x8b47489ECE1bD0AADDE3a15Bf692A7D7636b97A5";
    const contractInstance = new ethers.Contract(contractAddress, abi, signer);

    console.log(contractInstance, selectedAccount, chainId )
    return { contractInstance, selectedAccount, chainId };
  } catch (error) {
    // Error handling and notification
    toast.error(`Error fetching Web3 state: ${error.message}`);
    console.error("Error fetching Web3 state:", error);
    throw new Error(error.message);
  }
};
