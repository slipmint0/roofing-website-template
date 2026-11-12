export interface TokenConfig {
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: string;
  isBurnable: boolean;
  isMintable: boolean;
  isPausable: boolean;
  isCapped: boolean;
  capSupply: string;
  license: string;
  solidityVersion: string;
  openZeppelinVersion: string;
}

export interface TestnetNetwork {
  name: string;
  chainId: number;
  hexChainId: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  faucetUrls: { name: string; url: string; note: string }[];
  isRecommended?: boolean;
}
