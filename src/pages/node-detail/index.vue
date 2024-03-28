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
        <template v-if="status === 1">
          <NAlert class="mb-[4px]" title="Warning" type="warning">
            <NSpace align="center" :wrap-item="false" :size="[8, 8]">
              <NText>Nodes need to be bound before stake</NText>
              <NButton type="warning" strong size="small" :loading="loadings.bind" @click="onPressBind" style="background-color: var(--n-color); width: auto"
                >Bind</NButton
              >
            </NSpace>
          </NAlert>
        </template>
        <template v-else-if="status === 2">
          <AlertSyncOwner :node-id="nodeInfo.nodeId" :bind-stake-account="nodeInfo.bindStakeAccount" @finish="onSyncOwnerFinish" />
        </template>
        <template v-if="status === 0 || status === 1 || status === 2">
          <AlertUnstake :node-id="nodeInfo.nodeId" />
        </template>
        <div class="leading-normal mb-[4px] whitespace-nowrap text-ellipsis overflow-hidden">
          <NText class="header-text text-[20px] mr-[8px]">Node</NText>
          <NText class="header-text text-[14px]">{{ nodeInfo.nodeId }}</NText>
        </div>

        <NGrid x-gap="24" y-gap="16" cols="1 1000:2" item-responsive>
          <NGridItem>
            <div class="main-table" style="border-left-color: #8f7df8">
              <LabelWithValue>
                <template #label>
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Running Time</NText>
                </template>
                <template #value>
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.runTime }}</NText>
                </template>
              </LabelWithValue>
              <LabelWithValue>
                <template #label>
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Startup Time</NText>
                </template>
                <template #value>
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.startupTime }}</NText>
                </template>
              </LabelWithValue>
              <LabelWithValue>
                <template #label>
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Owner</NText>
                </template>
                <template #value>
                  <div class="flex-1 w-[0] whitespace-nowrap text-ellipsis overflow-hidden">
                    <template v-if="status === 0 || status === 1 || status === 2">
                      <NText class="text-[14px] xl:text-[16px]"> {{ nodeInfo.principal || '--' }}</NText>
                    </template>
                    <template v-else>
                      <NText class="text-[14px] xl:text-[16px]"> {{ nodeInfo.principal ? Utils.textOverflow(nodeInfo.principal) : '--' }}</NText>
                    </template>
                  </div>
                  <template v-if="status === 0">
                    <NButton strong secondary circle @click.stop.prevent="onPressChangeOwner">
                      <template #icon>
                        <NIcon size="18">
                          <IconEdit />
                        </NIcon>
                      </template>
                    </NButton>
                  </template>
                </template>
              </LabelWithValue>

              <LabelWithValue>
                <template #label>
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Reward</NText>
                </template>
                <template #value>
                  <NSpace class="flex-1 w-[0]" align="center" :wrap-item="false" :size="[4, 0]">
                    <NText class="text-[14px] xl:text-[16px]">{{ toFixedClip(ethers.formatUnits(nodeInfo.currentReward || 0n, 18), 6) }} EMC </NText>
                    <NTooltip trigger="hover">
                      <template #trigger>
                        <NIcon size="16" color="#f2d6ff"><IconTips /></NIcon>
                      </template>
                      <div>
                        <p>Min Claim: 100EMC</p>
                      </div>
                    </NTooltip>
                  </NSpace>
                  <template v-if="status === 0">
                    <NButton
                      type="primary"
                      strong
                      size="small"
                      round
                      :loading="loadings.checkout"
                      @click="onPressClaim"
                      :disabled="!nodeInfo.currentReward || nodeInfo.currentReward < minClaimReward"
                      style="background-color: var(--n-color); width: auto"
                      >Claim
                    </NButton>
                  </template>
                </template>
              </LabelWithValue>

              <LabelWithValue>
                <template #label>
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Staked</NText>
                </template>
                <template #value>
                  <NSpace class="flex-1 w-[0]" align="center" :wrap-item="false" :size="[4, 0]">
                    <NText class="text-[14px] xl:text-[16px]">{{ ethers.formatUnits(nodeInfo.currentStaked || 0n, 18) }} EMC </NText>
                    <NTooltip trigger="hover">
                      <template #trigger>
                        <NIcon size="16" color="#f2d6ff"><IconTips /></NIcon>
                      </template>
                      <div>
                        <p>Maximum limit: {{ ethers.formatUnits(nodeInfo.maxStakeAmount || 0n, 18) }}EMC</p>
                      </div>
                    </NTooltip>
                  </NSpace>
                  <template v-if="status === 0">
                    <NSpace align="center" :wrap-item="false" :size="[8, 4]">
                      <NButton type="primary" strong size="small" round :loading="loadings.stake" @click="onPressStake" style="width: 80px">Stake</NButton>
                      <NButton
                        type="primary"
                        strong
                        size="small"
                        round
                        :loading="loadings.unstake"
                        :disabled="nodeInfo.currentStaked === 0n || !nodeInfo.currentStaked"
                        @click="onPressUnstake"
                        style="width: 80px"
                        >Unstake</NButton
                      >
                    </NSpace>
                  </template>
                </template>
              </LabelWithValue>
            </div>
          </NGridItem>
          <NGridItem>
            <div class="main-table" style="border-left-color: #5554fe">
              <LabelWithValue>
                <template #label>
                  <NText class="text-[14px] xl:text-[16px]" depth="3">CPU</NText>
                </template>
                <template #value>
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.cpuName }}</NText>
                </template>
              </LabelWithValue>
              <LabelWithValue>
                <template #label>
                  <NText class="text-[14px] xl:text-[16px]" depth="3">GPU</NText>
                </template>
                <template #value>
                  <NScrollbar x-scrollable style="flex: 1; width: 0" content-style="height:100%;">
                    <NSpace class="h-full" align="center" :wrap="false" :wrap-item="false" :size="[8, 0]">
                      <template v-for="item in nodeInfo.gpus">
                        <GpuItem :item="item" />
                      </template>
                    </NSpace>
                  </NScrollbar>
                </template>
              </LabelWithValue>
              <LabelWithValue>
                <template #label>
                  <NText class="text-[14px] xl:text-[16px]" depth="3">Mac Address</NText>
                </template>
                <template #value>
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.macAddr }}</NText>
                </template>
              </LabelWithValue>

              <LabelWithValue>
                <template #label>
                  <NText class="text-[14px] xl:text-[16px]" depth="3">IP Address</NText>
                </template>
                <template #value>
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.ipAddr }}</NText>
                </template>
              </LabelWithValue>

              <LabelWithValue>
                <template #label>
                  <NText class="text-[14px] xl:text-[16px]" depth="3">RAM</NText>
                </template>
                <template #value>
                  <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.memoryInfo }}</NText>
                </template>
              </LabelWithValue>
            </div>
          </NGridItem>
        </NGrid>

        <NTabs default-value="apis">
          <NTabPane name="apis" tab="Api transactions">
            <template v-if="nodeInfo.nodeId">
              <ApiTransactions :node-id="nodeInfo.nodeId" />
            </template>
          </NTabPane>
          <template v-if="status === 0">
            <NTabPane name="claims" tab="Reward claims">
              <RewardClaims :node-id="nodeInfo.nodeId" />
            </NTabPane>
          </template>
        </NTabs>
        <template v-if="status === 0 || status === 1">
          <ModalChangeOwner v-model:visible="isVisibleChangePrincipal" :node-id="nodeInfo.nodeId" @success="onChangeOwnerSuccess" />
        </template>
        <template v-if="status === 0">
          <ModalStake
            v-model:visible="isVisibleStake"
            :stake-contract="stakeContract"
            :token-contract="tokenContract"
            :node-id="nodeInfo.nodeId"
            :node-status="nodeInfo.status"
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
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { NSpace, NAlert, NText, NButton, NIcon, NGrid, NGridItem, NScrollbar, NSpin, NTabs, NTabPane, NTooltip, useMessage, useDialog } from 'naive-ui';
import { PencilSharp as IconEdit, InformationCircleOutline as IconTips } from '@vicons/ionicons5';
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

