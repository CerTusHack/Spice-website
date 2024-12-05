const mongoose = require('mongoose');

const ThreatSchema = new mongoose.Schema({
  wallet: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  transactionSignature: { type: String, required: true },
  validatorWallet: { type: String },
  validationSignature: { type: String },
  status: { type: String, enum: ['submitted', 'validated'], default: 'submitted' },
});

module.exports = mongoose.model('Threat', ThreatSchema);
