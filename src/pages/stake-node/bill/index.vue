<template>
  <NCard style="max-width:880px;">
    <template #header>
      <NSpace vertical justify="space-between" :wrap-item="false" :size="[4, 4]">
        <NText>Rewards</NText>
      </NSpace>
    </template>
    <NSpace vertical justify="center" :wrap-item="false" :size="[16, 16]">
      <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
        <NText depth="3" style="font-size:14px">Current Reward</NText>
        <NText class="text-[18px]" strong>{{ currentRewardStr }} {{ tokenSymbol }}</NText>
      </NSpace>
      <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
        <NText depth="3" style="font-size:14px">Check out Reward</NText>
        <NText class="text-[18px]" strong>{{ withdrawRewardStr }} {{ tokenSymbol }}</NText>
      </NSpace>
      <Table :data="rewardList" />
      <NButton type="primary" strong size="large" round :loading="loadings.withdraw" @click="onPressWithdraw"
        style="background-color:var(--n-color);width:100%;">Check out rewards</NButton>
    </NSpace>
  </NCard>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, computed, watch, ref } from 'vue';
import { NModal, NCard, NText, NInput, NSpace, NButton, NAlert, NIcon, NSpin, NSkeleton, useMessage } from 'naive-ui';
import { Close as IconClose } from '@vicons/ionicons5';
import { ethers } from 'ethers';
import { ApiManager } from '@/web3/api';
import { StakeNodeApi } from '@/web3/api/stake-node';
import { ERC20Api } from '@/web3/api/erc20';
import { useETHUserStore } from '@/stores/eth-user';
import { Http } from '@/tools/http';
import type { Item } from './table.vue';
import Table from './table.vue';

export default defineComponent({
  name: 'bill',
  components: { NModal, NCard, NText, NInput, NSpace, NButton, NAlert, NIcon, NSpin, NSkeleton, IconClose, Table },
  props: {
    nodeId: { type: String, default: false },
    stakeContract: { type: String, default: false },
    tokenContract: { type: String, default: false },
  },
  emits: ['update:visible', 'success',],
  setup(props, ctx) {
    const message = useMessage();
    const http = Http.getInstance();
    const ethUserStore = useETHUserStore();
    const apiManager = ApiManager.getInstance();
    let stakeNodeApi: StakeNodeApi | null = null;
    let tokenApi: ERC20Api | null = null;
    const error = ref(-1);
    const errorText = ref('');
    const inputTokenAmount = ref('');
    const rewardList = ref<Item[]>([]);
    const currentReward = ref(0n);
    const withdrawReward = ref(0n);
    const tokenDecimal = ref(0);
    const tokenName = ref('');
    const tokenSymbol = ref('');
    const tokenBalance = ref<bigint>(0n);
    const loadings = ref({ withdraw: false, info: false });

    const init = async () => {
      error.value = -1;
      errorText.value = '';

      stakeNodeApi = apiManager.create<StakeNodeApi>(StakeNodeApi, { address: props.stakeContract });
      tokenApi = apiManager.create<ERC20Api>(ERC20Api, { address: props.tokenContract });

      const [
        { data: _tokenName },
        { data: _tokenSymbol },
        { data: _tokenDecimals },
      ] = await Promise.all([
        tokenApi.name(),
        tokenApi.symbol(),
        tokenApi.decimals(),
      ]);

      const resp = await http.get({
        url: '/nodebill/list',
        data: { nodeId: props.nodeId, page: 1, size: 99 }
      });
      const list = resp.data || [];
      rewardList.value = list;

      const resp1 = await http.get({
        url: '/nodebill/summary',
        data: { nodeId: props.nodeId }
      });
      const { billTotal, withdrawTotal } = resp1.data;
      currentReward.value = BigInt(billTotal || 0) - BigInt(withdrawTotal || 0);
      withdrawReward.value = withdrawTotal;

      tokenName.value = _tokenName;
      tokenSymbol.value = _tokenSymbol;
      tokenDecimal.value = Number(_tokenDecimals);

      error.value = 0;
    };

    onMounted(() => {
      init();
    })

    return {
      error,
      errorText,
      rewardList,
      currentReward,
      currentRewardStr: computed(() => ethers.formatUnits(currentReward.value, tokenDecimal.value)),
      withdrawReward,
      withdrawRewardStr: computed(() => ethers.formatUnits(withdrawReward.value, tokenDecimal.value)),
      tokenSymbol,
      tokenBalanceStr: computed(() => ethers.formatUnits(tokenBalance.value, tokenDecimal.value)),
      ethUserStore,
      loadings,
      onPressClose() {
        ctx.emit('update:visible', false);
      },
      async onPressWithdraw() {
        const nodeId = props.nodeId;
        const amount = currentReward.value;
        loadings.value.withdraw = true;
        const resp = await http.postJSON({
          url: '/nodebill/withdraw',
          data: { nodeId, amount: amount.toString() }
        })
        loadings.value.withdraw = false;
        if (resp._result !== 0) {
          message.warning(resp._desc);
          return;
        }
        await init();
        ctx.emit('success');
      },
    };
  },
});
</script>
  
<style scoped></style>
  