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
    tokens: {
      emc: { contract: '0xDFB8BE6F8c87f74295A87de951974362CedCFA30', symbolName: 'EMC', decimal: 18 },
      usdt: { contract: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9', symbolName: 'USDT', decimal: 6 },
    },
    smarts: {
      rewardStake: { contract: '0xb204C35048C73F03b69Bd6163b3c2e88ce9dAa00' },
      nodeStake: { contract: '0xaeFDD38de2aD3C301b234be320A2305db082426f' },
      nodeReward: { contract: '' }, //0x70bbf54454117D30B32eCAbCD16899C545DB14e4
      nodeUnstakeClaim: { contract: '0xbfbc3BF85FBA818fc49A0354D2C84623cE711b63' },
      publicSell: { contract: '0x9E035Dc6DB311d35F1eDca506B41AAec90d9E704' },
    },
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
  //   tokens: {
  //     emc: { contract: '0x20Dcf8106bdC2cCCcf84DD62dc486A7123A41d13', symbolName: 'EMC.t', decimal: 18 },
  //     usdt: { contract: '', symbolName: 'USDT', decimal: 6 },
  //   },
  //   smarts: {
  //     rewardStake: { contract: 'xx' },
  //     nodeStake: { contract: '' },
  //     nodeReward: { contract: '' },
  //     nodeUnstakeClaim: { contract: '' },
  //     publicSell: { contract: '0x70bbf54454117D30B32eCAbCD16899C545DB14e4' },
  //   },
  // },
];
