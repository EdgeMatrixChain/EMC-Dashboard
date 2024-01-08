<template>
  <div class="page">
    <template v-if="error === -1">
      <NSpace align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
        <NSpin />
      </NSpace>
    </template>
    <template v-else-if="error > 0">
      <NSpace vertical align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
        <NText depth="3" style="font-size:16px;">{{ errorText }}</NText>
        <NButton size="large" strong @click="onPressTry">Try Again</NButton>
      </NSpace>
    </template>
    <template v-else>
      <NSpace vertical :wrap-item="false" align="center" :size="[16, 16]">
        <NCard style="max-width:880px;">
          <template #header>
            <NSpace justify="space-between" :wrap-item="false" :size="[4, 4]">
              <NText>Node stake information explorer</NText>
              <NButton text tag="a" type="primary" icon-placement="right" @click="onPressExplorer(stakeContract)">
                {{ formatAddress(stakeContract, 6) }}
                <template #icon>
                  <NIcon size="18">
                    <IconLink />
                  </NIcon>
                </template>
              </NButton>
            </NSpace>
          </template>
          <NInput v-model:value="inputNodeId" size="large" :round="true" placeholder="Node id"
            style="width:100%;max-width:880px; border-radius: 99px !important;">
            <template #suffix>
              <NButton type="primary" strong round @click="onPressSearch" style="background-color:var(--n-color)">
                <NIcon size="24">
                  <IconRefresh />
                </NIcon>
              </NButton>
            </template>
          </NInput>
        </NCard>
        <template v-if="loading">
          <NCard style="max-width:880px;">
            <NSpace vertical justify="center" align="center" :wrap-item="false" :size="[4, 4]"
              style="position:relative;height:100px;">
              <NSpin />
            </NSpace>
          </NCard>
        </template>
        <template v-else-if="isNotFound">
          <NCard style="max-width:880px;">
            <NSpace vertical justify="center" align="center" :wrap-item="false" :size="[4, 4]"
              style="position:relative;height:100px;">
              <NText>Not found</NText>
            </NSpace>
          </NCard>
        </template>
        <template v-else-if="nodeInfo">
          <NCard style="max-width:880px;">
            <template #header>
              <NSpace vertical justify="space-between" :wrap-item="false" :size="[4, 4]">
                <NText>{{ nodeInfo.nodeId }}</NText>
              </NSpace>
            </template>
            <NSpace vertical justify="center" :wrap-item="false" :size="[16, 16]">
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="3" style="font-size:14px">Node type</NText>
                <NText class="text-[18px]" strong>{{ nodeInfo.nodeType }}</NText>
              </NSpace>
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="3" style="font-size:14px">Principal</NText>
                <NSpace align="center" :wrap-item="false" :size="[4, 4]">
                  <NText class="text-[18px]" strong>{{ nodeInfo.registerAccount }}</NText>
                  <template v-if="status === 0">
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
              <!-- <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="2" style="font-size:14px">Bind address</NText>
                <NText class="text-[18px]" :class="{ 'line-through': status === 2 }" strong>{{ nodeInfo.bindAccount }}
                </NText>
              </NSpace> -->
              <!-- <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="3" style="font-size:14px">Total staked</NText>
                <NText class="text-[18px]" strong>{{ nodeInfo.totalStakedStr }} EMC</NText>
              </NSpace> -->
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="3" style="font-size:14px">Current staked</NText>
                <NText class="text-[18px]" strong>{{ nodeInfo.currentStakedStr }} EMC</NText>
              </NSpace>
              <!-- <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="3" style="font-size:14px">Total unstaked</NText>
                <NText class="text-[18px]" strong>{{ nodeInfo.totalUnstakedStr }} EMC</NText>
              </NSpace> -->
              <NSpace align="center" :wrap-item="false" :size="[32, 4]" style="margin-top:32px;">
                <template v-if="status === 1">
                  <NButton type="primary" strong size="large" round :loading="bindLoading" @click="onPressBind"
                    style="background-color:var(--n-color);width:100%;">Bind</NButton>
                </template>
                <template v-if="status === 2">
                  <NButton type="primary" strong size="large" round :loading="bindLoading" @click="onPressBind"
                    style="background-color:var(--n-color);width:100%;">Rebind</NButton>
                </template>
                <template v-else-if="status === 0">
                  <NButton type="primary" strong size="large" round @click="onPressStake"
                    style="background-color:var(--n-color);width:100%;flex:1;">Stake</NButton>
                  <NButton type="primary" strong size="large" round @click="onPressUnstake"
                    style="background-color:var(--n-color);width:100%;flex:1;">Unstake</NButton>
                </template>
                <template v-if="status === 11">
                  <NButton type="primary" strong size="large" round disabled
                    style="background-color:var(--n-color);width:100%;">Not connected</NButton>
                </template>
                <template v-if="status === 12">
                  <NButton type="primary" strong size="large" round disabled
                    style="background-color:var(--n-color);width:100%;">Please switch to arbitrum one first</NButton>
                </template>
                <template v-if="status === 13">
                  <NButton type="primary" strong size="large" round disabled
                    style="background-color:var(--n-color);width:100%;">No access privilege</NButton>
                </template>
              </NSpace>
            </NSpace>
          </NCard>
          <Bill :node-id="nodeInfo.nodeId" :stake-contract="stakeContract" :token-contract="tokenContract" />
          <Claim :node-id="nodeInfo.nodeId" :stake-contract="stakeContract" :token-contract="tokenContract" />
          <ModalChangePrincipal v-model:visible="isVisibleChangePrincipal" :node-id="nodeInfo.nodeId"
            @success="onChangePrincipalSuccess" />
          <ModalStake v-model:visible="isVisibleStake" :stake-contract="stakeContract" :token-contract="tokenContract"
            :node-id="nodeInfo.nodeId" @success="onStakeSuccess" />
          <ModalUnstake v-model:visible="isVisibleUnstake" :stake-contract="stakeContract" :token-contract="tokenContract"
            :node-id="nodeInfo.nodeId" @success="onUnstakeSuccess" />
        </template>
      </NSpace>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import {
  NSpace,
  NCard,
  NText,
  NInput,
  NButton,
  NIcon,
  NSpin,
  NModal,
  useMessage,
} from 'naive-ui';
import { SearchSharp as IconRefresh, Close as IconClose, LinkOutline as IconLink, PencilSharp as IconEdit } from '@vicons/ionicons5';
import { useRoute } from 'vue-router';
import { ethers } from 'ethers';
import { useETHUserStore } from '@/stores/eth-user';
import { Web3Utils } from '@/web3/utils';
import { ApiManager } from '@/web3/api';
import { StakeNodeApi } from '@/web3/api/stake-node';
import { Web3Service } from '@/web3';
import { getDefaultNetwork } from '@/web3/network';
import { Utils } from '@/tools/utils';
import { Http } from '@/tools/http';
import ModalChangePrincipal from './change-principal/index.vue';
import ModalStake from './stake/index.vue';
import ModalUnstake from './unstake/index.vue';
import Bill from './bill/index.vue';
import Claim from './claim/index.vue';

