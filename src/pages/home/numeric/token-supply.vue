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
import { ethers } from 'ethers';

const title = ref('Total Supply');
const value = ref('');
const unit = ref('EMC');
const tips = ref('');
const loading = ref(false);
const networkConfig = getDefaultNetwork();
const tokenContract = networkConfig.tokens.emc.contract;
const tokenDecimal = networkConfig.tokens.emc.decimal;
const apiManager = ApiManager.getInstance();
const tokenApi = apiManager.create<ERC20Api>(ERC20Api, { address: tokenContract });
onMounted(async () => {
  loading.value = true;
  const { data: amount } = await tokenApi.totalSupply();
  loading.value = false;
  const formatted = ethers.formatUnits(amount, tokenDecimal);
  const _value = formatNumber(toFixedClip(formatted, 4));
  value.value = `${_value}`;
});
</script>

<style scoped></style>
