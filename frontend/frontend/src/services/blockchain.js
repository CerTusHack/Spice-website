import React from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  WalletConnectWalletAdapter,
} from '@solana/wallet-adapter-wallets';

export const WalletContextProviderWrapper = ({ children }) => {
  const endpoint = clusterApiUrl(process.env.REACT_APP_SOLANA_NETWORK || 'mainnet-beta');
  
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new LedgerWalletAdapter(),
    new WalletConnectWalletAdapter({
      network: 'mainnet-beta', // Explicitly specify network
      rpc: { 'mainnet-beta': process.env.REACT_APP_SOLANA_RPC_URL || clusterApiUrl('mainnet-beta') },
    }),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const getTokenBalance = async (walletAddress) => {
  try {
    const connection = new Connection(
      process.env.REACT_APP_SOLANA_RPC_URL || clusterApiUrl('mainnet-beta'), 
      'confirmed'
    );
    const walletPublicKey = new PublicKey(walletAddress);
    const tokenContractAddress = new PublicKey(process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS);

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      walletPublicKey, 
      { mint: tokenContractAddress }
    );

    if (tokenAccounts.value.length > 0) {
      const tokenAmount = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
      return tokenAmount;
    } 
    
    return 0; // Return 0 instead of throwing an error if no accounts found
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return 0; // Return 0 on error instead of rethrowing
  }
};