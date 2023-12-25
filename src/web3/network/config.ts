import Arbitrum from './avatars/arbitrum.png';

export default [
  {
    chainId: 42161,
    chainName: 'Arbitrum One',
    chainAvatar: Arbitrum,
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    //rpcUrls: ['https://arbitrum-mainnet.infura.io'],
    decimals: 18,
    symbol: 'ETH',
    symbolName: 'ETH',
    blockExplorerUrls: ['https://explorer.arbitrum.io'],
  },
  // {
  //   chainId: 421614,
  //   chainName: 'Arbitrum Sepolia Testnet',
  //   chainAvatar: Arbitrum,
  //   rpcUrls: ['https://arbitrum-sepolia.blockpi.network/v1/rpc/public', 'https://sepolia-rollup.arbitrum.io/rpc'],
  //   decimals: 18,
  //   symbol: 'AGOR',
  //   symbolName: 'AGOR',
  //   blockExplorerUrls: ['https://sepolia.arbiscan.io/'],
  // },
];
