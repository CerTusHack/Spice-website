import React, { useEffect, useState } from 'react';
import apiService from '../services/api';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // API call to fetch top token holders
        const data = await apiService.getTopTokenHolders();
        setLeaderboard(data);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">🏆 Leaderboard: Top Token Holders</h1>
      {loading ? (
        <div className="loading-container">
          <p className="loading-text">Loading leaderboard...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      ) : leaderboard.length === 0 ? (
        <div className="empty-container">
          <p className="empty-message">No token holders found. Be the first!</p>
        </div>
      ) : (
        <div className="leaderboard-table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Holder</th>
                <th>Tokens Held</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((holder, index) => (
                <tr key={holder.publicKey}>
                  <td>
                    {index + 1 === 1
                      ? '🥇'
                      : index + 1 === 2
                      ? '🥈'
                      : index + 1 === 3
                      ? '🥉'
                      : index + 1}
                  </td>
                  <td>
                    <span className="public-key">
                      {holder.publicKey.slice(0, 6)}...{holder.publicKey.slice(-6)}
                    </span>
                  </td>
                  <td>{holder.tokensHeld?.toFixed(2) || 0} $SPICE</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
