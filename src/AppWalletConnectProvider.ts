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
        if (!_isConnected) {
          w3s.setProvider(null);
          return;
        }
        if (!walletProvider.value) {
          console.error('watch connected error: Not found provider');
          return;
        }
        w3s.setProvider(walletProvider.value);
      },
      { immediate: true }
    );

    watch<[string | undefined, number | undefined]>(
      () => [address.value, chainId.value],
      ([_address, _chainId]) => {
        // console.info('watch [address, chainId]', [address.value, chainId.value]);
        ethUserStore.account0 = _address || '';
        ethUserStore.chainId = _chainId || 0;

        if (_address && _chainId === CHAIN_ID) {
          ethUserStore.updateBalance(_address);
        }
      }
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
