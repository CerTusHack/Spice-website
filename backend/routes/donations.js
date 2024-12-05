const express = require('express');
const router = express.Router();
const { verifyTransaction } = require('../services/blockchainService');

// Process a donation
router.post('/', async (req, res) => {
  const { donorWallet, transactionSignature } = req.body;

  try {
    await verifyTransaction(transactionSignature);

    res.status(200).json({ message: 'Donation recorded successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
