<template>
  <div class="page max-w-[880px]" style="margin: auto">
    <NCard>
      <template #header>
        <NSpace vertical justify="space-between" :wrap-item="false">
          <NText>Node Rewards</NText>
        </NSpace>
      </template>
      <NSpace vertical align="center" justify="center" :wrap-item="false" style="min-height: 120px">
        <template v-if="!ethUserStore.account0">
          <NText>Not Connected</NText>
        </template>
        <template v-else-if="ethUserStore.isInvalidNetwork">
          <NText>Please switch to arbitrum one first</NText>
        </template>
        <template v-else>
          <Content />
        </template>
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
import Content from './content.vue';

export default defineComponent({
  name: 'claim-node-rewards',
  components: { NModal, NCard, NText, NInput, NSpace, NButton, NAlert, NIcon, NSpin, NSkeleton, IconClose, Content },
  emits: ['update:visible', 'success'],
  setup(props, ctx) {
    const message = useMessage();
    const http = Http.getInstance();
    const ethUserStore = useETHUserStore();
    const networkConfig = getDefaultNetwork();
    const nodeReworkContract = networkConfig.smarts.nodeReward.contract;
    const apiManager = ApiManager.getInstance();
    const merkleClaimApi = apiManager.create<MerkleClaimApi>(MerkleClaimApi, { address: nodeReworkContract });

    const error = ref(-1);
    const errorText = ref('');
    const claimList = ref<Item[]>([]);

    return {
      error,
      errorText,
      claimList,
      ethUserStore,
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
        message.success('Claime success');
      },
    };
  },
});
</script>

<style scoped></style>
