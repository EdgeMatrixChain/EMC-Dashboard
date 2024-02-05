<template>
  <div class="page">
    <template v-if="error === -1">
      <NSpace align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
        <NSpin />
      </NSpace>
    </template>
    <template v-else-if="error > 0">
      <NSpace vertical align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
        <NText depth="3" style="font-size: 16px">{{ errorText }}</NText>
        <NButton size="large" strong @click="onPressTry">Try Again</NButton>
      </NSpace>
    </template>
    <template v-else>
      <NSpace vertical :wrap-item="false" align="center" :size="[16, 16]">
        <NCard title="Node Unstake" style="max-width: 880px">
          <template #header>
            <NSpace justify="space-between" :wrap-item="false" :size="[4, 4]">
              <NText>Node Unstake</NText>
              <NButton text tag="a" type="primary" icon-placement="right" @click="onPressExplorer(unstakeContract)">
                {{ Utils.formatAddress(unstakeContract, 6) }}
                <template #icon>
                  <NIcon size="18">
                    <IconLink />
                  </NIcon>
                </template>
              </NButton>
            </NSpace>
          </template>
          <NInput
            v-model:value="inputNodeId"
            size="large"
            :round="true"
            placeholder="NodeId"
            style="width: 100%; max-width: 880px; border-radius: 99px !important"
          >
            <template #suffix>
              <NButton type="primary" strong round @click="onPressSearch" style="background-color: var(--n-color)">
                <NIcon size="24">
                  <IconRefresh />
                </NIcon>
              </NButton>
            </template>
          </NInput>
        </NCard>
        <template v-if="currentLoading">
          <NSpace class="h-[300px]" vertical :wrap-item="false" align="center" justify="center" :size="[16, 16]">
            <NSpin></NSpin>
          </NSpace>
        </template>
        <template v-else-if="currentNodeId">
          <NCard title="Node Info" style="max-width: 880px">
            <template #header>
              <NSpace vertical justify="space-between" :wrap-item="false" :size="[4, 4]">
                <NText>{{ currentNodeId }}</NText>
              </NSpace>
            </template>
            <NSpace vertical justify="center" :wrap-item="false" :size="[16, 16]">
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="2" style="font-size: 14px">Bind Wallet</NText>
                <NText class="text-[18px]" strong>{{ bindStakeAccount }}</NText>
              </NSpace>
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="2" style="font-size: 14px">Total Staked</NText>
                <NText class="text-[18px]" strong>{{ ethers.formatUnits(totalStaked, 18) }} EMC</NText>
              </NSpace>
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="2" style="font-size: 14px">Total Unstaked</NText>
                <NText class="text-[18px]" strong>{{ ethers.formatUnits(totalUnstaked, 18) }} EMC</NText>
              </NSpace>
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="2" style="font-size: 14px">Current Staked</NText>
                <NText class="text-[18px]" strong>{{ ethers.formatUnits(currentStaked, 18) }} EMC</NText>
              </NSpace>
              <NSpace vertical align="center" justify="center" :wrap-item="false" :size="[16, 4]">
                <NButton class="w-full" type="primary" strong size="large" :loading="unstakeLoading" :disabled="status !== 0" round @click="onPressUnstake"
                  >Unstake</NButton
                >
                <template v-if="status === 1">
                  <span>Please switch wallet to {{ bindStakeAccount }} before unstake</span>
                </template>
                <template v-else-if="status === 2">
                  <span>Stake balance not enough</span>
                </template>
              </NSpace>
            </NSpace>
          </NCard>
        </template>
        <template v-else>
          <NSpace class="h-[300px]" vertical :wrap-item="false" align="center" justify="center" :size="[16, 16]">
            <span>Please enter a node id</span>
          </NSpace>
        </template>
      </NSpace>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { NSpace, NCard, NText, NInput, NButton, NIcon, NSpin, useMessage, useDialog } from 'naive-ui';
