'use client';
import { useWallet } from '../../context/WalletContext';

export const WalletConnectButton = () => {
  const {
    account,
    chainId,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    switchChain,
    SUPPORTED_CHAINS
  } = useWallet();

  const truncatedAddress = account 
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : null;

  if (isLoading) {
    return <button disabled className="px-4 py-2 bg-gray-400 rounded-lg">Loading...</button>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        {error}
        <button 
          onClick={connectWallet}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {chainId && (
        <select
          value={chainId}
          onChange={(e) => switchChain(Number(e.target.value))}
          className="px-3 py-2 bg-gray-700 text-white rounded-lg"
        >
          {Object.values(SUPPORTED_CHAINS).map((chain) => (
            <option key={chain.id} value={chain.id}>
              {chain.name}
            </option>
          ))}
        </select>
      )}
      
      <button
        onClick={account ? disconnectWallet : connectWallet}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {account ? `Disconnect (${truncatedAddress})` : 'Connect Wallet'}
      </button>
    </div>
  );
};