import { nodeBind } from './bind-node';

import AlertSyncOwner from './alert-sync-owner.vue';
import AlertUnstake from './alert-unstake.vue';

import ApiTransactions from './api-transactions/index.vue';
import RewardClaims from './reward-claims/index.vue';

import ModalChangeOwner from './change-owner/index.vue';
import ModalStake from './stake/index.vue';
import ModalUnstake from './unstake/index.vue';
import ModalTips from './tips/index.vue';

import GpuItem from './gpu.vue';

import { queryNodeOwner, queryReward } from '@/apis';

import { useNodeService } from './use-node-service';
import { toFixedClip } from '@/tools/format-number';

import LabelWithValue from './label-with-value.vue';

const route = useRoute();
const message = useMessage();
const dialog = useDialog();

const http = Http.getInstance();
const apiManager = ApiManager.getInstance();

const w3s = Web3Service.getInstance();
const ethUserStore = useETHUserStore();
const nodeService = useNodeService();
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
const minClaimReward = ref(BigInt(100 * 1e18));
const nodeRewardTimerConfig = {
  interval: 15000,
  stop: false,
};
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
      return 2; // owner not same
    } else {
      return 0; // Stake、Unstake、Change binding
    }
  }
});

function parseGpuInfo(input: string) {
  const matches = input.match(/\b(\w+)\s*:\s*'([^']*)'/g);
  if (!matches) {
    return null;
  }
  const result: any = {};
  matches.forEach((match) => {
    const keyValue = match.split(':');
    const key = keyValue[0].trim();
    const value = keyValue[1].trim().replace(/'/g, '');
    result[key] = value;
  });
  return result;
}

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
  type GpuInfo = { gpuMemory: string; gpuModel: string };
  const gpuInfo = (Utils.parseJSON(node.gpuInfo) || []) as Array<GpuInfo> | any;

  const gpus: any[] = [];
  if (Array.isArray(gpuInfo)) {
    gpus.push(...gpuInfo);
  } else {
    (gpuInfo.graphics_card || []).forEach((info: any) => {
      const gpuInfo = parseGpuInfo(info);
      if (gpuInfo) {
        const driver = gpuInfo.driver ? gpuInfo.driver.toLocaleUpperCase() + ' ' : '';
        gpus.push({ gpuMemory: '', gpuModel: `${driver}${gpuInfo.product}` });
      }
    });
  }

  const ipInfo = node.ipInfo || {};
  const ipAddr = ipInfo.ipAddr || '-';
  const memory = Utils.parseJSON(node.memoryInfo) || {};
  const memoryTotal = Math.round(memory.total / Math.pow(1024, 3));
  const memoryUsedPercent = Utils.toFixed(Number(memory.used_percent));
  const memoryInfo = memoryTotal ? `${memoryTotal}GB ${memoryUsedPercent}%` : '-';
  const application = node.appOrigin || '-';
  const status = node.status;

  const metadata = nodeService.getNodeMetadata(status);
  const maxStakeAmount = metadata ? metadata.maxStakeAmount : 0n;

  return { nodeId, startupTime, runTime, cpuName, gpus, macAddr, ipAddr, memoryInfo, application, status, maxStakeAmount };
}

