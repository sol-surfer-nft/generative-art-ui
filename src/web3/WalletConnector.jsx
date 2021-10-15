/* eslint-disable react/prop-types */
// Higher order component to expose Solana's Web3 Connections
import React, { useMemo } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    getLedgerWallet,
    getPhantomWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolletWallet,
    getTorusWallet,
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import logo from '../assets/images/logo.png'

export const WalletConnector = (props) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  // Nico: Should default to 'mainnet-beta'?
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(() => [
    getPhantomWallet(),
    getSolflareWallet(),
    getSlopeWallet(),
    getTorusWallet({
        options: { clientId: 'Get a client ID @ https://developer.tor.us' }
    }),
    getLedgerWallet(),
    getSolletWallet({ network }),
  ], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider logo={logo}>
          {props.children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}