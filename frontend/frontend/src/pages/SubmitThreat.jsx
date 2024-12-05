import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getTokenBalance } from '../services/blockchain';
import apiService from '../services/api';
import '../styles/SubmitThreat.css';

const SubmitThreat = () => {
  const { publicKey, connected, connect, disconnect } = useWallet(); // Include `connected` state
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const currentBalance = await getTokenBalance(publicKey.toString());
          setTokenBalance(currentBalance);
        } catch (err) {
          console.error('Error fetching token balance:', err);
        }
      }
    };

    fetchBalance();
  }, [publicKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (!publicKey) {
        throw new Error('Please connect your wallet before submitting a report.');
      }

      if (tokenBalance < 500000) {
        throw new Error('Insufficient token balance to submit a threat report.');
      }

      const reportData = {
        userPublicKey: publicKey.toString(),
        description,
      };
      await apiService.submitThreat(reportData);

      setSuccessMessage('Threat report submitted successfully!');
      setDescription('');
    } catch (err) {
      setError(err.message || 'Failed to submit the threat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-threat-container">
      <section className="submit-threat-hero">
        <h1>Submit a Threat</h1>
        <p className="hero-description">
          Contribute to the safety of the blockchain by reporting threats and earning rewards in $SPICE.
        </p>
      </section>

      <div className="submit-threat-form">
        {!connected ? (
          <div className="connect-wallet-prompt">
            <p>Please connect your wallet to submit a threat.</p>
            <button className="connect-wallet-btn" onClick={connect}>
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="wallet-info">
            <p className="wallet-address">
              <strong>Connected Wallet:</strong> {publicKey.toString()}
            </p>
            {tokenBalance !== null && (
              <p className="token-balance">
                <strong>Token Balance:</strong> {tokenBalance.toFixed(2)} $SPICE
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <textarea
                className="threat-description"
                placeholder="Describe the threat in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <button
                type="submit"
                className={`submit-btn ${tokenBalance < 500000 ? 'disabled' : ''}`}
                disabled={loading || tokenBalance < 500000}
              >
                {loading ? 'Submitting...' : tokenBalance < 500000 ? 'Insufficient Tokens' : 'Submit Threat'}
              </button>
            </form>
          </div>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default SubmitThreat;
