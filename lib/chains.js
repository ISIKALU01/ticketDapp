export const SUPPORTED_CHAINS = {
    1: {
      id: 1,
      name: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY'
    },
    5: {
      id: 5,
      name: 'Goerli Testnet',
      rpcUrl: 'https://goerli.infura.io/v3/YOUR_INFURA_KEY'
    },
    137: {
      id: 137,
      name: 'Polygon Mainnet',
      rpcUrl: 'https://polygon-rpc.com'
    }
  };
  
  export const DEFAULT_CHAIN_ID = 5; // Default to Goerli