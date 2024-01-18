<template>
  <div class="page max-w-[1440px]" style="margin: auto">
    <template v-if="error === -1">
      <NSpace align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
        <NSpin />
      </NSpace>
    </template>
    <template v-else-if="error > 0">
      <NSpace align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
        <NText>{{ errorText }}</NText>
      </NSpace>
    </template>
    <template v-else>
      <NSpace vertical :wrap-item="false">
        <template v-if="status === 1 || status === 2">
          <NAlert class="mb-[4px]" title="Warning" type="warning">
            <NSpace align="center" :wrap-item="false" :size="[8, 8]">
              <template v-if="status === 1">
                <NText>Nodes need to be bound before stake</NText>
                <NButton type="warning" strong size="small" :loading="loadings.bind" @click="onPressBind" style="background-color: var(--n-color); width: auto"
                  >Bind</NButton
                >
              </template>
              <template v-if="status === 2">
                <NText>Need to be rebind after change owner</NText>
                <NButton type="warning" strong size="small" :loading="loadings.bind" @click="onPressBind" style="background-color: var(--n-color); width: auto"
                  >Rebind</NButton
                >
              </template>
            </NSpace>
          </NAlert>
        </template>
        <div class="leading-normal mb-[4px]">
          <NText class="header-text text-[20px] mr-[8px]">Node</NText>
          <NText class="header-text text-[14px]">{{ nodeInfo.nodeId }}</NText>
        </div>
        <NGrid x-gap="48" y-gap="48" :cols="24" item-responsive>
          <NGridItem span="24 1000:12">
            <div class="main-table" style="border-left-color: #8f7df8">
              <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Running Time</NText>
                </NSpace>
                <NSpace class="flex-1" align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.runTime }}</NText>
                </NSpace>
              </NSpace>

              <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Startup Time</NText>
                </NSpace>
                <NSpace class="flex-1" align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.startupTime }}</NText>
                </NSpace>
              </NSpace>

              <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Owner</NText>
                </NSpace>
                <NSpace class="flex-1" align="center" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[12px] xl:text-[13px]"> {{ nodeInfo.principal || '--' }}</NText>
                  <template v-if="status === 0 || status === 1 || status === 2">
                    <NButton strong secondary circle @click.stop.prevent="onPressChangeOwner">
                      <template #icon>
                        <NIcon size="18">
                          <IconEdit />
                        </NIcon>
                      </template>
                    </NButton>
                  </template>
                </NSpace>
              </NSpace>

              <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Reward</NText>
                </NSpace>
                <NSpace class="flex-1" align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]">{{ ethers.formatUnits(nodeInfo.currentReward || 0n, 18) }} EMC </NText>
                  <template v-if="status === 0">
                    <NButton
                      type="primary"
                      strong
                      size="small"
                      round
                      :loading="loadings.checkout"
                      @click="onPressCheckout"
                      :disabled="nodeInfo.currentReward === 0n || !nodeInfo.currentReward"
                      style="background-color: var(--n-color); width: auto"
                      >Check out rewards
                    </NButton>
                  </template>
                </NSpace>
              </NSpace>

              <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Staked</NText>
                </NSpace>
                <NSpace class="flex-1" align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]">{{ ethers.formatUnits(nodeInfo.currentStaked || 0n, 18) }} EMC </NText>
                  <template v-if="status === 0">
                    <NSpace align="center" :wrap-item="false" :size="[8, 0]">
                      <NButton
                        type="primary"
                        strong
                        size="small"
                        round
                        :loading="loadings.stake"
                        @click="onPressStake"
                        style="background-color: var(--n-color); width: auto"
                        >Stake</NButton
                      >
                      <NButton
                        type="primary"
                        strong
                        size="small"
                        round
                        :loading="loadings.unstake"
                        :disabled="nodeInfo.currentStaked === 0n || !nodeInfo.currentStaked"
                        @click="onPressUnstake"
                        style="background-color: var(--n-color); width: auto"
                        >Unstake</NButton
                      >
                    </NSpace>
                  </template>
                </NSpace>
              </NSpace>
            </div>
          </NGridItem>
          <NGridItem span="24 1000:12">
            <div class="main-table" style="border-left-color: #5554fe">
              <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]" depth="3">CPU</NText>
                </NSpace>
                <NSpace class="flex-1" align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.cpuName }}</NText>
                </NSpace>
              </NSpace>
              <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]" depth="3">GPUs</NText>
                </NSpace>
                <NSpace class="flex-1" align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.gpus }}</NText>
                </NSpace>
              </NSpace>
              <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Mac Address</NText>
                </NSpace>
                <NSpace class="flex-1" align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.macAddr }}</NText>
                </NSpace>
              </NSpace>

              <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]" depth="3">IP Address</NText>
                </NSpace>
                <NSpace class="flex-1" align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.ipAddr }}</NText>
                </NSpace>
              </NSpace>

              <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Memory</NText>
                </NSpace>
                <NSpace class="flex-1" align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.memoryInfo }}</NText>
                </NSpace>
              </NSpace>
            </div>
          </NGridItem>
        </NGrid>
        <NTabs default-value="apis">
          <NTabPane name="apis" tab="Api transactions">
            <template v-if="nodeInfo.nodeId">
              <ApiTransactions :node-id="nodeInfo.nodeId" />
            </template>
          </NTabPane>
        </NTabs>
        <template v-if="status === 0 || status === 1 || status === 2">
          <ModalChangeOwner v-model:visible="isVisibleChangePrincipal" :node-id="nodeInfo.nodeId" @success="onChangePrincipalSuccess" />
        </template>
        <template v-if="status === 0">
          <ModalStake
            v-model:visible="isVisibleStake"
            :stake-contract="stakeContract"
            :token-contract="tokenContract"
            :node-id="nodeInfo.nodeId"
            @success="onStakeSuccess"
          />
          <ModalUnstake
            v-model:visible="isVisibleUnstake"
            :stake-contract="stakeContract"
            :token-contract="tokenContract"
            :node-id="nodeInfo.nodeId"
            @success="onUnstakeSuccess"
          />
        </template>
        <ModalTips v-model:visible="isVisibleTips" :type="tipsType" :title="tipsTitle" :message="tipsMessage" />
      </NSpace>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { NSpace, NAlert, NText, NButton, NIcon, NGrid, NGridItem, NSpin, NTabs, NTabPane, useMessage } from 'naive-ui';
