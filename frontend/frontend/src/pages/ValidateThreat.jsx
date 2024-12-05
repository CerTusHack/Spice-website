import React, { useState, useEffect } from "react";
import { useWallet, WalletNotConnectedError } from "@solana/wallet-adapter-react";
import apiService from "../services/api";
import "../styles/ValidateThreat.css";
import Skeleton from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ValidateThreat() {
  const { connected, publicKey } = useWallet(); // Using publicKey to identify the connected wallet
  const [threats, setThreats] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState(null);

  useEffect(() => {
    const loadThreats = async () => {
      if (!connected || !publicKey) {
        setStatus("Please connect your wallet to view and validate threats.");
        return;
      }

      try {
        setIsLoading(true);
        const data = await apiService.getThreats();
        setThreats(data);
        setStatus(""); // Clear the status on successful load
      } catch (error) {
        setStatus("Error fetching threats. Please try again.");
        console.error("Error fetching threats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThreats();
  }, [connected, publicKey]);

  const handleValidate = async () => {
    if (!connected || !publicKey) {
      toast.error("Please connect your wallet to validate threats.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiService.validateThreat(selectedThreat._id, publicKey.toString()); // Pass wallet publicKey
      if (response.success) {
        setThreats((prevThreats) =>
          prevThreats.filter((threat) => threat._id !== selectedThreat._id)
        );
        toast.success("Threat validated successfully!");
      } else {
        toast.error("Failed to validate threat. Please try again.");
      }
    } catch (error) {
      toast.error("Error validating the threat. Please try again.");
      console.error("Error validating threat:", error);
    } finally {
      setIsLoading(false);
      setShowModal(false);
      setSelectedThreat(null);
    }
  };

  const openValidationModal = (threat) => {
    setSelectedThreat(threat);
    setShowModal(true);
  };

  const closeValidationModal = () => {
    setShowModal(false);
    setSelectedThreat(null);
  };

  return (
    <div className="ValidateThreat">
      <h2>Validate Submitted Threats</h2>
      
      {/* Wallet Status */}
      <div className="wallet-status">
        {connected && publicKey ? (
          <p className="wallet-info">
            Connected Wallet: {publicKey.toString().slice(0, 5)}...
            {publicKey.toString().slice(-5)}
          </p>
        ) : (
          <p className="wallet-warning">
            Wallet not connected. Please connect to proceed.
          </p>
        )}
      </div>

      {status && <p className="status">{status}</p>}

      {isLoading && (
        <div className="loading">
          <Skeleton height={100} count={3} />
        </div>
      )}

      {!isLoading && threats.length === 0 && !status && (
        <p>No threats available for validation. Check back later!</p>
      )}

      <div className="threat-card-container">
        {threats.map((threat) => (
          <div
            key={threat._id}
            className="threat-card threat-hover-effect"
            onClick={() => openValidationModal(threat)}
          >
            <div className="threat-header">
              <h3>{threat.description}</h3>
              <span className="status-badge new animated-pulse">New</span>
            </div>
            <p className="reporter-info">
              <strong>Reported By:</strong> {threat.reporter}
            </p>
            <p className="report-timestamp">
              <strong>Reported On:</strong>{" "}
              {new Date(threat.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Validation Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal animated-fade-in">
            <h3>Confirm Validation</h3>
            <p>
              Are you sure you want to validate the threat:{" "}
              <strong>{selectedThreat?.description}</strong>?
            </p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={handleValidate}>
                Confirm
              </button>
              <button className="cancel-button" onClick={closeValidationModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default ValidateThreat;
