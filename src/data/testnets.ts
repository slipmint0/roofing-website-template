import { TestnetNetwork } from '../types/token';

export const TESTNETS: TestnetNetwork[] = [
  {
    name: 'Ethereum Sepolia',
    chainId: 11155111,
    hexChainId: '0xaa36a7',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'SepoliaETH',
      decimals: 18,
    },
    rpcUrls: [
      'https://rpc.sepolia.org',
      'https://ethereum-sepolia.publicnode.com',
      'https://sepolia.gateway.tenderly.co',
    ],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
    faucetUrls: [
      {
        name: 'Google Cloud Web3 Faucet',
        url: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia',
        note: '0.05 Sepolia ETH / 24h with Google login, fast & reliable.',
      },
      {
        name: 'Alchemy Sepolia Faucet',
        url: 'https://www.alchemy.com/faucets/ethereum-sepolia',
        note: 'Requires free Alchemy account, distributes 0.05 ETH.',
      },
      {
        name: 'Sepolia PoW Faucet',
        url: 'https://sepolia-faucet.pk910.de',
        note: 'Proof-of-work browser mining faucet; no login required.',
      },
    ],
    isRecommended: true,
  },
  {
    name: 'Ethereum Holesky',
    chainId: 17000,
    hexChainId: '0x4268',
    nativeCurrency: {
      name: 'Holesky Ether',
      symbol: 'HolETH',
      decimals: 18,
    },
    rpcUrls: [
      'https://ethereum-holesky.publicnode.com',
      'https://rpc.holesky.ethpandaops.io',
    ],
    blockExplorerUrls: ['https://holesky.etherscan.io'],
    faucetUrls: [
      {
        name: 'Google Cloud Holesky Faucet',
        url: 'https://cloud.google.com/application/web3/faucet/ethereum/holesky',
        note: 'Official Google Web3 faucet for Holesky staking and contract tests.',
      },
      {
        name: 'Holesky PoW Faucet',
        url: 'https://holesky-faucet.pk910.de',
        note: 'Mining faucet for large testing allocations.',
      },
    ],
  },
  {
    name: 'Polygon Amoy Testnet',
    chainId: 80002,
    hexChainId: '0x13882',
    nativeCurrency: {
      name: 'POL Token',
      symbol: 'POL',
      decimals: 18,
    },
    rpcUrls: [
      'https://rpc-amoy.polygon.technology',
      'https://polygon-amoy.drpc.org',
    ],
    blockExplorerUrls: ['https://amoy.polygonscan.com'],
    faucetUrls: [
      {
        name: 'Polygon Official Faucet',
        url: 'https://faucet.polygon.technology',
        note: 'Official Polygon Amoy faucet for testnet POL tokens.',
      },
    ],
  },
  {
    name: 'Arbitrum Sepolia',
    chainId: 421614,
    hexChainId: '0x66eee',
    nativeCurrency: {
      name: 'Arbitrum Sepolia Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://sepolia.arbiscan.io'],
    faucetUrls: [
      {
        name: 'Arbitrum Bridge Faucet',
        url: 'https://bridge.arbitrum.io/?destinationChain=arbitrum-sepolia',
        note: 'Bridge Sepolia ETH to Arbitrum Sepolia L2 for ultra-low gas.',
      },
    ],
  },
  {
    name: 'Base Sepolia',
    chainId: 84532,
    hexChainId: '0x14a34',
    nativeCurrency: {
      name: 'Base Sepolia Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://sepolia.base.org'],
    blockExplorerUrls: ['https://sepolia.basescan.org'],
    faucetUrls: [
      {
        name: 'Base Faucet',
        url: 'https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet',
        note: 'Coinbase developer faucet for Base Sepolia testing.',
      },
    ],
  },
];
