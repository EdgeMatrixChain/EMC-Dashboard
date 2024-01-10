<template>
  <template v-if="loading">
    <NSpace class="relative" vertical align="center" justify="center" :wrap-item="false" :size="[16, 16]">
      <NSpin />
    </NSpace>
  </template>
  <template v-else-if="claimList.length === 0">
    <NSpace class="relative" vertical align="center" justify="center" :wrap-item="false" :size="[16, 16]">
      <NText>No Data</NText>
    </NSpace>
  </template>
  <template v-else>
    <Table :data="claimList" @item="onPressItem" />
  </template>
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
  name: 'claim-node-rewards-content',
  components: { NModal, NCard, NText, NSpace, NButton, NAlert, NSpin, NSkeleton, IconClose, Table },
  setup(props, ctx) {
    const message = useMessage();
    const http = Http.getInstance();
    const ethUserStore = useETHUserStore();
    const networkConfig = getDefaultNetwork();
    const nodeReworkContract = networkConfig.smarts.nodeReward.contract;
    const apiManager = ApiManager.getInstance();
    const merkleClaimApi = apiManager.create<MerkleClaimApi>(MerkleClaimApi, { address: nodeReworkContract });

    const loading = ref(false);
    const claimList = ref<Item[]>([]);

    const init = async () => {
      claimList.value = [];
      if (!ethUserStore.account0) return;
      const extra = encodeURIComponent(JSON.stringify({ account: ethUserStore.account0.toLocaleLowerCase() }));
      loading.value = true;
      const [resp, resp1] = await Promise.all([
        http.get({
          url: '/merkle/list',
          data: { contract: nodeReworkContract, account: ethUserStore.account0, status: -1, page: 1, size: 99 },
        }),
        http.get({
          url: '/event/query',
          data: { contract: nodeReworkContract, topic: 'Claimed', extra: extra, page: 1, size: 99 },
        }),
      ]);
      loading.value = false;
      const list1 = resp1.data || [];
      const indexMap: any = {};
      list1.forEach((item: any) => {
        indexMap[item.index] = item;
      });
      const list = resp.data || [];

      list.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      const newList = list.map((item: any, index: number) => {
        const status = indexMap[item.merkleIndex] ? 3 : item.status;
        const createTime = moment(item.createdAt).utc().format('MMMM DD HH:mm UTC YYYY');
        return { ...item, status, createTime };
      });

      claimList.value = newList;
    };

    onMounted(() => {
      init();
    });

    watch(
      () => ethUserStore.account0,
      () => {
        init();
      }
    );

    return {
      ethUserStore,
      loading,
      claimList,
      async onPressItem(item: Item) {
        const resp1 = await http.postJSON({
          url: '/merkle/preclaim',
          data: { contract: nodeReworkContract, id: item._id },
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
        message.success('Claim success');
      },
    };
  },
});
</script>

<style scoped></style>
