<template>
  <div class="page">
    <template v-if="error === -1">
      <div class="page-empty">
        <NSpin />
      </div>
    </template>
    <template v-else-if="error > 0">
      <div class="page-empty">
        <span>{{ errorText }}</span>
      </div>
    </template>
    <template v-else>
      <div class="page-body">
        <template v-if="status === 1">
          <Alert title="Warning" type="warning" content="Nodes need to be bound before stake">
            <PrimaryButton @press="onPressBind">Bind</PrimaryButton>
          </Alert>
        </template>
        <template v-else-if="status === 2">
          <AlertSyncOwner :node-id="nodeInfo.nodeId" :bind-stake-account="nodeInfo.bindStakeAccount" @finish="onSyncOwnerFinish" />
        </template>

        <div class="node-info">
          <SectionHeader>Node Infomation</SectionHeader>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-[16px] sm:gap-[24px]">
            <div class="grid-cols-1">
              <div class="main-table" style="border-left-color: #8f7df8">
                <LabelWithValue>
                  <template #label>
                    <span class="info-item-label">Node ID</span>
                  </template>
                  <template #value>
                    <div class="flex-1 w-[0] whitespace-nowrap text-ellipsis overflow-hidden">
                      <span class="info-item-value">{{ nodeInfo.nodeId }}</span>
                    </div>
                  </template>
                </LabelWithValue>
                <LabelWithValue>
                  <template #label>
                    <span class="info-item-label">Update Time</span>
                  </template>
                  <template #value>
                    <span class="info-item-value">{{ nodeInfo.updateTime }}</span>
                  </template>
                </LabelWithValue>
                <LabelWithValue>
                  <template #label>
                    <span class="info-item-label">Owner</span>
                  </template>
                  <template #value>
                    <div class="flex-1 w-[0] whitespace-nowrap text-ellipsis overflow-hidden">
                      <template v-if="status === 0 || status === 1 || status === 2">
                        <span class="info-item-value"> {{ nodeInfo.principal || '--' }}</span>
                      </template>
                      <template v-else>
                        <span class="info-item-value"> {{ '*********' }}</span>
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
                <!-- <LabelWithValue>
                  <template #label>
                    <span class="info-item-label">Reward</span>
                  </template>
                  <template #value>
                    <NSpace class="flex-1 w-[0]" align="center" :wrap-item="false" :size="[4, 0]">
                      <span class="info-item-value">{{ toFixedClip(ethers.formatUnits(nodeInfo.currentReward || 0n, 18), 6) }} EMC </span>
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
                </LabelWithValue> -->

                <LabelWithValue>
                  <template #label>
                    <span class="info-item-label">Staked</span>
                  </template>
                  <template #value>
                    <NSpace class="flex-1 w-[0]" align="center" :wrap-item="false" :size="[4, 0]">
                      <span class="info-item-value">{{ ethers.formatUnits(nodeInfo.currentStaked || 0n, 18) }} EMC </span>
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
                <LabelWithValue>
                  <template #label>
                    <span class="info-item-label">Reward Pool</span>
                  </template>
                  <template #value>
                    <div class="info-item-pools">
                      <template v-for="item in nodeInfo.projects">
                        <span class="info-item-value">{{ item.name }}</span>
                      </template>
                    </div>
                  </template>
                </LabelWithValue>
              </div>
            </div>
            <div class="grid-cols-1">
              <div class="main-table" style="border-left-color: #5554fe">
                <LabelWithValue>
                  <template #label>
                    <span class="info-item-label">CPU</span>
                  </template>
                  <template #value>
                    <span class="info-item-value">{{ nodeInfo.cpuName }}</span>
                  </template>
                </LabelWithValue>
                <LabelWithValue>
                  <template #label>
                    <span class="info-item-label">GPU</span>
                  </template>
                  <template #value>
                    <template v-if="nodeInfo.gpus.length > 0">
                      <NScrollbar x-scrollable style="flex: 1; width: 0" content-style="height:100%;">
                        <NSpace class="h-full" align="center" :wrap="false" :wrap-item="false" :size="[8, 0]">
                          <template v-for="item in nodeInfo.gpus">
                            <GpuItem :item="item" />
                          </template>
                        </NSpace>
                      </NScrollbar>
                    </template>
                    <template v-else>
                      <span class="info-item-value">--</span>
                    </template>
                  </template>
                </LabelWithValue>
                <LabelWithValue>
                  <template #label>
                    <span class="info-item-label">RAM</span>
                  </template>
                  <template #value>
                    <span class="info-item-value">{{ nodeInfo.memoryInfo }}</span>
                  </template>
                </LabelWithValue>
                <LabelWithValue>
                  <template #label>
                    <span class="info-item-label">Mac Address</span>
                  </template>
                  <template #value>
                    <span class="info-item-value">{{ nodeInfo.macAddr }}</span>
                  </template>
                </LabelWithValue>

                <LabelWithValue>
                  <template #label>
                    <span class="info-item-label">IP Address</span>
                  </template>
                  <template #value>
                    <span class="info-item-value">{{ nodeInfo.ipAddr }}</span>
                  </template>
                </LabelWithValue>
              </div>
            </div>
          </div>
        </div>
        <template v-if="isVisibleNodeRewards">
          <template v-for="item in nodeInfo.currentRewards">
            <RewardSection
              :title="item.projectName"
              :logo="item.projectLogo"
              :total-reward="toFixedClip(ethers.formatUnits(item.totalReward || 0n, 18), 6)"
              :current-reward="toFixedClip(ethers.formatUnits(item.currentReward || 0n, 18), 6)"
            />
          </template>
        </template>
        <div class="node-tasks">
          <SectionHeader>Node Tasks</SectionHeader>
          <ApiTransactions :node-id="nodeInfo.nodeId" />
        </div>
        <!-- <template v-if="isVisibleNodeRewards">
          <div>
            <SectionHeader>Earnings</SectionHeader>
            <RewardClaims :node-id="nodeInfo.nodeId" />
          </div>
        </template> -->
        <!-- <NTabs default-value="apis">
          <NTabPane name="apis" tab="Tasks">
            <ApiTransactions :node-id="nodeInfo.nodeId" />
          </NTabPane>
          <template v-if="isVisibleNodeRewards">
            <NTabPane name="claims" tab="Earnings">
              <RewardClaims :node-id="nodeInfo.nodeId" />
            </NTabPane>
          </template>
        </NTabs> -->
        <template v-if="status === 0 || status === 1">
          <ModalChangeOwner v-model:visible="isVisibleChangePrincipal" :node-id="nodeInfo.nodeId" @success="onChangeOwnerSuccess" />
        </template>
        <template v-if="status === 0">
          <ModalStake
            v-model:visible="isVisibleStake"
            :stake-contract="stakeContract"
            :token-contract="tokenContract"
            :node-id="nodeInfo.nodeId"
            :node-projects="nodeInfo.projects"
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
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { NSpace, NText, NButton, NIcon, NScrollbar, NSpin, NTabs, NTabPane, NTooltip, useMessage, useDialog } from 'naive-ui';
import { PencilSharp as IconEdit, InformationCircleOutline as IconTips } from '@vicons/ionicons5';
import SectionHeader from '@/components/section-header.vue';
import PrimaryButton from '@/components/primary-button.vue';
import Alert from './alert.vue';
import moment from 'moment';
import { Utils } from '@/tools/utils';
import { Http } from '@/tools/http';
import { ethers } from 'ethers';
import { useETHUserStore } from '@/stores/eth-user';

