<template>
  <template v-if="currentStaked > 0n">
    <NAlert class="mb-[4px]" title="Stake migration" type="info">
      <NSpace align="center" :wrap-item="false" :size="[8, 8]">
        <NText
          >We have noticed that you have staked {{ ethers.formatUnits(currentStaked, 18) }}EMC in the old contract. Please un-stake as soon as possible. After
          un-staking, there will be a 30-day lockup period. Once this period ends, please use the address {{ bindStakeAccount }} to claim your staked EMC.
          During this process, your staked amount will still be factored into the node reward calculation formula.</NText
        >
        <NButton type="primary" :loading="loading" @click="onPressUnstake">Unstake</NButton>
      </NSpace>
    </NAlert>
  </template>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { NSpace, NAlert, NText, NButton, NIcon, NGrid, NGridItem, NScrollbar, NSpin, NTabs, NTabPane, useMessage, useDialog } from 'naive-ui';
import { queryNodeOwner } from '@/apis';
import { useETHUserStore } from '@/stores/eth-user';
import { Web3Utils } from '@/web3/utils';
import { ApiManager } from '@/web3/api';
import { StakeNodeApi } from '@/web3/api/stake-node';
import { ethers } from 'ethers';
const props = defineProps({
  nodeId: { type: String, default: '' },
});
const message = useMessage();
const dialog = useDialog();
const ethUserStore = useETHUserStore();
const apiManager = ApiManager.getInstance();
const stakeNodeApi = apiManager.create(StakeNodeApi, { address: '0xC6C6d5ED9c407F0c9d83D13fA345c68C57a90cbD' });

const emits = defineEmits(['finish']);
const bindStakeAccount = ref<string>('');
const currentStaked = ref<bigint>(0n);
const loading = ref(false);

async function handleUnstake({ nodeId, account, amount }: { nodeId: string; account: string; amount: bigint }) {
  const resp = await stakeNodeApi.withdraw({ nodeId, account, amount });
  if (resp._result !== 0) {
    return resp;
  }
  await resp.data.wait();
  return resp;
}

async function onPressUnstake() {
  const nodeId = props.nodeId;
  const account = ethUserStore.account0;
  const amount = currentStaked.value;
  loading.value = true;
  const resp = await handleUnstake({ nodeId, account, amount });
  loading.value = false;
  if (resp._result !== 0) {
    message.warning(resp._desc || 'Unstake failed');
    return;
  }
  dialog.success({
    title: 'Successful',
    content: `After 30 days, use the address ${account} and click on the 'View Locks' button in the top right. Claim your staked EMC`,
    closable: false,
    closeOnEsc: false,
    maskClosable: false,
    positiveText: 'Close',
    onPositiveClick: () => {
      init();
    },
  });
}

async function queryStake(nodeId: string) {
  const { data: _stakeInfo } = await stakeNodeApi!.nodeInfo({ nodeId });
  const [_bindStakeAccount, _totalStaked, _currentStaked, _totalUnstaked] = _stakeInfo || [];
  return {
    bindStakeAccount: _bindStakeAccount || '',
    totalStaked: _totalStaked || 0n,
    currentStaked: _currentStaked || 0n,
    totalUnstaked: _totalUnstaked || 0n,
  };
}

async function init() {
  if (!props.nodeId) {
    return;
  }
  const resp = await queryStake(props.nodeId);
  bindStakeAccount.value = resp.bindStakeAccount;
  currentStaked.value = resp.currentStaked;
}

onMounted(() => {
  init();
});

watch(
  () => [ethUserStore.account0, ethUserStore.isInvalidNetwork],
  ([account, isInvalidNetwork]) => {
    if (account || !isInvalidNetwork) {
      init();
    }
  }
);
</script>
