const { Connection } = require('@solana/web3.js');

const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Verify a transaction
const verifyTransaction = async (transactionSignature) => {
  try {
    const transaction = await connection.getTransaction(transactionSignature);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return transaction;
  } catch (error) {
    throw new Error('Failed to verify transaction: ' + error.message);
  }
};

module.exports = { verifyTransaction };