export default defineComponent({
  name: 'stake-node',
  components: {
    NSpace,
    NCard,
    NText,
    NInput,
    NButton,
    NIcon,
    NSpin,
    NModal,
    IconRefresh,
    IconClose,
    IconLink,
    IconEdit,
    Bill,
    Claim,
    ModalChangePrincipal,
    ModalStake,
    ModalUnstake
  },
  setup() {
    const message = useMessage();
    const route = useRoute();
    const http = Http.getInstance();
    const w3s = Web3Service.getInstance();
    const networkConfig = getDefaultNetwork();
    const ethUserStore = useETHUserStore();
    const error = ref(-1);
    const errorText = ref('');
    const stakeContract = ref('');
    const tokenContract = ref('');
    const inputNodeId = ref('');
    const loading = ref(false);
    const isNotFound = ref(false);
    const nodeInfo = ref<any>(null);
    const bindLoading = ref(false);
    const isVisibleChangePrincipal = ref(false);
    const isVisibleStake = ref(false);
    const isVisibleUnstake = ref(false);
    const apiManager = ApiManager.getInstance();
    let stakeNodeApi: StakeNodeApi | null = null;

    onMounted(async () => {
      stakeContract.value = networkConfig.smarts.nodeStake.contract;
      stakeNodeApi = apiManager.create(StakeNodeApi, { address: stakeContract.value });
      error.value = -1;

      const { data: _tokenContract } = await stakeNodeApi!.token();
      tokenContract.value = _tokenContract;

      if (inputNodeId.value) {
        await init(inputNodeId.value);
      }
      error.value = 0;
    });


    const init = async (nodeId: string) => {
      loading.value = true;
      const [
        { data: _nodeInfo },
        { data: _nodeInfo2 },
      ] = await Promise.all([
        http.get({ url: '/nodesign/query', data: { nodeId } }),
        stakeNodeApi!.nodeInfo({ nodeId }),
      ]);
      loading.value = false;
      // if (!_nodeInfo) {
      //   isNotFound.value = true;
      //   return;
      // }
      const { nodeType, principal } = _nodeInfo || {
        "nodeId": "16Uiu2HAm94KPKcUDeriRE5TMZRuogheDtKvg8FMsgXhhJAVahSfN",
        "publicKey": "0x26eAe3DA0Ce039ED3A12EFD0d9674B80B65418d8",
        "nodeType": "computing",
        "principal": "0x5079960bCa12Ab54298394D5808A9315710DB1f5",
        "status": 1,
        "createdAt": "2023-12-28T09:48:18.736Z",
        "updatedAt": "2023-12-28T09:48:18.736Z"
      };
      const [_bindAccount, _totalStaked, _currentStaked, _totalUnstaked] = _nodeInfo2 || [];
      nodeInfo.value = {
        nodeId: nodeId,
        nodeType: nodeType,
        registerAccount: principal, //register wallet address
        bindAccount: _bindAccount, //contract bind wallet address
        totalStaked: _totalStaked,
        totalStakedStr: ethers.formatUnits(_totalStaked, 18),
        currentStaked: _currentStaked,
        currentStakedStr: ethers.formatUnits(_currentStaked, 18),
        totalUnstaked: _totalUnstaked,
        totalUnstakedStr: ethers.formatUnits(_totalUnstaked, 18),
      };
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
      bindLoading.value = true;
      const resp = await nodeBind({ account, nodeId });
      bindLoading.value = false;
      if (resp._result !== 0) {
        message.warning(resp._desc);
        return;
      }
      bindLoading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      bindLoading.value = false;

      message.success('Successful, and the transaction may be delayed');
      init(inputNodeId.value);
    }

    return {
      error,
      errorText,
      ethUserStore,
      stakeContract,
      tokenContract,
      inputNodeId,
      loading,
      bindLoading,
      isNotFound,
      nodeInfo,
      isVisibleChangePrincipal,
      isVisibleStake,
      isVisibleUnstake,
      status: computed(() => {
        if (!ethUserStore.account0) {
          return 11; // Not connected
        } else if (ethUserStore.isInvalidNetwork) {
          return 12;// Please switch to arbitrum one first
        } else if (!Web3Utils.eq(ethUserStore.account0, nodeInfo.value.registerAccount)) {
          return 13; // No access privilege
        } else {
          if (!nodeInfo.value.bindAccount || nodeInfo.value.bindAccount === '0x0000000000000000000000000000000000000000') {
            return 1; // Node binding
          } else if (!Web3Utils.eq(nodeInfo.value.bindAccount, nodeInfo.value.registerAccount)) {
            return 2; // Update binding
          } else {
            return 0; // Stake、Unstake、Change binding
          }
        }
      }),
      formatAddress: Utils.formatAddress,
      formatEmc(value: bigint) {
        return ethers.formatUnits(value, 18);
      },
      onPressTry() {
        location.reload();
      },
      onPressExplorer(contract: string) {
        window.open(`https://arbiscan.io/address/${contract}`);
      },
      onPressSearch() {
        init(inputNodeId.value);
      },
      async onPressBind() {
        handleBind();
      },
      onPressChangePrincipal() {
        isVisibleChangePrincipal.value = true;
      },
      onChangePrincipalSuccess() {
        init(inputNodeId.value);
        isVisibleChangePrincipal.value = false;
      },
      onPressStake() {
        isVisibleStake.value = true;
      },
      onStakeSuccess() {
        init(inputNodeId.value);
        isVisibleStake.value = false;
      },
      onPressUnstake() {
        isVisibleUnstake.value = true;
      },
      onUnstakeSuccess() {
        init(inputNodeId.value);
        isVisibleUnstake.value = false;
      },
    };
  },
});
</script>

<style scoped>
.input-group {
  padding: 2px;
  border: solid 1px #e7e7e7;
  border-radius: 99px;
}
</style>
