import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import '../styles/WalletConnection.css';

function WalletConnection({ setWalletAddress }) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts.length > 0) {
          setConnected(true);
          setAddress(accounts[0]);
          setWalletAddress(accounts[0]);
        }
      });
    }
  }, [setWalletAddress]);

  const connectWallet = async () => {
    if (window.ethereum) {
      setLoading(true);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        setConnected(true);
        setAddress(userAddress);
        setWalletAddress(userAddress);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('An error occurred while connecting your wallet. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet provider.');
    }
  };

  return (
    <div className="wallet-connection">
      {connected ? (
        <div className="wallet-info">
          <p className="connected-text">Connected Wallet: {address}</p>
        </div>
      ) : (
        <button
          className={`connect-wallet-btn ${loading ? 'loading' : ''}`}
          onClick={connectWallet}
          disabled={loading}
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
}

export default WalletConnection;