import { Web3Utils } from '@/web3/utils';
import { ApiManager } from '@/web3/api';
import { StakeNodeApi } from '@/web3/api/stake-node';
import { NodeRewardApi } from '@/web3/api/node-reward';
import { Web3Service } from '@/web3';
import { getDefaultNetwork } from '@/web3/network';

import { nodeBind } from './bind-node';

import AlertSyncOwner from './alert-sync-owner.vue';

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
import RewardSection from './reward-section/index.vue';

type Project = {
  name: string;
  logo: string;
  projectId: number;
};

type CurrentReward = {
  projectId: number;
  projectName: string;
  projectLogo: string;
  currentReward: bigint;
  totalReward: bigint;
  claimedReward: bigint;
};

class NodeRewardTimer {
  interval: number;
  running: boolean;
  nodeId: string;
  projects: Project[];
  callback: (rewards: CurrentReward[]) => void;

  constructor({ nodeId, projects, callback }: { nodeId: string; projects: Project[]; callback: (rewards: CurrentReward[]) => void }) {
    this.interval = 15000;

    this.running = true;
    this.nodeId = nodeId;
    this.projects = projects;
    this.callback = callback;
    this.handle();
  }

  async handle() {
    const before = new Date().getTime();
    const responses = await Promise.all(this.projects.map((item) => queryReward(nodeId, item.projectId)));
    const currentRewards: CurrentReward[] = [];
    responses.forEach((item, index) => {
      const project = this.projects[index];
      currentRewards.push({
        projectId: project.projectId,
        projectName: project.name,
        projectLogo: project.logo,
        currentReward: item.currentReward,
        totalReward: item.totalReward,
        claimedReward: item.claimedReward,
      });
    });
    const end = new Date().getTime();
    this.callback(currentRewards);
    const diff = this.interval - (end - before);
    if (diff > 0) {
      // console.info(`wait ${diff} ms`);
      await new Promise((resolve) => setTimeout(resolve, diff));
    }
    if (this.running) {
      this.handle();
    }
  }