import { PencilSharp as IconEdit } from '@vicons/ionicons5';
import moment from 'moment';
import { Utils } from '@/tools/utils';
import { Http } from '@/tools/http';
import { ethers } from 'ethers';
import { useETHUserStore } from '@/stores/eth-user';

import { Web3Utils } from '@/web3/utils';
import { ApiManager } from '@/web3/api';
import { StakeNodeApi } from '@/web3/api/stake-node';
import { Web3Service } from '@/web3';
import { getDefaultNetwork } from '@/web3/network';

import ApiTransactions from './api-transactions/index.vue';

import ModalChangeOwner from './change-owner/index.vue';
import ModalStake from './stake/index.vue';
import ModalUnstake from './unstake/index.vue';
import ModalTips from './tips/index.vue';

const route = useRoute();
const message = useMessage();

const http = Http.getInstance();
const apiManager = ApiManager.getInstance();

const w3s = Web3Service.getInstance();
const ethUserStore = useETHUserStore();

let stakeNodeApi: StakeNodeApi | null = null;
let nodeId = '';

const error = ref(-1);
const errorText = ref('');

const loadings = ref({
  bind: false,
  checkout: false,
  stake: false,
  unstake: false,
});

const stakeContract = ref('');
const tokenContract = ref('');

const nodeInfo = ref<any>({});

const isVisibleChangePrincipal = ref(false);
const isVisibleStake = ref(false);
const isVisibleUnstake = ref(false);
const isVisibleTips = ref(false);
const tipsType = ref<any>('success');
const tipsTitle = ref('');
const tipsMessage = ref('');

