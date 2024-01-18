<template>
  <NSpace vertical align="center" :wrap-item="false" :size="[0, 16]">
    <NCard title="ICP Transfer" style="width: 600px">
      <NButton @click="onPressApprove">Approve EMC</NButton>
    </NCard>
  </NSpace>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, watch, computed } from 'vue';
import { NSpace, NCard, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui';
import { ApiManager } from '@/web3/api';

import { getDefaultNetwork } from '@/web3/network';
import { ERC20Api } from '@/web3/api/erc20';

const apiManager = ApiManager.getInstance();
const networkConfig = getDefaultNetwork();
const contract = networkConfig.tokens.emc.contract;
const nodeStakeContract = networkConfig.smarts.nodeStake.contract;
const erc20Api = apiManager.create(ERC20Api, { address: contract });

async function onPressApprove() {
  const { _result, data: tx } = await erc20Api.approve({ amount: BigInt(1 * 1e18), spender: nodeStakeContract });
  console.info('tx >>');
  await tx.wait();
  console.info('tx <<');
}
</script>

<style scoped></style>
