import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            🚀 Welcome to the Hottest <span>$SPICE</span> Threat Reporting Platform!
          </h1>
          <p className="hero-description">
            Protect the Solana ecosystem by submitting and validating threats, 
            earn rewards, track top holders, and dive into the $SPICE revolution!
          </p>
          <div className="cta-buttons">
            <a href="/submit-threat" className="cta-button">Submit a Threat</a>
            <a href="/leaderboard" className="cta-button secondary">View Leaderboard</a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/spice-memecoin.jpg" alt="Spice Memecoin Community" />
        </div>
      </div>
      <section className="features-section">
        <h2>🔥 Why Choose $SPICE?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src="/images/report.jpg" alt="Report Threats" />
            <h3>Report Threats</h3>
            <p>Submit potential security issues and help safeguard the Solana blockchain.</p>
          </div>
          <div className="feature-card">
            <img src="/images/validate.jpg" alt="Validate Threats" />
            <h3>Validate Threats</h3>
            <p>Verify and validate reported threats to earn $SPICE rewards.</p>
          </div>
          <div className="feature-card">
             <img src="/images/arbitrage.jpg" alt="Arbitrage" />
             <h3>Arbitrage</h3>
             <p>Take advantage of price discrepancies between platforms with our token. Buy at a low price on <a href="https://www.coininn.com/SPC" target="_blank" rel="noopener noreferrer">CoinInn</a>, and sell at a higher price on DEX exchanges for a premium. This method offers an easy and effective way to make profits through arbitrage trading.</p>
          </div>
          <div className="feature-card">
            <img src="/images/leaderboard.jpg" alt="Leaderboard" />
            <h3>Leaderboard</h3>
            <p>Climb the ranks by contributing to the community and earning tokens.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
