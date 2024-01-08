<template>
  <div class="page max-w-[1440px]" style="margin:auto;">
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
      <NSpace vertical :wrap-item="false" :size="[0, 24]">
        <template v-if="status === 1 || status === 2">
          <NAlert title="Warning" type="warning">
            <NSpace align="center" :wrap-item="false" :size="[8, 8]">
              <template v-if="status === 1">
                <NText>Nodes need to be bound before stake</NText>
                <NButton type="warning" strong size="small" :loading="loadings.bind" @click="onPressBind"
                  style="background-color:var(--n-color);width:auto;">Bind</NButton>
              </template>
              <template v-if="status === 2">
                <NText>Need to be rebind after change principal</NText>
                <NButton type="warning" strong size="small" :loading="loadings.bind" @click="onPressBind"
                  style="background-color:var(--n-color);width:auto;">Rebind</NButton>
              </template>
            </NSpace>
          </NAlert>
        </template>
        <NSpace align="center" :wrap-item="false" :size="[0, 0]">
          <NText class="header-text text-[20px] mr-[8px]">Node</NText>
          <NText class="header-text text-[14px]">{{ nodeInfo.nodeId }}</NText>
        </NSpace>
        <NGrid x-gap="48" y-gap="48" :cols="24" item-responsive>
          <NGridItem span="24 1000:12">
            <div class="main-bgcolor" style="border-left-color: #8f7df8">
              <div class="main-table">

                <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                  <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                    <NText class="text-[14px] xl:text-[16px]" depth="3">Run Time</NText>
                  </NSpace>
                  <NSpace class="flex-1" align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                    <NText class="text-[14px] xl:text-[16px]">{{ nodeInfo.runTime }}</NText>
                  </NSpace>
                </NSpace>

                <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                  <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                    <NText class="text-[14px] xl:text-[16px]" depth="3">Principal</NText>
                  </NSpace>
                  <NSpace class="flex-1" align="center" :wrap-item="false" :size="[8, 0]">
                    <NText class="text-[12px] xl:text-[13px]"> {{ nodeInfo.principal || '--' }}</NText>
                    <template v-if="status === 0 || status === 1 || status === 2">
                      <NButton strong secondary circle @click.stop.prevent="onPressChangePrincipal">
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
                    <NText class="text-[14px] xl:text-[16px]">{{ formatUnits(nodeInfo.currentReward || 0n, 18) }} EMC
                    </NText>
                    <template v-if="status === 0">
                      <NButton type="primary" strong size="small" round :loading="loadings.checkout"
                        @click="onPressCheckout" :disabled="nodeInfo.currentReward === 0n || !nodeInfo.currentReward"
                        style="background-color:var(--n-color);width:auto;">Check out rewards
                      </NButton>
                    </template>
                  </NSpace>
                </NSpace>

                <NSpace class="main-table-item" align="center" :wrap-item="false" :size="[0, 0]">
                  <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
                    <NText class="text-[14px] xl:text-[16px]" depth="3">Staked</NText>
                  </NSpace>
                  <NSpace class="flex-1" align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                    <NText class="text-[14px] xl:text-[16px]">{{ formatUnits(nodeInfo.currentStaked || 0n, 18) }} EMC
                    </NText>
                    <template v-if="status === 0">
                      <NSpace align="center" :wrap-item="false" :size="[8, 0]">
                        <NButton type="primary" strong size="small" round :loading="loadings.stake" @click="onPressStake"
                          style="background-color:var(--n-color);width:auto;">Stake</NButton>
                        <NButton type="primary" strong size="small" round :loading="loadings.unstake"
                          :disabled="nodeInfo.currentStaked === 0n || !nodeInfo.currentStaked" @click="onPressUnstake"
                          style="background-color:var(--n-color);width:auto;">Unstake</NButton>
                      </NSpace>
                    </template>
                  </NSpace>
                </NSpace>
              </div>
            </div>
          </NGridItem>
          <NGridItem span="24 1000:12">
            <div class="main-bgcolor" style="border-left-color: #5554fe">
              <div class="main-table">
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
            </div>
          </NGridItem>
        </NGrid>
        <template v-if="status === 0 || status === 1 || status === 2">
          <ModalChangePrincipal v-model:visible="isVisibleChangePrincipal" :node-id="nodeInfo.nodeId"
            @success="onChangePrincipalSuccess" />
        </template>
        <template v-if="status === 0">
          <ModalStake v-model:visible="isVisibleStake" :stake-contract="stakeContract" :token-contract="tokenContract"
            :node-id="nodeInfo.nodeId" @success="onStakeSuccess" />
          <ModalUnstake v-model:visible="isVisibleUnstake" :stake-contract="stakeContract" :token-contract="tokenContract"
            :node-id="nodeInfo.nodeId" @success="onUnstakeSuccess" />
        </template>
        <ModalTips v-model:visible="isVisibleTips" :title="tipsTitle" :message="tipsMessage" />
      </NSpace>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { NSpace, NAlert, NText, NButton, NIcon, NEllipsis, NGrid, NGridItem, NSpin, useMessage } from 'naive-ui';
