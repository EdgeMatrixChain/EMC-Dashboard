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
    });
  }
}
