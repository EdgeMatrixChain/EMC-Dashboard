<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {} from 'naive-ui';
import Icon from './icons/token-maket-cap.png';
import NumericBasic from './basic.vue';
import { getDefaultNetwork } from '@/web3/network';
import { ApiManager } from '@/web3/api';
import { ERC20Api } from '@/web3/api/erc20';
import { ethers } from 'ethers';
import { formatNumber, formatMillion, toFixedClip } from './format-number';
import { getDexData } from './apis';

const title = ref('Market Cap');
const value = ref('');
const unit = ref('');
const tips = ref('');
const loading = ref(false);

const networkConfig = getDefaultNetwork();
const tokenContract = networkConfig.tokens.emc.contract;
const tokenDecimal = networkConfig.tokens.emc.decimal;
const apiManager = ApiManager.getInstance();
const tokenApi = apiManager.create<ERC20Api>(ERC20Api, { address: tokenContract });

const addresses = [
  { type: 'wallet', address: '0x35626b7bf11c570837d8832ad5b00080b5ff076f' }, //(Ecosystem: Node, Developer, Transaction, 45%)
  { type: 'contract', address: '0xd20c8f4e0f3f21eb29cff00667e2763d8492791b' }, //(Founding Team 15% & Foundation 10%) Vesting（team, one year ）
  { type: 'wallet', address: '0x5a5ae28b8d1a0e52ad69b3e1d8c9689add60dc34' }, //(VC)

  { type: 'wallet', address: '0xcA61a3E708E302CA451b70b7Fd9741D020f6850f' }, //VC
  { type: 'wallet', address: '0x953FC58F8ee092aa7B3f808bCF08fa26507F5a43' }, //Foundation
  
  // { type: 'wallet', address: '0x3b55346780d8fc4e6c2c31637f57b9e465192091' }, //Public Sale Remaining 8.56% (Strategic Sale, IDO in top CEX)
  // { type: 'wallet', address: '0x5ac326699e870ea3ac2c79a7758a743d62afac9d' }, //Foundation 5% (EdgeMatrix Parnter Validation Node Staking Token Lending)
  { type: 'contract', address: '0xbfbc3bf85fba818fc49a0354d2c84623ce711b63' }, //(Locking: Strategic from Public Sale, Node Staking, Part Airdrop) Vesting（personal no earnings）
  { type: 'contract', address: '0xb204c35048c73f03b69bd6163b3c2e88ce9daa00' }, //(Ecosystem Governance) Vesting（personal earnings
  { type: 'wallet', address: '0x2b5bdecaa08f7fd67d30347f273fb153f744e6f2' }, //(Part Airdrop)
];

const queryTotalLock = async () => {
  const results = await Promise.all(addresses.map((item) => tokenApi.balanceOf({ account: item.address })));
  let total = 0n;
  results.forEach((resp, i) => {
    const item = addresses[i];
    const v = resp.data || 0n;
    console.info(`${item.address} ---> ${ethers.formatUnits(v, tokenDecimal)}`);
    total += v;
  });
  return total;
};

const queryTotalSupply = async () => {
  const resp = await tokenApi.totalSupply();
  const totalSupply = (resp.data as bigint) || 0n;
  return totalSupply;
};

onMounted(async () => {
  loading.value = true;
  const [totalSupply, totalLock, { fdv, priceUsd }] = await Promise.all([queryTotalSupply(), queryTotalLock(), getDexData()]);
  loading.value = false;
  const circulation = totalSupply - totalLock;
  const circulationInt = ethers.formatUnits(circulation, tokenDecimal);
  const { value: _value, text, unit: _unit } = formatMillion(Number(circulationInt) * priceUsd);
  value.value = `$${_value}`;
  unit.value = _unit;
  tips.value = `Circulating supply: ${formatNumber(toFixedClip(circulationInt))}`;
});
</script>

<style scoped></style>