import { SearchSharp as IconRefresh, Close as IconClose, LinkOutline as IconLink, PencilSharp as IconEdit } from '@vicons/ionicons5';
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

import ModelsItem from '@/components/models-item.vue';

import ModalChangePrincipal from './change-principal/index.vue';
import ModalStake from './stake/index.vue';
import ModalUnstake from './unstake/index.vue';
import ModalTips from './tips/index.vue'

type ModelItem = {
  hash: string;
  model_name: string;
  model_sn: string;
  config: string;
  filename: string;
  sha256: string;
  title: string;
  cover: string;
};

export default defineComponent({
  components: {
    NSpace,
    NAlert,
    NText,
    NButton,
    NIcon,
    NEllipsis,
    NGrid,
    NGridItem,
    NSpin,
    ModelsItem,
    ModalChangePrincipal,
    ModalStake,
    ModalUnstake,
    ModalTips,
    IconEdit
  },
  setup() {
    const router = useRouter();

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
    const tipsTitle = ref('');
    const tipsMessage = ref('');

    const status = computed(() => {
      if (!ethUserStore.account0) {
        return 11; // Not connected
      } else if (ethUserStore.isInvalidNetwork) {
        return 12;// Please switch to arbitrum one first
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

    const modelList = ref<ModelItem[]>([]);


    async function queryInfo(nodeId: string) {
      const resp = await http.get({
        url: '/nodeinfosnapshot',
        data: { nodeid: nodeId },
      });
      let node = resp.data || {};
      if (Object.keys(node).length === 0) {
        const resp = await http.get({ url: '/nodeinfo', data: { nodeid: nodeId } });
        node = resp.data || {};
      }
      const cpuInfo = Utils.parseJSON(node.cpuInfo) || {};
      const ipInfo = node.ipInfo || {};
      const memory = Utils.parseJSON(node.memoryInfo) || {};
      const memoryTotal = Math.round(memory.total / Math.pow(1024, 3));
      const memoryUsedPercent = Utils.toFixed(Number(memory.used_percent));
      return {
        nodeId: node._id,
        startupTime: moment(node.startupTime).format('YYYY-MM-DD hh:mm'),
        runTime: Utils.formatDate(node.runTime),
        cpuName: cpuInfo.ModelName,
        macAddr: node.macAddr,
        ipAddr: ipInfo.ipAddr,
        memoryInfo: `${memoryTotal}GB ${memoryUsedPercent}%`,
        application: node.appOrigin
      }
    }

    async function queryPrincipal(nodeId: string) {
      const resp = await http.get({
        url: '/nodesign/query',
        data: { nodeId }
      })
      const signInfo = resp.data || {};
      return {
        principal: signInfo.principal,
      }
    }

    async function queryStake(nodeId: string) {
      const { data: _stakeInfo } = await stakeNodeApi!.nodeInfo({ nodeId });
      const [_bindStakeAccount, _totalStaked, _currentStaked, _totalUnstaked] = _stakeInfo || [];
      return {
        bindStakeAccount: _bindStakeAccount || '', //contract bind wallet address
        totalStaked: _totalStaked || 0n,
        currentStaked: _currentStaked || 0n,
        totalUnstaked: _totalUnstaked || 0n,
      }
    }

    async function queryReward(nodeId: string) {
      const resp = await http.get({
        url: '/nodebill/summary',
        data: { nodeId: nodeId }
      });
      const data = resp.data || {};
      const totalReward = data.billTotal || 0;
      const totalClaim = data.withdrawTotal || 0;
      return {
        currentReward: BigInt(totalReward) - BigInt(totalClaim),
        totalReward: totalReward
      }
    }

    const init = async (nodeId: string) => {
      error.value = -1;

      if (!nodeId) {
        error.value = 1;
        errorText.value = 'Invalid node id';
        return
      }

      const [_nodeInfo, { principal }, { bindStakeAccount, currentStaked }, { currentReward }] = await Promise.all([
        queryInfo(nodeId),
        queryPrincipal(nodeId),
        queryStake(nodeId),
        queryReward(nodeId),
      ]);

      nodeInfo.value = {
        ..._nodeInfo,
        principal,
        bindStakeAccount,
        currentStaked,
        currentReward,
      }

      error.value = 0;
    };

    const preNodeBind = async (params: { account: string, nodeId: string }) => {
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
    }

    const nodeBind = async (params: { account: string, nodeId: string }) => {
      const nodeId = params.nodeId;
      const resp = await preNodeBind(params);
      if (resp._result !== 0) return resp;
      const data = resp.data || {};
      const nonce = data.nonce;
      const signature = data.signature;
      return stakeNodeApi!.bindNode({ nodeId, nonce, signature });
    }

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
    }

    const handleCheckoutReward = async (amount: bigint) => {
      loadings.value.checkout = true;
      const resp = await http.postJSON({
        url: '/nodebill/withdraw',
        data: { nodeId, amount: amount.toString() }
      })
      loadings.value.checkout = false;
      if (resp._result !== 0) {
        message.warning(resp._desc);
        return;
      }
      init(nodeId);
      tipsTitle.value = 'Check out success';
      tipsMessage.value = `The amount of this check out ${ethers.formatUnits(amount, 18)} $EMC. You can click top-right "Claim node reward" for more information`
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


    const initSdModels = async (nodeId: string) => {
      const resp = await http.get('/nodesdmodels', {
        params: { nodeid: nodeId },
      });
      const modelsData = resp.data;
      if (modelsData._result !== 0 || modelsData.data === '') return;
      const models = JSON.parse(modelsData.data);

      if (typeof models !== 'object' || !models.length) {
        modelList.value = [];
      } else {
        models.sort((a: any, b: any) => {
          const aSha256 = Boolean(a.sha256);
          const bSha256 = Boolean(b.sha256);
          if (aSha256 && !bSha256) {
            return -1;
          } else if (!aSha256 && bSha256) {
            return 1;
          } else {
            return 0;
          }
        });
        modelList.value = [...models];
      }

      const resp1 = await http.get('https://client.emchub.ai/emchub/api/client/modelInfo/queryList', {
        params: { pageNo: 1, pageSize: 99 },
      });
      const modelAllList = resp1.data.pageInfo?.list;

      modelList.value.forEach((modelItem: ModelItem) => {
        if (!modelItem.sha256) return;
        const resp = modelAllList.find((modelItemAllItems: any) => modelItem.sha256 === modelItemAllItems.modelVersions[0].hashCodeSha256);
        if (!resp) return;
        const previewPicturesUrl = JSON.parse(resp.modelVersions[0].previewPicturesUrl)[0] || [];
        modelItem.cover = previewPicturesUrl.url;
        modelItem.model_name = resp.modelName;
        modelItem.model_sn = resp.modelSn;
      });
    }

    return {
      error,
      errorText,
      loadings,
      status,
      nodeInfo,
      modelList,
      isVisibleChangePrincipal,
      isVisibleStake,
      isVisibleUnstake,
      isVisibleTips,
      tipsTitle,
      tipsMessage,
      stakeContract,
      tokenContract,
      formatUnits: ethers.formatUnits,
      onPressBind() {
        handleBind();
      },
      onPressCheckout() {
        if (nodeInfo.value.currentReward === 0n || !nodeInfo.value.currentReward) return;
        handleCheckoutReward(nodeInfo.value.currentReward);
      },
      onPressChangePrincipal() {
        isVisibleChangePrincipal.value = true;
      },
      onChangePrincipalSuccess(inputAddress: string) {
        init(nodeId);
        isVisibleChangePrincipal.value = false;
        tipsTitle.value = 'Change principal success';
        tipsMessage.value = `Need to switch to ${inputAddress} account to continue operation.`
        isVisibleTips.value = true;

      },
      onPressStake() {
        isVisibleStake.value = true;
      },
      onStakeSuccess() {
        init(nodeId);
        isVisibleStake.value = false;
      },
      onPressUnstake() {
        isVisibleUnstake.value = true;
      },
      onUnstakeSuccess() {
        init(nodeId);
        isVisibleUnstake.value = false;
        tipsTitle.value = 'Unstake success';
        tipsMessage.value = `$EMC have to wait 30 days for release. You can click top-right "Claim node reward" for more information.`
        isVisibleTips.value = true;
      },
    };
  },
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

.main-bgcolor {
  width: 100%;
  border-radius: 12px;
  border-left-style: solid;
  border-left-width: 4px;
  overflow: hidden;
}

.main-table {
  width: 100%;
  background-color: #1c2025;
  backdrop-filter: blur(60px);
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
