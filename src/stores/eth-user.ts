import { ref, watch, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { getDefaultNetwork } from '@/web3/network';
import { Web3Service } from '@/web3';
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount, useDisconnect } from '@web3modal/ethers/vue';
import { ApiManager } from '@/web3/api';
import { ERC20Api } from '@/web3/api/erc20';
import { ethers } from 'ethers';

type Balance = { [k: string]: { formatted: string; short: string; value: bigint; symbolName: string } };
const BALANCE_NONE = '';

function formatBalance(value: bigint, unit: number, symbolName: string) {
  value = value || 0n;
  const formatted = ethers.formatUnits(value, unit);
  const matches = formatted.match(/^\d+(?:\.\d{0,4})?/);
  return {
    formatted: formatted,
    short: (matches && matches[0]) || '0.0',
    value: value,
    symbolName,
  };
}
export const useETHUserStore = defineStore('ethuser', () => {
  const networkConfig = getDefaultNetwork();
  const CHAIN_ID = networkConfig.chainId;
  const w3s = Web3Service.getInstance();
  const apiManager = ApiManager.getInstance();

  const wcModal = useWeb3Modal();
  const { isConnected, address, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { disconnect } = useDisconnect();

  const balance = ref<Balance>({
    emc: { formatted: BALANCE_NONE, short: BALANCE_NONE, value: 0n, symbolName: networkConfig.tokens.emc.symbolName },
  });

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
          console.error(`switch network error`, resp);
          signOut();
          return;
        }
      }
      if (address.value) {
        updateBalance(address.value);
      }
    },
    { immediate: true }
  );

  watch(
    () => address.value,
    (account) => {
      console.info('watch address', account);
      if (account) {
        updateBalance(account);
      }
    }
  );

  watch(
    () => chainId.value,
    async (chainId) => {
      if (chainId === CHAIN_ID) {
        if (address.value) {
          updateBalance(address.value);
        }
      }
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

  const updateBalance = async (account: string) => {
    //emc contract
    const emcTokenConfig = networkConfig.tokens.emc;
    const contract = emcTokenConfig.contract;
    const erc20Api: null | ERC20Api = apiManager.create(ERC20Api, { address: contract });
    const { data: emc } = await erc20Api.balanceOf({ account });
    balance.value = { emc: formatBalance(emc, emcTokenConfig.decimal, emcTokenConfig.symbolName) };
  };
  return {
    isConnected,
    isInvalidNetwork: computed(() => chainId.value !== CHAIN_ID),
    isInvalidConnect: computed(() => !address.value || chainId.value !== CHAIN_ID),
    account0: computed(() => address.value || ''),
    chainId,
    balance,
    signIn,
    signOut,
    updateBalance,
    switchNetwork: () => {
      w3s.switchNetwork(CHAIN_ID);
    },
  };
});
