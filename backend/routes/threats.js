const express = require('express');
const router = express.Router();
const Threat = require('../models/Threat');
const { verifyTransaction } = require('../services/blockchainService');

// Submit a threat
router.post('/submit', async (req, res) => {
  const { wallet, title, description, transactionSignature } = req.body;

  try {
    // Verify transaction on blockchain
    await verifyTransaction(transactionSignature);

    // Save threat in DB
    const threat = new Threat({
      wallet,
      title,
      description,
      transactionSignature,
      status: 'submitted',
    });
    await threat.save();

    res.status(201).json({ message: 'Threat submitted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Validate a threat
router.post('/validate', async (req, res) => {
  const { threatId, validatorWallet, transactionSignature } = req.body;

  try {
    const threat = await Threat.findById(threatId);
    if (!threat || threat.status !== 'submitted') {
      return res.status(404).json({ error: 'Threat not found or already validated' });
    }

    await verifyTransaction(transactionSignature);

    // Update threat
    threat.status = 'validated';
    threat.validatorWallet = validatorWallet;
    threat.validationSignature = transactionSignature;
    await threat.save();

    res.status(200).json({ message: 'Threat validated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// List all threats
router.get('/', async (req, res) => {
  try {
    const threats = await Threat.find();
    res.status(200).json(threats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
