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
      <NSpace class="w-full h-full py-12" vertical :wrap-item="false" align="center">
        <NSpace class="w-full h-full" vertical :wrap-item="false" align="center" :size="[0, 0]">
          <NText class="mb-9 text-[32px] leading-[32px] font-bold text-white">To be Claimed</NText>
          <NSpace class="w-full h-[50px] px-8 bg-[#463A8E] text-[18px]" align="center" :wrap-item="false" :size="[0, 0]">
            <div class="flex-[0.45] text-white">Amount</div>
            <div class="flex-[0.45] text-white">Status</div>
            <div class="flex-[0.1] text-white">Action</div>
          </NSpace>
          <NSpace class="w-full px-8" :wrap-item="false" :size="[0, 0]">
            <template v-for="(item, index) in orders" :key="item.id">
              <NSpace class="w-full py-3 text-base border-b border-solid border-gray-500" :wrap-item="false" justify="space-between" align="center">
                <NText class="flex-[0.45] text-white">{{ Number(ethers.formatUnits(item.toAmount, 18)).toFixed(4) }}</NText>
                <NText class="flex-[0.45] text-white">{{ item.status ? (item.claimed ? orderStatus[0] : orderStatus[2]) : orderStatus[1] }}</NText>
                <NText class="flex-[0.1] cursor-pointer" :style="{ color: item.status && !item.claimed ? '#397EFF' : '#bbb' }" @click="onPressClaim(item, index)">Claim</NText>
              </NSpace>
            </template>
          </NSpace>
        </NSpace>
      </NSpace>
    </template>
  </NSpace>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { NSpace, NText, NRadioGroup, NRadio, useMessage } from 'naive-ui';
import { useETHUserStore } from '@/stores/eth-user';
import { useUserStore } from '@/stores/user';
import { ApiManager } from '@/web3/api';
import { MerkleClaimApi } from '@/web3/api/merkle-claim';
import { Utils } from '@/tools/utils';
import { Http } from '@/tools/http';
import { ethers } from 'ethers';

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
  status: string;
};

type Order = {
  createdAt: string;
  from: string;
  fromAmount: string;
  id: number;
  owner: string;
  to: string;
  toAmount: string;
  proofIndex: number;
  proof: string[];
  status: boolean;
  claimed: boolean;
};

export default defineComponent({
  name: 'claim',
  components: { NSpace, NText, NRadioGroup, NRadio },
  props: {
    isTransfer: { type: Boolean, default: false },
  },
  emits: ['update'],

  setup(props, context) {
    const message = useMessage();
    const http = Http.getInstance();
    const ethUserStore = useETHUserStore();
    const userStore = useUserStore();

    const apiManager = ApiManager.getInstance();
    const merkleClaimApi = apiManager.create(MerkleClaimApi, { address: '0x77cD77D841F7547AECb93c1Aa39d976495fBCAA1' });

    const orders = ref<Array<Order>>([]);
    const depositOrders = ref<Array<DepositOrder>>([]);

    const initDepositOrders = async () => {
      //convert order
      const resp = await http.get({
        url: 'https://api.edgematrix.pro/api/v1/icpconvertorder/query',
        data: { to: ethUserStore.account0 || undefined },
      });
      depositOrders.value = resp.data || [];
      console.log(depositOrders.value);

      //ALL  Claimed
      const resp1 = await http.get({
        url: 'https://api.edgematrix.pro/api/v1/event/query',
        data: { contract: '0x77cd77d841f7547aecb93c1aa39d976495fbcaa1', topic: 'Claimed' },
      });
      const claimeds = resp1.data || [];

      // ALL Transfer
      const resp2 = await userStore.getOrders();
      orders.value = [];
      resp2.data.map((item: any) => {
        // item.owner.toString() === userStore.icpPrincipal &&
        if (item.to === ethUserStore.account0) {
          item.from = item.from.toString();
          item.owner = item.owner.toString();
          item.toAmount = ethers.formatUnits(item.toAmount, 0);
          orders.value.push(item);
        }
      });

      orders.value.forEach((item: Order) => {
        item.status = depositOrders.value.some((depositItem: DepositOrder) => {
          if (item.id === depositItem.id) {
            item.proof = depositItem.proof;
            item.proofIndex = depositItem.proofIndex;
          }
          return item.id === depositItem.id;
        });
        item.claimed = claimeds.some((claimItem: any) => {
          return item.proofIndex === Number(claimItem.index);
        });
      });
      console.log(orders.value);
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
    watch(
      () => props.isTransfer,
      (val) => {
        if (val) {
          initDepositOrders();
          context.emit('update');
        }
      }
      // {
      //   immediate: true,
      // }
    );

    return {
      ethers,
      orders,
      ethSign: computed(() => ethUserStore.account0),
      orderStatus: ['withdrawn', 'pending', 'not withdrawn'],
      async onPressConnectETH() {
        await ethUserStore.signIn({ type: 'metamask' });
      },
      async onPressClaim(item: Order, index: number) {
        if (!item.status || item.claimed) {
          message.error('Cannot be Claimed repeatedly');
          return;
        }
        const resp = await merkleClaimApi.claim({
          index: item.proofIndex,
          account: item.to,
          amount: BigInt(item.toAmount),
          merkleProof: item.proof,
        });
        console.info(resp);
        if (resp._result === 0) {
          item.claimed = true;
          message.success('Claimed');
        } else {
          message.error('Claim error');
        }
      },
    };
  },
});
</script>
<style scoped></style>