const status = computed(() => {
  if (!ethUserStore.account0) {
    return 11; // Not connected
  } else if (ethUserStore.isInvalidNetwork) {
    return 12; // Please switch to arbitrum one first
  } else if (!Web3Utils.eq(ethUserStore.account0, nodeInfo.value.principal)) {
    return 13; // No access privilege
  } else {
    if (!nodeInfo.value.bindStakeAccount || nodeInfo.value.bindStakeAccount === '0x0000000000000000000000000000000000000000') {
      return 1; // Node binding
    } else if (!Web3Utils.eq(nodeInfo.value.bindStakeAccount, nodeInfo.value.principal)) {
      return 2; // Update binding
    } else {
      return 0; // Stake、Unstake、Change binding
    }
  }
});

//query node info
async function queryInfo(_nodeId: string) {
  const resp = await http.get({
    url: '/node/info',
    data: { nodeid: _nodeId },
  });
  let node = resp.data || {};
  if (Object.keys(node).length === 0) {
    const resp = await http.get({ url: '/emcnetwork/info', data: { nodeid: _nodeId } });
    node = resp.data || {};
  }
  const nodeId = node._id;
  const startupTime = node.startupTime ? moment(node.startupTime).utc().format('MMMM DD HH:mm UTC YYYY') : '-';
  const runTime = node.runTime ? Utils.formatDate(node.runTime) : '-';
  const cpuInfo = Utils.parseJSON(node.cpuInfo) || {};
  const cpuName = cpuInfo.ModelName || '-';
  const macAddr = node.macAddr || '-';
  const gpuInfo = Utils.parseJSON(node.gpuInfo) || {};
  const gpus = gpuInfo.gpus || '-';
  const ipInfo = node.ipInfo || {};
  const ipAddr = ipInfo.ipAddr || '-';
  const memory = Utils.parseJSON(node.memoryInfo) || {};
  const memoryTotal = Math.round(memory.total / Math.pow(1024, 3));
  const memoryUsedPercent = Utils.toFixed(Number(memory.used_percent));
  const memoryInfo = memoryTotal ? `${memoryTotal}GB ${memoryUsedPercent}%` : '-';
  const application = node.appOrigin || '-';
  return { nodeId, startupTime, runTime, cpuName, gpus, macAddr, ipAddr, memoryInfo, application };
}

async function queryOwner(nodeId: string) {
  const resp = await http.get({
    url: '/nodesign/query',
    data: { nodeId },
  });
  const signInfo = resp.data || {};
  return {
    principal: signInfo.principal,
  };
}

async function queryStake(nodeId: string) {
  const { data: _stakeInfo } = await stakeNodeApi!.nodeInfo({ nodeId });
  const [_bindStakeAccount, _totalStaked, _currentStaked, _totalUnstaked] = _stakeInfo || [];
  return {
    bindStakeAccount: _bindStakeAccount || '', //contract bind wallet address
    totalStaked: _totalStaked || 0n,
    currentStaked: _currentStaked || 0n,
    totalUnstaked: _totalUnstaked || 0n,
  };
}

async function queryReward(nodeId: string) {
  const resp = await http.get({
    url: '/nodebill/summary',
    data: { nodeId: nodeId },
  });
  const data = resp.data || {};
  const totalReward = data.billTotal || 0;
  const totalClaim = data.withdrawTotal || 0;
  return {
    currentReward: BigInt(totalReward) - BigInt(totalClaim),
    totalReward: totalReward,
  };
}

const init = async (nodeId: string) => {
  error.value = -1;

  if (!nodeId) {
    error.value = 1;
    errorText.value = 'Invalid node id';
    return;
  }

  const [_nodeInfo, { principal }, { bindStakeAccount, currentStaked }, { currentReward }] = await Promise.all([
    queryInfo(nodeId),
    queryOwner(nodeId),
    queryStake(nodeId),
    queryReward(nodeId),
  ]);

  nodeInfo.value = {
    ..._nodeInfo,
    principal,
    bindStakeAccount,
    currentStaked,
    currentReward,
  };

  error.value = 0;
};

const preNodeBind = async (params: { account: string; nodeId: string }) => {
  const nodeId = params.nodeId;
  const signatureRaw = `Node bind ${nodeId}`;
  const resp1 = await w3s.signMessage(signatureRaw);
  if (resp1._result !== 0) {
    return resp1;
  }
  const signature = resp1.data!.signature;
  return http.postJSON({
    url: '/nodestake/bindsign',
    data: { nodeId, signatureRaw, signature },
    noAutoHint: true,
  });
};

