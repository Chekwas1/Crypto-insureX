import React, { useEffect, useState } from 'react';
import { auth, provider } from './firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null); // Wallet address state

  // Firebase authentication listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set user after authentication
    });
    return () => unsubscribe();
  }, []);

  // Sign in with Google
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Set user data from Google sign-in
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  // Sign out function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user data on sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Wallet connection logic (can be moved to Dashboard)
  const connectWallet = async () => {
    try {
      // Sample logic for wallet connection
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]); // Set the wallet address after successful connection
      } else {
        alert('Please install a wallet like MetaMask to continue.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>InsureX</h1>
        {user ? (
          <div>
            <button onClick={handleSignOut}>Sign Out</button>
            {/* Wallet connection button */}
            <button onClick={connectWallet}>
              {walletAddress ? `Connected: ${walletAddress}` : 'Connect Wallet'}
            </button>
            {/* Pass user and walletAddress to the Dashboard component */}
            <Dashboard user={user} walletAddress={walletAddress} />
          </div>
        ) : (
          <button onClick={handleSignIn}>Sign in with Google</button>
        )}
      </header>
    </div>
  );
};

export default App;