import { SearchSharp as IconRefresh, LinkOutline as IconLink } from '@vicons/ionicons5';
import { useRoute } from 'vue-router';
import { ApiManager } from '@/web3/api';
import { useETHUserStore } from '@/stores/eth-user';
import { StakeNodeDeprecatedApi } from '@/web3/api/stake-node-deprecated';
import { Utils } from '@/tools/utils';
import { Web3Utils } from '@/web3/utils';
import { ethers } from 'ethers';
const message = useMessage();
const dialog = useDialog();
const route = useRoute();
const ethUserStore = useETHUserStore();
const error = ref(-1);
const errorText = ref('');
const unstakeContract = ref('');
const inputNodeId = ref('');
const currentLoading = ref(false);
const unstakeLoading = ref(false);
const apiManager = ApiManager.getInstance();

let stakeNodeApi: StakeNodeDeprecatedApi | null = null;
const currentNodeId = ref<string>('');
const bindStakeAccount = ref<string>('');
const totalStaked = ref<bigint>(0n);
const currentStaked = ref<bigint>(0n);
const totalUnstaked = ref<bigint>(0n);
const status = computed(() => {
  if (bindStakeAccount.value && Web3Utils.eq(bindStakeAccount.value, ethUserStore.account0)) {
    if (currentStaked.value > 0n) {
      return 0;
    } else {
      return 2;
    }
  } else {
    return 1;
  }
});

onMounted(async () => {
  unstakeContract.value = '0xC6C6d5ED9c407F0c9d83D13fA345c68C57a90cbD';
  inputNodeId.value = (route.query.nodeId as string) || '';
  stakeNodeApi = apiManager.create(StakeNodeDeprecatedApi, { address: unstakeContract.value });
  error.value = -1;
  if (inputNodeId.value) {
    await init(inputNodeId.value);
  }
  error.value = 0;
});

const init = async (_nodeId: string) => {
  bindStakeAccount.value = '';
  totalStaked.value = 0n;
  currentStaked.value = 0n;
  totalUnstaked.value = 0n;
  currentNodeId.value = '';

  currentLoading.value = true;
  const [{ data: _stakeInfo }] = await Promise.all([stakeNodeApi!.nodeInfo({ nodeId: _nodeId })]);
  const [_bindStakeAccount, _totalStaked, _currentStaked, _totalUnstaked] = _stakeInfo || [];
  bindStakeAccount.value = _bindStakeAccount || '';
  totalStaked.value = _totalStaked || 0n;
  currentStaked.value = _currentStaked || 0n;
  totalUnstaked.value = _totalUnstaked || 0n;
  currentNodeId.value = _nodeId;
  currentLoading.value = false;
};

async function handleUnstake({ nodeId, account, amount }: { nodeId: string; account: string; amount: bigint }) {
  const resp = await stakeNodeApi!.withdraw({ nodeId, account, amount });
  if (resp._result !== 0) {
    return resp;
  }
  await resp.data.wait();
  return resp;
}

async function onPressUnstake() {
  const nodeId = currentNodeId.value;
  const account = ethUserStore.account0;
  if (!Web3Utils.eq(bindStakeAccount.value, ethUserStore.account0)) {
    message.warning(`Please switch wallet to ${bindStakeAccount.value}`);
    return;
  }
  const amount = currentStaked.value;
  unstakeLoading.value = true;
  const resp = await handleUnstake({ nodeId, account, amount });
  unstakeLoading.value = false;
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
      init(nodeId);
    },
  });
}

function onPressTry() {
  location.reload();
}
function onPressExplorer(contract: string) {
  window.open(`https://arbiscan.io/address/${contract}`);
}
function onPressSearch() {
  if (!inputNodeId.value) {
    message.error('Invalid value');
    return;
  }
  init(inputNodeId.value);
}
</script>

<style scoped>
.input-group {
  padding: 2px;
  border: solid 1px #e7e7e7;
  border-radius: 99px;
}
</style>
