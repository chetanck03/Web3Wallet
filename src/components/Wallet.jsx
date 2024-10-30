import { useState, useEffect } from "react";
import { useWeb3 } from "../providers/Web3Provider";
import { ethers } from "ethers";

const WalletComponent = () => {
  const { selectedAccount, chainId, handleWallet, disconnectWallet } = useWeb3();
  const [balance, setBalance] = useState(null);
  const [chainName, setChainName] = useState("");

  useEffect(() => {
    const fetchBalanceAndChainName = async () => {
      if (selectedAccount) {
        const provider = new ethers.BrowserProvider(window.ethereum);

        const balanceWei = await provider.getBalance(selectedAccount);
        const balanceEth = ethers.formatEther(balanceWei);
        setBalance(parseFloat(balanceEth).toFixed(4)); // Display 4 decimal places

        switch (chainId) {
          case 1:
            setChainName("Ethereum Mainnet");
            break;
          case 5:
            setChainName("Goerli Testnet");
            break;
          case 137:
            setChainName("Polygon Mainnet");
            break;
          case 80001:
            setChainName("Mumbai Testnet");
            break;
          case 17000:
            setChainName("ETH Holysky Testnet");
            break;
          default:
            setChainName("Unknown Network");
        }
      }
    };

    fetchBalanceAndChainName();
  }, [selectedAccount, chainId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-lg p-8 bg-gray-900 rounded-lg shadow-2xl text-white">
        {selectedAccount ? (
          <>
            <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">Wallet Connected</h2>
            <div className="flex flex-col items-start space-y-4">
              <p className="text-lg break-all">
                <span className="font-semibold text-blue-400">Account: </span>
                <span className="text-base text-white">{selectedAccount}</span>
              </p>
              <p className="text-lg">
                <span className="font-semibold text-blue-400">Balance:</span>{" "}
                <span title={`${balance} ETH`} className="cursor-pointer">
                  {balance ? `${balance} ETH` : "Loading..."}
                </span>
              </p>
              <p className="text-lg">
                <span className="font-semibold text-blue-400">Network:</span> {chainName}
              </p>
            </div>
            <button
              onClick={disconnectWallet}
              className="mt-8 w-full py-3 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition duration-200"
            >
              Disconnect Wallet
            </button>
          </>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-300 mb-6">Please connect your wallet!</p>
            <button
              onClick={handleWallet}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition duration-200"
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletComponent;
