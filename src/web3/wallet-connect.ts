import { list as networkList } from './network';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/vue';

export class WalletConnect {
  constructor() {}

  static init() {
    // 1. Get projectId at https://cloud.walletconnect.com
    const projectId = '7b0639ba7d93a42ebb994ffd883acab7';
    const network = networkList[0];

    // 2. Set chains
    const mainnet = {
      chainId: network.chainId,
      name: network.chainName,
      currency: network.symbol,
      explorerUrl: network.blockExplorerUrls[0],
      rpcUrl: network.rpcUrls[0],
    };

    // 3. Create modal
    const metadata = {
      name: 'Edge Matrix Dashboard',
      description: 'Edge Matrix Dashboard',
      url: 'https://dashboard.edgematrix.pro',
      icons: ['https://dashboard.edgematrix.pro/assets/logo-661b4f8c.png'],
    };

    createWeb3Modal({
      ethersConfig: defaultConfig({ metadata }),
      chains: [mainnet],
      projectId,
      enableAnalytics: false,
      featuredWalletIds: [
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662',
      ],
      // excludeWalletIds: [
      //   'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      //   'e7c4d26541a7fd84dbdfa9922d3ad21e936e13a7a0e44385d44f006139e44d3b',
      // ],
    });
  }
}