async function handleNodeRewardTimer() {
  const before = new Date().getTime();
  const { currentReward } = await queryReward(nodeId);
  const end = new Date().getTime();
  nodeInfo.value.currentReward = currentReward;
  const diff = nodeRewardTimerConfig.interval - (end - before);
  if (diff > 0) {
    // console.info(`wait ${diff} ms`);
    await new Promise((resolve) => setTimeout(resolve, diff));
  }
  if (!nodeRewardTimerConfig.stop) {
    handleNodeRewardTimer();
  }
}

const init = async (nodeId: string) => {
  error.value = -1;

  if (!nodeId) {
    error.value = 1;
    errorText.value = 'Invalid node id';
    return;
  }

  const [_nodeInfo, { principal }, _stakeInfo, { currentReward }] = await Promise.all([
    queryInfo(nodeId),
    queryNodeOwner(nodeId),
    nodeService.queryStake(nodeId),
    queryReward(nodeId),
  ]);
  const bindStakeAccount = (_stakeInfo && _stakeInfo.bindStakeAccount) || '';
  const currentStaked = (_stakeInfo && _stakeInfo.currentStaked) || 0n;

  nodeInfo.value = {
    ..._nodeInfo,
    principal,
    bindStakeAccount,
    currentStaked,
    currentReward,
  };
  setTimeout(() => handleNodeRewardTimer(), 3000);
  error.value = 0;
};

const handleBind = async () => {
  const account = ethUserStore.account0;
  const nodeId = nodeInfo.value.nodeId;
  const chainId = ethUserStore.chainId as number;
  loadings.value.bind = true;
  const resp = await nodeBind({ account, chainId, nodeId });
  loadings.value.bind = false;
  if (resp._result !== 0) {
    message.warning(resp._desc);
    return;
  }
  tipsType.value = 'success';
  tipsTitle.value = 'Bind node success';
  tipsMessage.value = `bind ${account} to ${nodeId}`;
  isVisibleTips.value = true;
  init(nodeId);
};

const preClaimReward = async (params: { amount: string; nodeId: string; chainId: number }) => {
  const nodeId = params.nodeId;
  const amount = params.amount;
  const chainId = params.chainId;
  const signatureRaw = `${nodeId} claim reward`;
  const resp1 = await w3s.signMessage(signatureRaw);
  if (resp1._result !== 0) {
    if (resp1.err && resp1.err.code === 'ACTION_REJECTED') {
      return { _result: 2, _desc: 'Message signature cancel' };
    }
    return resp1;
  }
  if (!resp1.data) {
    return { _result: 1, _desc: 'Message signature failed' };
  }
  const signature = resp1.data.signature;
  return http.postJSON({
    url: '/nodebill/preclaim',
    data: { nodeId, amount, chainId, signature, signatureRaw },
    noAutoHint: true,
  });
};

