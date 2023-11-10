<template>
  <NSpace class="w-full h-full bg-[#1a1c34]" vertical :wrap-item="false" align="center">
    <template v-if="!ethSign">
      <NSpace class="w-full h-full pt-[80px] px-12" vertical :wrap-item="false" align="center" :size="[0, 48]">
        <NText class="text-[40px] leading-[40px] font-bold text-white">Claim Your ARB EMC!</NText>
        <NText class="text-[20px] leading-[20px] text-white mt-3">Connect ICP Wallet</NText>
        <NSpace class="w-full py-[14px] rounded-lg bg-[#463A8E] cursor-pointer" justify="center" align="center" :size="[20, 0]" @click="onPressConnectETH">
          <img class="w-11 h-11" src="@/assets/wallet_meta_mask.png" alt="MetaMask" />
          <NText class="text-[18px] leading-[18px] text-white">MetaMask</NText>
        </NSpace>
        <!-- <NSpace class="w-full py-[14px] rounded-lg bg-[#463A8E] cursor-pointer" justify="center" align="center" :size="[20, 0]">
          <img class="w-11 h-11" src="@/assets/wallet_wallet_connect.png" alt="Wallet connect" />
          <NText class="text-[18px] leading-[18px] text-white">Wallet connect</NText>
        </NSpace> -->
      </NSpace>
    </template>
    <template v-else>
      <template v-if="!isViewHistory">
        <NSpace class="w-full h-full py-12" vertical :wrap-item="false" align="center">
          <NSpace class="w-full h-full" vertical :wrap-item="false" align="center" :size="[0, 0]">
            <NText class="mb-9 text-[32px] leading-[32px] font-bold text-white">You Can Claim</NText>
            <NSpace class="w-full h-[50px] px-8 bg-[#463A8E] text-[18px]" align="center" :wrap-item="false" :size="[0, 0]">
              <div class="flex-[0.45] text-white">Balance</div>
              <div class="flex-[0.45] text-white">Status</div>
              <div class="flex-[0.1] text-white">Action</div>
            </NSpace>
            <NSpace class="w-full px-8" :wrap-item="false" :size="[0, 0]">
              <template v-for="(item, index) in depositOrders" :key="item.id">
                <NSpace class="w-full py-3 text-base border-b border-solid border-gray-500" :wrap-item="false" justify="space-between" align="center">
                  <NText class="flex-[0.45] text-white">{{ item.toAmount }}</NText>
                  <NText class="flex-[0.45] text-white">{{ item.status ? 'withdrawn' : 'not withdrawn' }}</NText>
                  <NText class="flex-[0.1] text-[#397EFF] cursor-pointer" @click="onPressClaim(item, index)">Claim</NText>
                </NSpace>
              </template>
            </NSpace>
          </NSpace>
          <NText class="text-xs underline cursor-pointer" @click="onPressHistory">Check my claim history</NText>
        </NSpace>
      </template>
      <template v-else>
        <NSpace class="w-full h-full pt-12" vertical :wrap-item="false" align="center" :size="[0, 0]">
          <NText class="text-xl mb-10 leading-5 font-bold text-white">Claim history</NText>
          <img class="w-6 h-6 absolute top-7 left-9 cursor-pointer" src="@/assets/icon_back.svg" @click="onPressBack" />
          <template v-if="historyList.length !== 0">
            <NSpace class="w-full px-4 py-5 border-t border-dashed border-gray-500" :wrap-item="false" :size="[0, 20]">
              <NSpace class="w-full" justify="space-between" align="center">
                <NText depth="3">{{ '2023.10.23 10:35' }}</NText>
                <NText depth="3">{{ '2300.13 EMC' }}</NText>
              </NSpace>
            </NSpace>
          </template>
          <template v-else>
            <NSpace class="w-full h-full" :wrap-item="false" align="center" justify="center">
              <img class="w-[208px] h-[208px] -mt-[108px]" src="@/assets/img_history_none.svg" />
            </NSpace>
          </template>
        </NSpace>
      </template>
    </template>
  </NSpace>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { NSpace, NText, NRadioGroup, NRadio, useMessage } from 'naive-ui';
import { useETHUserStore } from '@/stores/eth-user';
import { ApiManager } from '@/web3/api';
import { MerkleClaimApi } from '@/web3/api/merkle-claim';
import { Utils } from '@/tools/utils';
import { Http } from '@/tools/http';

type DepositOrder = {
  _id: string;
  id: number;
  owner: string;
  from: string;
  fromAmount: string;
  to: string;
  toAmount: string;
  createdAt: string;
  updatedAt: string;
  proofIndex: number;
  proof: string[];
  status: boolean;
};
export default defineComponent({
  name: 'claim',
  components: { NSpace, NText, NRadioGroup, NRadio },

  setup() {
    const message = useMessage();
    const http = Http.getInstance();
    const ethUserStore = useETHUserStore();

    const apiManager = ApiManager.getInstance();
    const merkleClaimApi = apiManager.create(MerkleClaimApi, { address: '0xDFB8BE6F8c87f74295A87de951974362CedCFA30' });

    const historyList = ref([]);
    const isViewHistory = ref(false);

    const depositOrders = ref<Array<DepositOrder>>([]);

    const initDepositOrders = async () => {
      const resp = await http.get({
        url: 'https://api.edgematrix.pro/api/v1/icpconvertorder/query',
        data: { to: ethUserStore.account0 || undefined },
      });
      depositOrders.value = resp.data || [];

      const resp1 = await http.get({
        url: 'https://api.edgematrix.pro/api/v1/event/query',
        data: { contract: '0xDFB8BE6F8c87f74295A87de951974362CedCFA30', topic: 'Claimed' },
      });
      const claimeds = resp1.data || [];

      depositOrders.value.forEach((item: DepositOrder) => {
        item.status = claimeds.some((claimItem: any) => {
          return item.proofIndex === Number(claimItem.index);
        });
      });
    };

    watch(
      () => ethUserStore.account0,
      (val) => {
        if (val) {
          initDepositOrders();
        }
      },
      {
        immediate: true,
      }
    );

    return {
      ethSign: computed(() => ethUserStore.account0),
      depositOrders,
      isViewHistory,
      historyList,
      Utils,
      async onPressConnectETH() {
        await ethUserStore.signIn({ type: 'metamask' });
      },
      onPressHistory() {
        isViewHistory.value = true;
      },
      onPressBack() {
        isViewHistory.value = false;
      },
      async onPressClaim(item: DepositOrder, index: number) {
        if (item.status) {
          message.error('Cannot be Claimed repeatedly');
        }
        const resp = await merkleClaimApi.claim({
          index: item.proofIndex,
          account: item.to,
          amount: BigInt(item.toAmount),
          merkleProof: item.proof,
        });
        console.info(resp);
        if (resp._result === 0) {
          message.success('Claimed');
        }
      },
    };
  },
});
</script>
<style scoped></style>
