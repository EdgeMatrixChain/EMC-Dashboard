import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Metamask } from '@/web3/metamask';
import { Web3Service } from '@/web3';

interface User {
  id: string | number;
  nickname: string;
  avatar: string;
}

const defaultUser = (): User => ({
  id: 0,
  nickname: '',
  avatar: '',
});

export const useETHUserStore = defineStore('ethuser', () => {
  const user = ref<User>(defaultUser());
  const accounts = ref<string[]>([]);
  const account0 = ref<string>('');
  const chainId = ref<number | undefined>();
  const CHAIN_ID = 421613;

  const getWalletService = (type: string) => {
    switch (type) {
      case 'metamask':
        return Metamask;
      default:
        return null;
    }
  };

  const signIn = async ({ type }: { type: 'metamask' }) => {
    const WalletService = getWalletService(type);
    if (!WalletService) {
      return { _result: 1, _desc: `Not support wallet provider ${type}` };
    }

    const wallet = new WalletService();
    const walletProvider = await wallet.getProvider();

    const w3s = Web3Service.getInstance();
    w3s.setup({ provider: walletProvider });

    const resp = await w3s.connect();
    if (resp._result !== 0) {
      resp._desc = resp._desc || 'Unknow error';
      return resp;
    }
    const resp1 = await w3s.getChainId();
    if (resp1.chainId !== CHAIN_ID) {
      const resp2 = await wallet.switchNetwork(CHAIN_ID);
      if (resp2._result !== 0) {
        resp2._desc = resp2._desc || 'Switch network unknow error';
        return resp2;
      }
    }
    chainId.value = CHAIN_ID;
    accounts.value = resp.accounts;
    account0.value = accounts.value[0];

    //TODO Call api query user info if need...

    walletProvider.on('chainChanged', (changed) => {
      console.info(changed);
      const chainIdHex = changed as string;
      const _chainId = parseInt(chainIdHex || '');
      chainId.value = _chainId;
      if (_chainId !== CHAIN_ID) {
        signOut();
      }
      // Metamask recommend reloading the page, unless you must do otherwise.
      // window.location.reload();
    });

    walletProvider.on('accountsChanged', (_accounts) => {
      accounts.value = _accounts as string[];
      account0.value = accounts.value[0];
    });

    return { _result: 0, accounts, chainId };
  };

  const signOut = async () => {
    accounts.value = [];
    account0.value = '';

    user.value = defaultUser();
    return { _result: 0 };
  };

  return {
    user,
    accounts,
    account0,
    chainId,
    signIn,
    signOut,
  };
});
