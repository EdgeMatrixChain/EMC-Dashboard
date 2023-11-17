import Arbitrum from './avatars/arbitrum.png';

export default [
  {
    chainId: 42161,
    chainName: 'Arbitrum One',
    chainAvatar: Arbitrum,
    rpcUrls: ['https://arbitrum-mainnet.infura.io'],
    decimals: 18,
    symbol: 'ETH',
    symbolName: 'ETH',
    blockExplorerUrls: ['https://explorer.arbitrum.io'],
  },
  // {
  //   chainId: 421613,
  //   chainName: 'Arbitrum Goerli Testnet',
  //   chainAvatar: Arbitrum,
  //   rpcUrls: ['https://arbitrum-goerli.publicnode.com'],
  //   decimals: 18,
  //   symbol: 'AGOR',
  //   symbolName: 'AGOR',
  //   blockExplorerUrls: ['https://goerli.arbiscan.io/'],
  // },
];
