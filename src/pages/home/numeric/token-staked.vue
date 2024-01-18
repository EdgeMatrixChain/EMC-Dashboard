<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Icon from './icons/token-supply.png';
import NumericBasic from './basic.vue';
import { formatNumber, toFixedClip } from './format-number';
import { getDefaultNetwork } from '@/web3/network';
import { ApiManager } from '@/web3/api';
import { ERC20Api } from '@/web3/api/erc20';
import { ethers } from 'ethers';

const title = ref('Total Stake');
const value = ref('');
const unit = ref('EMC');
const tips = ref('');
const loading = ref(false);
const networkConfig = getDefaultNetwork();
const tokenContract = networkConfig.tokens.emc.contract;
const tokenDecimal = networkConfig.tokens.emc.decimal;
const apiManager = ApiManager.getInstance();

const addresses = [
  { type: 'contract', address: '0xb204C35048C73F03b69Bd6163b3c2e88ce9dAa00' }, // Vesting（personal earnings）
  { type: 'contract', address: '0xbfbc3BF85FBA818fc49A0354D2C84623cE711b63' }, // Vesting（personal no earnings）
  { type: 'contract', address: '0xD20c8f4e0f3F21EB29cFF00667E2763D8492791B' }, // Vesting（team, one year ）
  { type: 'contract', address: '0xC6C6d5ED9c407F0c9d83D13fA345c68C57a90cbD' }, // node stake
];

const tokenApi = apiManager.create<ERC20Api>(ERC20Api, { address: tokenContract });
onMounted(async () => {
  loading.value = true;
  const results = await Promise.all(addresses.map((item) => tokenApi.balanceOf({ account: item.address })));
  loading.value = false;
  let amount = 0n;
  results.forEach((resp, i) => {
    const item = addresses[i];
    const v = resp.data || 0n;
    console.info(`${item.address} ---> ${ethers.formatUnits(v, tokenDecimal)}`);
    amount += v;
  });
  const formatted = ethers.formatUnits(amount, tokenDecimal);
  const _value = formatNumber(toFixedClip(formatted, 4));
  value.value = `${_value}`;
});
</script>
