import React from 'react';
import { WalletContextProviderWrapper } from './services/blockchain';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SubmitThreat from './pages/SubmitThreat';
import ValidateThreat from './pages/ValidateThreat';
import ThreatList from './pages/ThreatList';
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';
import Contact from './pages/Contact'

function App() {
  return (
    <WalletContextProviderWrapper>
      <Router>
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit-threat" element={<SubmitThreat />} />
            <Route path="/validate-threat" element={<ValidateThreat />} />
            <Route path="/threat-list" element={<ThreatList />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </WalletContextProviderWrapper>
  );
}

export default App;
