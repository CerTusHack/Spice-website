import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import "../styles/Navbar.css";

const Navbar = () => {
  const { connected, publicKey, disconnect, select, connect, wallets } =
    useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const walletOptions = wallets.map((wallet) => ({
    name: wallet.adapter.name,
    icon: wallet.adapter.icon,
  }));

  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);
  const openWalletModal = () => setIsWalletModalOpen(true);
  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
    setConnectionError(null);
  };

  const connectWallet = async (walletName) => {
    try {
      setConnectionError(null); // Clear previous errors
      select(walletName); // Select the wallet
      await connect(); // Attempt to connect the wallet
      closeWalletModal(); // Close modal upon success
    } catch (error) {
      console.error(`Failed to connect to ${walletName}:`, error);
      setConnectionError(
        `Failed to connect to ${walletName}. Please ensure your wallet is set up correctly.`
      );
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="navbar-logo">
          <span>$SPICE</span>
        </a>

        {/* Navigation Links */}
        <nav className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <a href="/">Home</a>
          <a href="/submit-threat">Submit Threat</a>
          <a href="/validate-threat">Validate Threat</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="/About">About</a>
          <a href="/Contact">Contact</a>
        </nav>

        {/* Wallet Button */}
        <div className="navbar-wallet">
          {connected && publicKey ? (
            <div className="wallet-connected">
              <span className="wallet-address">
                {publicKey.toBase58().slice(0, 6)}...
                {publicKey.toBase58().slice(-4)}
              </span>
              <button onClick={disconnect} className="disconnect-btn">
                Disconnect
              </button>
            </div>
          ) : (
            <button onClick={openWalletModal} className="connect-wallet-btn">
              Connect Wallet
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={toggleMobileMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Wallet Modal */}
      {isWalletModalOpen && (
        <div className="wallet-modal-overlay">
          <div className="wallet-modal">
            <h2 className="modal-title">Connect Your Wallet</h2>
            <div className="wallet-options">
              {walletOptions.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => connectWallet(wallet.name)}
                  className="wallet-option"
                >
                  <img src={wallet.icon} alt={`${wallet.name} icon`} />
                  <span>{wallet.name}</span>
                </button>
              ))}
            </div>
            {connectionError && (
              <div className="error-message">{connectionError}</div>
            )}
            <button onClick={closeWalletModal} className="close-modal-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
