'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { SUPPORTED_CHAINS, DEFAULT_CHAIN_ID } from '../lib/chains';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize provider and check connection on mount
  useEffect(() => {
    const init = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(provider);

          // Check if already connected
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0].address);
          }

          // Get current chain
          const network = await provider.getNetwork();
          setChainId(Number(network.chainId));

          // Set up event listeners
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          window.ethereum.on('chainChanged', handleChainChanged);
        } catch (err) {
          console.error("Initialization error:", err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    init();

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    setAccount(accounts[0] || null);
  };

  const handleChainChanged = (newChainId) => {
    setChainId(parseInt(newChainId, 16));
    window.location.reload(); // Recommended to avoid chain-specific state issues
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask!');
      }

      setIsLoading(true);
      setError(null);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      // Ensure we're on a supported chain
      const network = await provider.getNetwork();
      const currentChainId = Number(network.chainId);

      if (!SUPPORTED_CHAINS[currentChainId]) {
        await switchChain(DEFAULT_CHAIN_ID);
      }

      setAccount(accounts[0]);
      setProvider(provider);
      setChainId(currentChainId);
    } catch (err) {
      setError(err.message);
      console.error("Connection error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const switchChain = async (targetChainId) => {
    try {
      if (!window.ethereum) throw new Error('No Ethereum provider found');

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      setChainId(Number(network.chainId));
    } catch (switchError) {
      // This error code indicates the chain hasn't been added to MetaMask
      if (switchError.code === 4902 && SUPPORTED_CHAINS[targetChainId]) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${targetChainId.toString(16)}`,
              chainName: SUPPORTED_CHAINS[targetChainId].name,
              rpcUrls: [SUPPORTED_CHAINS[targetChainId].rpcUrl]
            }],
          });
        } catch (addError) {
          setError(`Failed to add network: ${addError.message}`);
        }
      } else {
        setError(`Failed to switch network: ${switchError.message}`);
      }
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
  };

  return (
    <WalletContext.Provider value={{
      account,
      provider,
      chainId,
      isLoading,
      error,
      connectWallet,
      disconnectWallet,
      switchChain,
      SUPPORTED_CHAINS
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);