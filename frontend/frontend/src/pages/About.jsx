import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1 className="about-title">$SPICE: Empowering Decentralized Security</h1>
        <p className="about-subtitle">
          Together, we enhance transparency and safety in blockchain ecosystems through community-driven threat reporting and rewards.
        </p>
      </section>
      <section className="about-content">
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            We aim to create a secure and transparent web3 environment where everyone plays an active role in identifying and mitigating threats. By combining blockchain technology and community rewards, we’re paving the way for a safer decentralized future.
          </p>
        </div>
        <div className="about-card">
          <h2>How It Works</h2>
          <p>
            $SPICE holders report threats and validate submissions, earning tokens in return. This decentralized approach ensures everyone contributes to the ecosystem's health and security.
          </p>
        </div>
        <div className="about-card">
          <h2>Why $SPICE?</h2>
          <p>
            $SPICE is more than a memecoin—it’s a movement. Our community thrives on the principles of trust, security, and collaboration. Together, we make web3 better, one threat at a time.
          </p>
        </div>
      </section>
      <section className="about-call-to-action">
        <h2>Join the $SPICE Movement</h2>
        <p>
          Become a part of our mission to revolutionize blockchain security. Earn rewards, protect the ecosystem, and grow the $SPICE community.
        </p>
        <a href="/leaderboard" className="about-cta-button">Explore Leaderboard</a>
      </section>
    </div>
  );
}

export default About;
