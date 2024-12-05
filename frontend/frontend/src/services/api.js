import axios from 'axios';
import config from '../config';

const apiService = {
  /**
   * Submit a threat
   * @param {Object} reportData - The report details
   * @param {string} reportData.userPublicKey - The reporter's public key (wallet address)
   * @param {string} reportData.description - The threat description
   */
  submitThreat: async (reportData) => {
    try {
      const response = await axios.post(`${config.BACKEND_URL}/threats/submit`, reportData);
      return response.data;
    } catch (err) {
      console.error('Error submitting threat:', err.message);
      throw new Error(err.response?.data?.message || 'Failed to submit the threat');
    }
  },

  /**
   * Validate a threat and reward the reporter
   * @param {string} threatId - The ID of the threat to validate
   * @param {string} validatorPublicKey - The public key of the validator (wallet address)
   * @param {number} rewardAmount - The reward tokens for the reporter
   */
  validateThreat: async (threatId, validatorPublicKey, rewardAmount) => {
    try {
      const response = await axios.post(`${config.BACKEND_URL}/threats/validate`, {
        threatId,
        validatorPublicKey,
        rewardAmount,
      });
      return response.data;
    } catch (err) {
      console.error('Error validating threat:', err.message);
      throw new Error(err.response?.data?.message || 'Failed to validate the threat');
    }
  },

  /**
   * Fetch all threats
   */
  getThreats: async () => {
    try {
      const response = await axios.get(`${config.BACKEND_URL}/threats`);
      return response.data;
    } catch (err) {
      console.error('Error fetching threats:', err.message);
      throw new Error(err.response?.data?.message || 'Failed to fetch threats');
    }
  },

  /**
 * Fetch top token holders data
 */
getTopTokenHolders: async () => {
  try {
    const response = await axios.get(`${config.BACKEND_URL}/top-token-holders`);
    return response.data;
  } catch (err) {
    console.error('Error fetching top token holders:', err.message);
    throw new Error(err.response?.data?.message || 'Failed to fetch top token holders');
  }
},
};

export default apiService;
