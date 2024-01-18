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
    },
    smarts: {
      nodeStake: { contract: '0xC6C6d5ED9c407F0c9d83D13fA345c68C57a90cbD' },
      nodeReward: { contract: '0x70bbf54454117D30B32eCAbCD16899C545DB14e4' },
      nodeUnstakeClaim: { contract: '0xbfbc3BF85FBA818fc49A0354D2C84623cE711b63' },
      publicSell: { contract: '0xe4B1E55Ccb310D82D12364A2273C62F162424A90' },
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
  //   },
  //   smarts: {
  //     nodeStake: { contract: '0x4A71EdAeDf64b29F43A6eF1F581d83bc71586D1f' },
  //     nodeReward: { contract: '0xc54BD64a51A9361A6fCeFE6b0f31D7b53619f39f' },
  //     nodeUnstakeClaim: { contract: '' },
  //     publicSell: { contract: '0x70bbf54454117D30B32eCAbCD16899C545DB14e4' },
  //   },
  // },
];
