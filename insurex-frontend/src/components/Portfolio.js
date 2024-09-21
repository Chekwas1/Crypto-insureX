import React, { useEffect, useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import './Portfolio.css';

const Portfolio = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to connect Phantom wallet
  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        setLoading(true); // Set loading state during connection
        const response = await solana.connect();
        const publicKey = new PublicKey(response.publicKey.toString());
        setWalletAddress(publicKey.toString());
        await getBalance(publicKey);
        fetchAssets();
      } else {
        alert('Solana wallet not found! Please install Phantom.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to disconnect Phantom wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(null);
    setAssets([]);
  };

  // Function to get the balance of the connected wallet
  const getBalance = async (publicKey) => {
    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / 1e9); // Convert lamports to SOL
    } catch (error) {
      console.error('Error getting balance:', error);
      setError('Failed to fetch balance. Please try again.');
    }
  };

  // Fetch assets after wallet connection
  const fetchAssets = async () => {
    try {
      // Dummy assets for now, replace with actual API or blockchain call
      const dummyAssets = [
        { name: 'SOL', amount: 1.25 },
        { name: 'BTC', amount: 0.02 },
        { name: 'ETH', amount: 0.5 },
      ];
      setAssets(dummyAssets);
    } catch (error) {
      console.error('Error fetching assets:', error);
      setError('Failed to fetch assets. Please try again.');
    }
  };

  // Automatically check for Phantom Wallet connection on page load
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { solana } = window;
        if (solana && solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          const publicKey = new PublicKey(response.publicKey.toString());
          setWalletAddress(publicKey.toString());
          await getBalance(publicKey);
          fetchAssets();
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
        setError('Failed to check wallet connection.');
      }
    };
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="portfolio-container">
      <h3>Your Portfolio</h3>

      {error && <p className="error-message">{error}</p>}

      <div className="wallet-section">
        {walletAddress ? (
          <>
            <p>Connected Wallet: {walletAddress}</p>
            <p>
              Balance:{' '}
              {balance !== null ? `${balance} SOL` : 'Fetching balance...'}
            </p>
            <button onClick={disconnectWallet} className="disconnect-button">
              Disconnect Wallet
            </button>
          </>
        ) : (
          <button onClick={connectWallet} disabled={loading}>
            {loading ? 'Connecting...' : 'Connect Phantom Wallet'}
          </button>
        )}
      </div>

      <div className="assets-grid">
        {walletAddress && assets.length > 0 ? (
          assets.map((asset, index) => (
            <div className="asset-card" key={index}>
              <p className="asset-name">{asset.name}</p>
              <p className="asset-amount">{asset.amount}</p>
            </div>
          ))
        ) : (
          <p>
            {walletAddress
              ? 'Fetching assets...'
              : 'Please connect your wallet to view assets.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
