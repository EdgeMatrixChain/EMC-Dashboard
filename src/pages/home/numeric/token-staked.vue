<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Icon from './icons/token-supply.png';
import NumericBasic from './basic-simple.vue';
import { formatNumber, toFixedClip } from '@/tools/format-number';
import { getDefaultNetwork } from '@/web3/network';
import { ApiManager } from '@/web3/api';
import { ERC20Api } from '@/web3/api/erc20';
import { StakeApi } from '@/web3/api/stake';
import { StakeNodeApi } from '@/web3/api/stake-node';
import { ethers } from 'ethers';

const title = ref('Total Stake');
const value = ref('');
const unit = ref('EMC');
const tips = ref('');
const loading = ref(false);
const networkConfig = getDefaultNetwork();
const tokenContract = networkConfig.tokens.emc.contract;
const tokenDecimal = networkConfig.tokens.emc.decimal;
const nodeStakeContract = networkConfig.smarts.nodeStake.contract;
const apiManager = ApiManager.getInstance();
const tokenApi = apiManager.create<ERC20Api>(ERC20Api, { address: tokenContract });

const addresses = [
  {
    type: 'contract',
    address: '0xb204C35048C73F03b69Bd6163b3c2e88ce9dAa00',
    getBalance: async (address: string) => {
      const { data: _balance } = await tokenApi.balanceOf({ account: address });
      const balance = _balance || 0n
      const stakeApi = apiManager.create<StakeApi>(StakeApi, { address });
      const { data: _rewards } = await stakeApi.permanentTotal();
      const rewards = _rewards || 0n;
      const staked = balance - rewards;
      // console.info(`reward vesting balance --> ${ethers.formatUnits(balance, 18)}`);
      // console.info(`reward vesting rewards --> ${ethers.formatUnits(rewards, 18)}`);
      console.info(`reward vesting stake total --> ${ethers.formatUnits(staked, 18)}`);
      return { data: staked };
    },
  }, // Vesting（personal earnings）
  { type: 'contract', address: '0xbfbc3BF85FBA818fc49A0354D2C84623cE711b63' }, // Vesting（personal no earnings）
  { type: 'contract', address: '0xD20c8f4e0f3F21EB29cFF00667E2763D8492791B' }, // Vesting（team, one year ）
  { type: 'contract', address: '0xC6C6d5ED9c407F0c9d83D13fA345c68C57a90cbD' }, // node stake @deprecated
  {
    type: 'contract',
    address: nodeStakeContract,
    getBalance: async (address: string) => {
      const stakeNodeApi = apiManager.create<StakeNodeApi>(StakeNodeApi, { address });
      const { data: _staked } = await stakeNodeApi.tokenInPool();
      const staked = _staked || 0n;
      console.info(`node stake total --> ${ethers.formatUnits(staked, 18)}`);
      return { data: staked };
    },
  }, // node stake
];

onMounted(async () => {
  loading.value = true;
  const results = await Promise.all(addresses.map((item) => (item.getBalance ? item.getBalance(item.address) : tokenApi.balanceOf({ account: item.address }))));
  loading.value = false;
  let amount = 0n;
  results.forEach((resp, i) => {
    const item = addresses[i];
    const v = resp.data || 0n;
    // console.info(`${item.address} ---> ${ethers.formatUnits(v, tokenDecimal)}`);
    amount += v;
  });
  const formatted = ethers.formatUnits(amount, tokenDecimal);
  const _value = formatNumber(toFixedClip(formatted, 4));
  value.value = `${_value}`;
});
</script>
