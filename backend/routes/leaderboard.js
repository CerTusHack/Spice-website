const express = require('express');
const router = express.Router();
const { Connection, PublicKey } = require('@solana/web3.js');

// Set up the connection to the Solana cluster (use 'mainnet-beta', 'devnet', or 'testnet')
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Replace with your token's mint address
const TOKEN_MINT_ADDRESS = new PublicKey('6LnUMFTzpoB8GwtpDgnHkRYwBs7jWcVBE86L6r8rpump');

// Function to get top token holders
async function getTopHolders() {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      TOKEN_MINT_ADDRESS,
      { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9SSdt5Q8W5') }
    );

    // Extract the data needed from the token accounts
    const holders = tokenAccounts.value.map(account => {
      const parsedInfo = account.account.data.parsed.info;
      return {
        publicKey: parsedInfo.owner,
        balance: parsedInfo.tokenAmount.uiAmount,
      };
    });

    // Sort by balance in descending order
    holders.sort((a, b) => b.balance - a.balance);

    // Return the top 10 holders for simplicity
    return holders.slice(0, 10);
  } catch (error) {
    console.error('Error fetching top holders:', error.message);
    throw new Error('Failed to fetch top holders');
  }
}

// Define your route handler for fetching the leaderboard
router.get('/', async (req, res) => {
  try {
    const topHolders = await getTopHolders();
    res.json(topHolders);
  } catch (err) {
    console.error('Error in leaderboard route:', err.message);
    res.status(500).json({ message: 'Failed to retrieve leaderboard' });
  }
});

module.exports = router;
