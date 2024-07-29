<template>
  <NModal :show="visible" :block-scroll="false" :mask-closable="false">
    <NCard title="Change Owner" style="max-width: 640px">
      <template #header-extra>
        <NButton strong secondary circle :disabled="isLoading" @click.stop.prevent="onPressClose">
          <template #icon>
            <IconClose />
          </template>
        </NButton>
      </template>
      <NSpace vertical :wrap-item="false" :size="[0, 16]">
        <NSpace vertical :wrap-item="false" :size="[0, 4]">
          <NInput v-model:value="inputAddress" placeholder=" " size="large" style="border-radius: 8px; height: 56px; line-height: 56px"> </NInput>
        </NSpace>
        <NSpace vertical align="center" :wrap-item="false" :size="[0, 8]">
          <NButton type="primary" strong size="large" round :loading="isLoading" @click="onPressSubmit" style="width: 100%">Submit </NButton>
          <NText depth="3" style="font-size: 12px">Make sure that the owner you entered is working!</NText>
        </NSpace>
      </NSpace>
    </NCard>
  </NModal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NModal, NCard, NText, NInput, NSpace, NButton, NAlert, NIcon, useMessage } from 'naive-ui';
import { Close as IconClose } from '@vicons/ionicons5';
import { ethers } from 'ethers';
import { useETHUserStore } from '@/stores/eth-user';
import { Http } from '@/tools/http';
import { nodeBind } from '../bind-node';
import { ApiManager } from '@/web3/api';
import { StakeNodeApi } from '@/web3/api/stake-node';
import { Web3Service } from '@/web3';
import { getDefaultNetwork } from '@/web3/network';
import { useNodeService } from '../use-node-service';
export default defineComponent({
  name: 'change-register-address',
  components: { NModal, NCard, NText, NInput, NSpace, NButton, NAlert, NIcon, IconClose },
  props: {
    visible: { type: Boolean, default: false },
    nodeId: { type: String, default: false },
  },
  emits: ['update:visible', 'success'],
  setup(props, ctx) {
    const message = useMessage();
    const ethUserStore = useETHUserStore();
    const w3s = Web3Service.getInstance();
    const http = Http.getInstance();
    const nodeService = useNodeService();
    const apiManager = ApiManager.getInstance();
    const networkConfig = getDefaultNetwork();
    const stakeContract = networkConfig.smarts.nodeStake.contract;
    nodeService.setStakeNodeApi(apiManager.create(StakeNodeApi, { address: stakeContract }));
    const inputAddress = ref('');
    const isLoading = ref(false);
    return {
      inputAddress,
      isLoading,
      onPressClose() {
        ctx.emit('update:visible', false);
      },
      async onPressSubmit() {
        const owner = inputAddress.value;
        const chainId = ethUserStore.chainId as number;
        const nodeId = props.nodeId;
        if (!ethers.isAddress(owner)) {
          message.warning('Invalid wallet address');
          return;
        }
        isLoading.value = true;

        const stakeInfo = await nodeService.queryStake(nodeId);
        if (!stakeInfo) {
          isLoading.value = false;
          message.warning(`The stake information of ${nodeId} node cannot be queried`);
          return;
        }
        if (stakeInfo.currentStaked > 0n) {
          isLoading.value = false;
          message.warning('The stake amount is not 0, please ensure that the stake amount is cleared first.');
          return;
        }
        const resp = await nodeBind({ account: owner, chainId, nodeId });
        isLoading.value = false;
        if (resp._result !== 0) {
          message.warning(resp._desc);
          return;
        }
        ctx.emit('success', owner);
      },
    };
  },
});
</script>

<style scoped></style>