  stop() {
    this.running = false;
  }
}

const route = useRoute();
const message = useMessage();
const dialog = useDialog();

const http = Http.getInstance();
const apiManager = ApiManager.getInstance();

const w3s = Web3Service.getInstance();
const ethUserStore = useETHUserStore();
const nodeService = useNodeService();
let stakeNodeApi: StakeNodeApi | null = null;
let nodeRewardApi: NodeRewardApi | null = null;
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
const rewardContract = ref('');
const tokenContract = ref('');

const nodeInfo = ref<any>({});

const isVisibleChangePrincipal = ref(false);
const isVisibleStake = ref(false);
const isVisibleUnstake = ref(false);
const isVisibleTips = ref(false);
const tipsType = ref<any>('success');
const tipsTitle = ref('');
const tipsMessage = ref('');
const minClaimReward = ref(BigInt(1 * 1e18)); //ref(BigInt(100 * 1e18));
const rewardQueryTimer = ref<NodeRewardTimer>();

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

const isVisibleNodeRewards = computed(() => {
  const isInited = nodeInfo.value.nodeId;
  const globalStatus = status.value;
  return isInited && globalStatus === 0;
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
  const projects: Project[] = node.projects || [];
  const nodeId = node._id;
  const startupTime = node.startupTime ? moment(node.startupTime).utc().format('MMMM DD HH:mm UTC YYYY') : '-';
  const updateTime = node.updateTime ? moment(node.updateTime).utc().format('MMMM DD HH:mm UTC YYYY') : '-';
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

  const metadata = nodeService.getNodeMetadata(status, projects);
  const maxStakeAmount = metadata ? metadata.maxStakeAmount : 0n;

  return { projects, nodeId, updateTime, startupTime, runTime, cpuName, gpus, macAddr, ipAddr, memoryInfo, application, status, maxStakeAmount };
}

const updateStakeInfo = async (nodeId: string) => {
  if (!nodeId) {
    nodeInfo.value.bindStakeAccount = '';
    nodeInfo.value.currentStaked = 0n;
    return;
  }
  const _stakeInfo = await nodeService.queryStake(nodeId);
  const bindStakeAccount = (_stakeInfo && _stakeInfo.bindStakeAccount) || '';
  const currentStaked = (_stakeInfo && _stakeInfo.currentStaked) || 0n;
  nodeInfo.value.bindStakeAccount = bindStakeAccount;
  nodeInfo.value.currentStaked = currentStaked;
};

const init = async (nodeId: string) => {
  error.value = -1;

  if (!nodeId) {
    error.value = 1;
    errorText.value = 'Invalid node id';
    return;
  }

  const [_nodeInfo, { principal }] = await Promise.all([queryInfo(nodeId), queryNodeOwner(nodeId, ethUserStore.account0)]);

  const responses = await Promise.all(_nodeInfo.projects.map((item) => queryReward(nodeId, item.projectId)));
  const currentRewards: CurrentReward[] = [];
  responses.forEach((item, index) => {
    const project = _nodeInfo.projects[index];
    currentRewards.push({
      projectId: project.projectId,
      projectName: project.name,
      projectLogo: project.logo,
      currentReward: item.currentReward,
      totalReward: item.totalReward,
      claimedReward: item.claimedReward,
    });
  });

  nodeInfo.value = {
    ..._nodeInfo,
    principal,
    currentRewards,
  };

  await updateStakeInfo(nodeId);

  if (rewardQueryTimer.value) {
    rewardQueryTimer.value.stop();
  }
  rewardQueryTimer.value = new NodeRewardTimer({
    nodeId: nodeId,
    projects: _nodeInfo.projects,
    callback: (currentRewards) => (nodeInfo.value.currentRewards = currentRewards),
  });
  error.value = 0;
};

watch(
  () => ethUserStore.isInvalidNetwork,
  (_isInvalidNetwork) => {
    if (!_isInvalidNetwork) {
      updateStakeInfo(nodeInfo.value.nodeId);
    }
  }
);

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

const claimReward = async (params: { amount: bigint; account: string; nodeId: string; nonce: string; sign1: string; sign2: string; sign3: string }) => {
  const resp = await nodeRewardApi!.claimWithSignature(params);
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
  const sign1 = `0x${data.sign1}`;
  const sign2 = `0x${data.sign2}`;
  const sign3 = `0x${data.sign3}`;
  const nonce = data.nonce;
  const owner = data.owner;
  if (!sign1 || !sign2 || !sign3 || !nonce || !owner) {
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
      onConfirm: () => claimReward({ amount, account: owner, nodeId, nonce, sign1, sign2, sign3 }),
    });
    if (dialogResp.type === 'cancel') {
      return { _result: 3, _desc: 'Claim cancel' };
    } else {
      claimResp = dialogResp.data;
    }
  } else {
    claimResp = await claimReward({ amount, account: owner, nodeId, nonce, sign1, sign2, sign3 });
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

async function onPressClaim(projectId: number) {
  // tipsType.value = 'warning';
  // tipsTitle.value = 'Coming soon';
  // tipsMessage.value = `The Reward System is being updated.`;
  // isVisibleTips.value = true;
  const currentRewardItem = nodeInfo.value.currentRewards.find((item: any) => item.projectId === projectId);
  const currentReward = currentRewardItem?.currentReward;
  // return;
  if (currentReward === 0n || !currentReward) return;
  const nodeId = nodeInfo.value.nodeId;
  const amount = BigInt(1 * 1e17); //currentReward;
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
  rewardContract.value = networkConfig.smarts.nodeReward.contract;
  stakeNodeApi = apiManager.create(StakeNodeApi, { address: stakeContract.value });
  nodeRewardApi = apiManager.create(NodeRewardApi, { address: rewardContract.value });
  nodeService.setStakeNodeApi(stakeNodeApi);
  const { data: _tokenContract } = await stakeNodeApi!.token();
  tokenContract.value = _tokenContract || '';
  await init(nodeId);
});

onUnmounted(() => {
  if (rewardQueryTimer.value) {
    rewardQueryTimer.value.stop();
  }
});
</script>

<style scoped>
.page-empty {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 320px;
}

.page-body {
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 16px 0;
}

.node-info {
  display: flex;
  flex-direction: column;
  gap: 16px 0;
}

.main-table {
  width: 100%;
  background-color: #1c2025;
  border-left: solid 4px #1c2025;
  border-radius: 4px;
}

.info-item-label {
  font-size: 12px;
  color: var(--text-color1);
}

.info-item-value {
  font-size: 14px;
  color: #ffffff;
}

.info-item-pools {
  display: flex;
  flex-direction: row;
  gap: 0 8px;
}

.node-tasks {
  display: flex;
  flex-direction: column;
  gap: 16px 0;
}

@media (min-width: 640px) {
  .page-body {
    gap: 24px 0;
    max-width: var(--screen-max-width);
    min-width: var(--screen-min-width);
  }

  .info-item-label {
    font-size: 14px;
  }

  .info-item-value {
    font-size: 14px;
  }
}
</style>
