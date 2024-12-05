import React from 'react';
import '../styles/Contact.css'; // Ensure you create this CSS file for styling

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-info">
        For inquiries, please reach out to us at <a href="mailto:ceo@certushack.org">ceo@certushack.org</a>.
      </p>
      <div className="social-links">
        <h2>Connect with us:</h2>
        <ul>
          <li><a href="https://twitter.com/ChilliguySpice" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://t.me/Chiliverse" target="_blank" rel="noopener noreferrer">Telegram</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Contact;
