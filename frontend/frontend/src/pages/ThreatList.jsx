import React, { useEffect, useState } from 'react';
import apiService from '../services/api';
import '../styles/ThreatList.css';

const ThreatList = () => {
  const [threats, setThreats] = useState([]);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        setStatus('Loading threats...');
        const data = await apiService.getThreats();
        setThreats(data);
        setStatus('');
      } catch (error) {
        setStatus('Error fetching threats. Please try again later.');
      }
    };

    fetchThreats();
  }, []);

  const filteredThreats = threats.filter((threat) =>
    threat.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="threat-list-container">
      <h1 className="threat-list-title">Threat List</h1>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search threats..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>
      {status && <p className="status-message">{status}</p>}
      <div className="threat-list">
        {filteredThreats.map((threat) => (
          <div key={threat._id} className="threat-card">
            <h3>{threat.title || 'Untitled Threat'}</h3>
            <p>{threat.description}</p>
            <span className="threat-metadata">
              <strong>Submitted By:</strong> {threat.submittedBy || 'Unknown'}
            </span>
            <span className="threat-metadata">
              <strong>Severity:</strong> {threat.severity || 'Unknown'}
            </span>
            <button
              className="details-button"
              onClick={() => alert(`More details about threat ID: ${threat._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreatList;
