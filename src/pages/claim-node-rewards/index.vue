<template>
  <div class="page max-w-[880px]" style="margin: auto">
    <NCard>
      <template #header>
        <NSpace vertical justify="space-between" :wrap-item="false" :size="[4, 4]">
          <NText>Claims</NText>
        </NSpace>
      </template>
      <NSpace vertical justify="center" :wrap-item="false" :size="[16, 16]">
        <Table :data="claimList" @item="onPressItem" />
      </NSpace>
    </NCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, watch, ref } from 'vue';
import { NModal, NCard, NText, NInput, NSpace, NButton, NAlert, NIcon, NSpin, NSkeleton, useMessage } from 'naive-ui';
import { Close as IconClose } from '@vicons/ionicons5';
import { ethers } from 'ethers';
import moment from 'moment';
import { getDefaultNetwork } from '@/web3/network';
import { ApiManager } from '@/web3/api';
import { ERC20Api } from '@/web3/api/erc20';
import { MerkleClaimApi } from '@/web3/api/merkle-claim';
import { useETHUserStore } from '@/stores/eth-user';
import { Http } from '@/tools/http';
import type { Item } from './table.vue';
import Table from './table.vue';

export default defineComponent({
  name: 'claim-node-rewards',
  components: { NModal, NCard, NText, NInput, NSpace, NButton, NAlert, NIcon, NSpin, NSkeleton, IconClose, Table },
  emits: ['update:visible', 'success'],
  setup(props, ctx) {
    const message = useMessage();
    const http = Http.getInstance();
    const ethUserStore = useETHUserStore();
    const apiManager = ApiManager.getInstance();
    let tokenApi: ERC20Api | null = null;
    let merkleClaimApi: MerkleClaimApi | null = null;
    const error = ref(-1);
    const errorText = ref('');
    const claimList = ref<Item[]>([]);
    const currentReward = ref(0n);
    const withdrawReward = ref(0n);
    const tokenDecimal = ref(0);
    const tokenName = ref('');
    const tokenSymbol = ref('');
    const tokenBalance = ref<bigint>(0n);
    const loadings = ref({ withdraw: false, info: false });
    const networkConfig = getDefaultNetwork();
    const init = async () => {
      error.value = -1;
      errorText.value = '';
      tokenApi = apiManager.create<ERC20Api>(ERC20Api, { address: networkConfig.tokens.emc.contract });
      merkleClaimApi = apiManager.create<MerkleClaimApi>(MerkleClaimApi, { address: networkConfig.smarts.nodeReward.contract });

      const [{ data: _tokenName }, { data: _tokenSymbol }, { data: _tokenDecimals }] = await Promise.all([
        tokenApi.name(),
        tokenApi.symbol(),
        tokenApi.decimals(),
      ]);

      const contract = networkConfig.smarts.nodeReward.contract;
      const [resp, resp1] = await Promise.all([
        http.get({
          url: '/merkle/list',
          data: { contract: contract, account: ethUserStore.account0, status: -1, page: 1, size: 99 },
        }),
        http.get({
          url: '/event/query',
          data: { contract: contract, topic: 'Claimed', extra: encodeURIComponent(JSON.stringify({ account: ethUserStore.account0 })), page: 1, size: 99 },
        }),
      ]);
      const list1 = resp1.data || [];
      const indexMap: any = {};
      list1.forEach((item: any) => {
        indexMap[item.index] = item;
      });
      const list = resp.data || [];

      list.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      const newList = list.map((item: any, index: number) => {
        const status = indexMap[index] ? 3 : item.status;
        const createTime = moment(item.createdAt).utc().format('MMMM DD HH:mm UTC YYYY');
        return { ...item, status, createTime };
      });

      claimList.value = newList;
      tokenName.value = _tokenName;
      tokenSymbol.value = _tokenSymbol;
      tokenDecimal.value = Number(_tokenDecimals);

      error.value = 0;
    };

    onMounted(() => {
      init();
    });

    return {
      error,
      errorText,
      claimList,
      currentReward,
      currentRewardStr: computed(() => ethers.formatUnits(currentReward.value, tokenDecimal.value)),
      withdrawReward,
      withdrawRewardStr: computed(() => ethers.formatUnits(withdrawReward.value, tokenDecimal.value)),
      tokenSymbol,
      tokenBalanceStr: computed(() => ethers.formatUnits(tokenBalance.value, tokenDecimal.value)),
      ethUserStore,
      loadings,
      async onPressItem(item: Item) {
        const resp1 = await http.postJSON({
          url: '/merkle/preclaim',
          data: { contract: networkConfig.smarts.nodeReward.contract, id: item._id },
        });
        const { proofIndex, proof } = resp1.data;
        const resp = await merkleClaimApi!.claim({
          index: proofIndex,
          account: item.account,
          amount: BigInt(item.amount),
          merkleProof: proof,
        });
        if (resp._result !== 0) {
          message.warning(resp._desc || 'Claim error');
          return;
        }
        message.success('Claimed successfully');
      },
    };
  },
});
</script>

<style scoped></style>
