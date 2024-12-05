import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-branding">
            <h3>$SPICE</h3>
            <p>Your gateway to secure and verified threat validation.</p>
          </div>

          <div className="footer-navigation">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/submit-threat">Submit Threat</a>
              </li>
              <li>
                <a href="/validate-threat">Validate Threat</a>
              </li>
              <li>
                <a href="/leaderboard">Leaderboard</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Connect with Us</h4>
            <ul>
              <li>
                <a href="https://twitter.com/ChilliguySpice" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://t.me/Chiliverse" target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://github.com/CerTusHack/Spicy_Litepaper" target="_blank" rel="noopener noreferrer">
                  LITEPAPER
                </a>
              </li>
              <li>
                <a href="https://github.com/CerTusHack/" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 $SPICE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
