import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 5], // Including Goerli testnet (chain ID 5)
});

function Navbar() {
  const { active, account, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/register" className="hover:text-gray-300">Register Property</Link>
          <Link to="/my-properties" className="hover:text-gray-300">My Properties</Link>
        </div>
        <div>
          {active ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              <button
                onClick={disconnect}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connect}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 