const nodeBind = async (params: { account: string; nodeId: string }) => {
  const nodeId = params.nodeId;
  const resp = await preNodeBind(params);
  if (resp._result !== 0) return resp;
  const data = resp.data || {};
  const nonce = data.nonce;
  const signature = data.signature;
  return stakeNodeApi!.bindNode({ nodeId, nonce, signature });
};

const handleBind = async () => {
  const account = ethUserStore.account0;
  const nodeId = nodeInfo.value.nodeId;
  loadings.value.bind = true;
  const resp = await nodeBind({ account, nodeId });
  loadings.value.bind = false;
  if (resp._result !== 0) {
    message.warning(resp._desc);
    return;
  }
  loadings.value.bind = true;
  await new Promise((resolve) => setTimeout(resolve, 5000));
  loadings.value.bind = false;

  message.success('Successful, and the transaction may be delayed');
  init(nodeId);
};

const handleCheckoutReward = async (amount: bigint) => {
  loadings.value.checkout = true;
  const resp = await http.postJSON({
    url: '/nodebill/withdraw',
    data: { nodeId, amount: amount.toString() },
  });
  loadings.value.checkout = false;
  if (resp._result !== 0) {
    message.warning(resp._desc);
    return;
  }
  init(nodeId);
  tipsType.value = 'success';
  tipsTitle.value = 'Check out success';
  tipsMessage.value = `The amount of this check out ${ethers.formatUnits(amount, 18)} $EMC. You can click top-right "Claim node reward" for more information`;
  isVisibleTips.value = true;
};

function onPressBind() {
  handleBind();
}

function onPressCheckout() {
  tipsType.value = 'info';
  tipsTitle.value = 'Check out';
  tipsMessage.value = `The reward contract is currently being audited by Certik, and the withdrawal operation will be officially available after the audit is completed.`;
  isVisibleTips.value = true;
  // if (nodeInfo.value.currentReward === 0n || !nodeInfo.value.currentReward) return;
  // handleCheckoutReward(nodeInfo.value.currentReward);
}

function onPressChangeOwner() {
  isVisibleChangePrincipal.value = true;
}

function onChangePrincipalSuccess(inputAddress: string) {
  init(nodeId);
  isVisibleChangePrincipal.value = false;
  tipsType.value = 'success';
  tipsTitle.value = 'Change owner success';
  tipsMessage.value = `Need to switch to ${inputAddress} account to continue operation.`;
  isVisibleTips.value = true;
}

function onPressStake() {
  isVisibleStake.value = true;
}
function onStakeSuccess() {
  init(nodeId);
  isVisibleStake.value = false;
}

function onPressUnstake() {
  isVisibleUnstake.value = true;
}
function onUnstakeSuccess() {
  init(nodeId);
  isVisibleUnstake.value = false;
  tipsType.value = 'success';
  tipsTitle.value = 'Unstake success';
  tipsMessage.value = `$EMC have to wait 30 days for release. You can click top-right "Claim node reward" for more information.`;
  isVisibleTips.value = true;
}

onMounted(async () => {
  nodeId = route.params.id as string;
  const networkConfig = getDefaultNetwork();
  stakeContract.value = networkConfig.smarts.nodeStake.contract;
  stakeNodeApi = apiManager.create(StakeNodeApi, { address: stakeContract.value });
  const { data: _tokenContract } = await stakeNodeApi!.token();
  tokenContract.value = _tokenContract || '';
  await init(nodeId);
});
</script>

<style scoped>
.page {
  width: 100%;
}

.header-text {
  font-weight: 400;
  color: #fff;
  text-shadow: 0px 2px 8px #762db6;
}

.main-table {
  width: 100%;
  background-color: #1c2025;
  border-left: solid 4px #1c2025;
}

.main-table-item {
  height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid #2d343f;
}

.main-table-item:nth-last-child(1) {
  border-bottom: none;
}
</style>
