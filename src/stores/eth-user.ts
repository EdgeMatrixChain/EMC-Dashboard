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

export type Tokens = {
  [k: string]: Token;
};

export const useETHUserStore = defineStore('ethuser', () => {
  const networkConfig = getDefaultNetwork();
  const CHAIN_ID = networkConfig.chainId;
  const w3s = Web3Service.getInstance();
  const apiManager = ApiManager.getInstance();

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
        formatted: '0.0',
        short: '0.0',
        value: 0n,
      };
    });
    return result;
  };

  const isConnected = ref(false);
  const chainId = ref(0);
  const account0 = ref('');
  const isInvalidNetwork = computed(() => chainId.value !== CHAIN_ID);
  const isInvalidConnect = computed(() => !account0.value || chainId.value !== CHAIN_ID);
  const tokens = ref<Tokens>(initTokens());

  const signIn = () => {};

  const signOut: () => Promise<{ _result: number }> = async () => {
    return { _result: 0 };
  };

  const queryBalance = async (target: string, address: string) => {
    const api: null | ERC20Api = apiManager.create(ERC20Api, { address });
    const [{ data: _balance }, { data: _decimal }] = await Promise.all([api.balanceOf({ account: target }), api.decimals()]);
    const balance = _balance || 0n;
    const decimal = Number(_decimal) || 0;

    const formatted = ethers.formatUnits(balance, decimal);
    return {
      formatted: formatted,
      short: Web3Utils.shortAmount(formatted),
      value: balance,
    };
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

  const resetBalance = () => {
    Object.entries(tokens.value).forEach(([k, v]) => {
      v.formatted = '0.0';
      v.short = '0.0';
      v.value = 0n;
    });
  };

  return {
    isConnected,
    isInvalidNetwork,
    isInvalidConnect,
    account0,
    chainId,
    tokens,
    signIn,
    signOut,
    updateBalance,
    resetBalance,
    switchNetwork: () => {
      w3s.switchNetwork(CHAIN_ID);
    },
  };
});
