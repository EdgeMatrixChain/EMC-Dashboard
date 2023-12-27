import { ref, watch, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { getDefaultNetwork } from '@/web3/network';
import { Web3Service } from '@/web3';
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount, useWeb3ModalEvents, useDisconnect } from '@web3modal/ethers/vue';
import { ApiManager } from '@/web3/api';
import { ERC20Api } from '@/web3/api/erc20';
import { ethers } from 'ethers';

type Balance = { [k: string]: { formatted: string; short: string; value: bigint } };
const BALANCE_NONE = '';
function formatBalance(value: bigint, unit: number) {
  const formatted = ethers.formatUnits(value, unit);
  const matches = formatted.match(/^\d+(?:\.\d{0,4})?/);
  return {
    formatted: formatted,
    short: (matches && matches[0]) || '0.0',
    value: value,
  };
}
export const useETHUserStore = defineStore('ethuser', () => {
  const CHAIN_ID = getDefaultNetwork().chainId;
  const w3s = Web3Service.getInstance();
  const apiManager = ApiManager.getInstance();

  const wcModal = useWeb3Modal();
  const { isConnected, address, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { disconnect } = useDisconnect();

  const account0 = computed(() => address.value || '');
  const balance = ref<Balance>({ emc: { formatted: BALANCE_NONE, short: BALANCE_NONE, value: 0n } });
  watch(
    () => isConnected.value,
    async (isConnected) => {
      console.info('watch isConnected', isConnected);
      if (!isConnected) {
        w3s.setProvider(null);
        return;
      }
      if (!walletProvider.value) {
        console.error('Not found provider');
        return;
      }

      w3s.setProvider(walletProvider.value);

      const { chainId } = await w3s.getChainId();

      if (chainId !== CHAIN_ID) {
        const resp = await w3s.switchNetwork(CHAIN_ID);
        if (resp._result !== 0) {
          signOut();
          return;
        }
      }

      updateBalance();
    },
    { immediate: true }
  );

  watch(
    () => chainId.value,
    async (chainId) => {
      console.info('watch chainId', chainId);
      if (!chainId) return;
      if (chainId !== CHAIN_ID) {
        const resp = await w3s.switchNetwork(CHAIN_ID);
        if (resp._result !== 0) {
          console.error(`switch network error`, resp);
          signOut();
        }
      }
    }
  );

  watch(
    () => address.value,
    (account) => {
      console.info('watch account', account);
    }
  );

  const signIn = async () => {
    wcModal.open({ view: 'Connect' });
  };

  const signOut = async () => {
    Object.entries(balance.value).forEach(([k, v]) => {
      v.formatted = BALANCE_NONE;
      v.short = BALANCE_NONE;
      v.value = 0n;
    });
    await disconnect();

    return { _result: 0 };
  };

  const updateBalance = async () => {
    //emc contract
    const contract = '0xDFB8BE6F8c87f74295A87de951974362CedCFA30';
    const erc20Api: null | ERC20Api = apiManager.create(ERC20Api, { address: contract });
    const { data: emc = 0n } = await erc20Api.balanceOf({ account: account0.value });
    balance.value = { emc: formatBalance(emc, 18) };
  };
  return {
    isConnected,
    account0,
    balance,
    chainId,
    signIn,
    signOut,
    updateBalance,
  };
});
