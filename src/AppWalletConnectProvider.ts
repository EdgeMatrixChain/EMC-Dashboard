import { defineComponent, watch } from 'vue';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/vue';
import { useWeb3ModalProvider, useWeb3ModalAccount, useDisconnect } from '@web3modal/ethers/vue';
import { Web3Service } from '@/web3';
import { useETHUserStore } from '@/stores/eth-user';
import { getDefaultNetwork } from '@/web3/network';

function config() {
  const projectId = '7b0639ba7d93a42ebb994ffd883acab7';
  const networkConfig = getDefaultNetwork();

  // 2. Set chains
  const mainnet = {
    chainId: networkConfig.chainId,
    name: networkConfig.chainName,
    currency: networkConfig.symbol,
    explorerUrl: networkConfig.blockExplorerUrls[0],
    rpcUrl: networkConfig.rpcUrls[0],
  };

  // 3. Create modal
  const metadata = {
    name: 'Edge Matrix Dashboard',
    description: 'Edge Matrix Dashboard',
    url: 'https://dashboard.edgematrix.pro',
    icons: ['https://dashboard.edgematrix.pro/assets/logo-661b4f8c.png'],
  };

  return {
    ethersConfig: defaultConfig({ metadata }),
    chains: [mainnet],
    projectId,
    enableAnalytics: false,
    featuredWalletIds: ['c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662'],
  };
}

export default defineComponent({
  name: 'AppWalletConnectProvider',
  setup(_, { slots }) {
    const w3s = Web3Service.getInstance();
    const networkConfig = getDefaultNetwork();
    const CHAIN_ID = networkConfig.chainId;

    const web3Modal = createWeb3Modal(config());
    const { isConnected, address, chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const { disconnect } = useDisconnect();
    const ethUserStore = useETHUserStore();

    watch(
      () => isConnected.value,
      (_isConnected) => {
        // console.info('watch connected', _isConnected);
        ethUserStore.isConnected = _isConnected;
     
      },
      { immediate: true }
    );

    watch(
      () => chainId.value,
      (_chainId) => {
        _chainId = _chainId || 0;
        console.info(`chainId: ${_chainId}`);
        ethUserStore.chainId = _chainId;
        if (_chainId === CHAIN_ID) {
          w3s.setProvider(walletProvider.value || null);
        } else {
          w3s.setProvider(null);
        }

        if (ethUserStore.account0 && _chainId === CHAIN_ID) {
          ethUserStore.updateBalance(ethUserStore.account0);
        }
      },
      { immediate: true }
    );

    watch(
      () => address.value,
      (_address) => {
        // console.info('watch address', address.value);
        _address = _address || '';

        ethUserStore.account0 = _address;

        if (_address && ethUserStore.chainId === CHAIN_ID) {
          ethUserStore.updateBalance(_address);
        }
      },
      { immediate: true }
    );

    ethUserStore.signIn = () => {
      web3Modal.open({ view: 'Connect' });
    };

    ethUserStore.signOut = async () => {
      ethUserStore.resetBalance();
      await disconnect();
      return { _result: 0 };
    };

    return () => {
      if (slots.default) {
        return slots.default();
      }
    };
  },
});