const claimReward = async (params: { amount: bigint; account: string; nodeId: string; nonce: string; signature: string }) => {
  const resp = await stakeNodeApi!.claimWithSignature(params);
  if (resp._result !== 0) {
    return resp;
  }
  await resp.data.wait();
  return resp;
};

type DialogOption = {
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => Promise<any>;
};

const handleDialog = (option: DialogOption): Promise<{ type: string; data?: Resp }> => {
  return new Promise((resolve) => {
    const d = dialog.warning({
      title: option.title,
      content: option.content,
      positiveText: option.confirmText,
      negativeText: option.cancelText,
      positiveButtonProps: { type: 'primary' },
      closable: false,
      maskClosable: false,
      onPositiveClick: async () => {
        d.loading = true;
        const resp = await option.onConfirm();
        d.loading = false;
        d.destroy();
        resolve({ type: 'confirm', data: resp });
        return false;
      },
      onNegativeClick: () => {
        resolve({ type: 'cancel' });
      },
    });
  });
};

const handleClaimReward = async (params: { amount: bigint; nodeId: string; chainId: number }) => {
  const nodeId = params.nodeId;
  const amount = params.amount;
  const chainId = params.chainId;
  const resp = await preClaimReward({ amount: amount.toString(), nodeId, chainId });
  if (resp._result !== 0 && resp._result !== 11) {
    return resp;
  }
  const data = resp.data || {};
  const sign = data.sign;
  const nonce = data.nonce;
  const owner = data.owner;
  if (!sign || !nonce || !owner) {
    return { _result: 1, _desc: 'Claim error' };
  }

  let claimResp: any = null;
  if (resp._result === 11) {
    const historyAmount = data.amount || '0';
    const amount = BigInt(historyAmount);
    const dialogResp = await handleDialog({
      title: 'Tips',
      content: `You have an unfinished claim amounting to ${ethers.formatUnits(amount, 18)}EMC. This operation will prioritize completing this claim.`,
      confirmText: 'Continue',
      cancelText: 'Cancel',
      onConfirm: () => claimReward({ amount, account: owner, nodeId, nonce, signature: sign }),
    });
    if (dialogResp.type === 'cancel') {
      return { _result: 3, _desc: 'Claim cancel' };
    } else {
      claimResp = dialogResp.data;
    }
  } else {
    claimResp = await claimReward({ amount, account: owner, nodeId, nonce, signature: sign });
  }
  if (claimResp._result !== 0) {
    if (claimResp.err && claimResp.err.code === 'ACTION_REJECTED') {
      return { _result: 3, _desc: 'Claim cancel' };
    } else {
      //ClaimWithSignature: balance of tokens is not enough
      const message = claimResp.err && claimResp.err.reason ? claimResp.err.reason : 'ClaimWithSignature: unknow error';
      if (!claimResp.err || !claimResp.err.reason) {
        console.info(claimResp);
      }
      return { _result: 2, _desc: `${message}` };
    }
  }
  return { _result: 0, _desc: 'Claim success' };
};

function onSyncOwnerFinish() {
  init(nodeId);
}

function onPressBind() {
  handleBind();
}

async function onPressClaim() {
  // tipsType.value = 'info';
  // tipsTitle.value = 'Check out';
  // tipsMessage.value = `The reward contract is currently being audited by Certik, and the withdrawal operation will be officially available after the audit is completed.`;
  // isVisibleTips.value = true;
  if (nodeInfo.value.currentReward === 0n || !nodeInfo.value.currentReward) return;
  const nodeId = nodeInfo.value.nodeId;
  const amount = nodeInfo.value.currentReward;
  const chainId = ethUserStore.chainId as number;
  if (typeof chainId !== 'number') return;

  loadings.value.checkout = true;
  const resp = await handleClaimReward({ nodeId, amount, chainId });
  loadings.value.checkout = false;
  if (resp._result !== 0) {
    message.warning(resp._desc);
    if (resp._result === 2) {
      init(nodeId);
    }
    return;
  }
  init(nodeId);
  tipsType.value = 'success';
  tipsTitle.value = 'Claim success';
  tipsMessage.value = `Received ${ethers.formatUnits(amount, 18)} $EMC`;
  isVisibleTips.value = true;
  loadings.value.checkout = false;
}

function onPressChangeOwner() {
  isVisibleChangePrincipal.value = true;
}

function onChangeOwnerSuccess(inputAddress: string) {
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
  nodeService.setStakeNodeApi(stakeNodeApi);
  const { data: _tokenContract } = await stakeNodeApi!.token();
  tokenContract.value = _tokenContract || '';
  nodeRewardTimerConfig.stop = false;
  await init(nodeId);
});

onUnmounted(() => {
  nodeRewardTimerConfig.stop = true;
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
