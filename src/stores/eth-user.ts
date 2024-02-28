import { ref, watch, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { getDefaultNetwork } from '@/web3/network';
import { Web3Service } from '@/web3';
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount, useDisconnect } from '@web3modal/ethers/vue';
import { ApiManager } from '@/web3/api';
import { ERC20Api } from '@/web3/api/erc20';
import { Web3Utils } from '@/web3/utils';
import { ethers } from 'ethers';
import IconEMC from '@/assets/token/emc.white.png';
import IconUSDT from '@/assets/token/usdt.svg';

export type Token = { address: string; formatted: string; short: string; value: bigint; symbolName: string; decimal: number; icon: string; name: string };

type Tokens = {
  [k: string]: Token;
};

const BALANCE_NONE = '0.0';

function formatBalance(value: bigint, unit: number) {
  value = value || 0n;
  const formatted = ethers.formatUnits(value, unit);
  return {
    formatted: formatted,
    short: Web3Utils.shortAmount(formatted),
    value: value,
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

  //init balance metadata, exclude value.
  const initTokens = () => {
    const result: Tokens = {};
    const tokenIcons: any = { emc: IconEMC, usdt: IconUSDT };
    Object.entries(networkConfig.tokens).map(([k, tokenConfig]) => {
      const tokenIcon = tokenIcons[k];
      result[k] = {
        name: tokenConfig.name,
        address: tokenConfig.contract,
        decimal: tokenConfig.decimal,
        symbolName: tokenConfig.symbolName,
        icon: tokenIcon,
        formatted: BALANCE_NONE,
        short: BALANCE_NONE,
        value: 0n,
      };
    });
    return result;
  };

  const tokens = ref<Tokens>(initTokens());

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
    Object.entries(tokens.value).forEach(([k, v]) => {
      v.formatted = BALANCE_NONE;
      v.short = BALANCE_NONE;
      v.value = 0n;
    });
    await disconnect();

    return { _result: 0 };
  };

  const queryBalance = async (target: string, address: string) => {
    const api: null | ERC20Api = apiManager.create(ERC20Api, { address });
    const [{ data: _balance }, { data: _decimal }] = await Promise.all([api.balanceOf({ account: target }), api.decimals()]);
    const balance = _balance || 0n;
    const decimal = Number(_decimal) || 0;
    return formatBalance(balance, decimal);
  };

  const updateBalance = async (account: string) => {
    const _tokens = { ...tokens.value };
    const promises = Object.entries(tokens.value).map(async ([key, tokenConfig]) => {
      const data = await queryBalance(account, tokenConfig.address);
      return { key, data };
    });
    const balances = await Promise.all(promises);

    const result: any = {};
    balances.forEach((item) => {
      const key = item.key;
      const token = _tokens[key];
      result[key] = Object.assign({}, token, item.data);
    });
    tokens.value = result;
    return tokens.value;
  };

  return {
    isConnected,
    isInvalidNetwork: computed(() => chainId.value !== CHAIN_ID),
    isInvalidConnect: computed(() => !address.value || chainId.value !== CHAIN_ID),
    account0: computed(() => address.value || ''),
    chainId,
    tokens,
    signIn,
    signOut,
    updateBalance,
    switchNetwork: () => {
      w3s.switchNetwork(CHAIN_ID);
    },
  };
});
