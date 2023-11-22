<template>
  <NSpace class="w-full h-full bg-[#1a1c34]" vertical :wrap-item="false" align="center">
    <template v-if="!ethPrincipal">
      <div class="flex flex-col items-center w-full h-full px-4 xl:px-12 pt-5 pb-[40px] xl:pt-[80px] gap-y-3 xl:gap-y-12">
        <NText class="text-[20px] xl:text-[40px] leading-[20px] xl:leading-[40px] font-bold text-white">Claim Your ARB EMC!</NText>
        <NText class="xl:text-xl leading-5 text-white mt-0 mb-2 xl:mb-0 xl:mt-3">Connect ICP Wallet</NText>
        <NSpace class="wallet-border max-w-lg w-full h-[56px] xl:h-[72px]" align="center" justify="center" :wrap-item="false">
          <NSpace class="wallet-content w-full h-full py-[14px] rounded-lg bg-[#463A8E] cursor-pointer" justify="center" align="center" :size="[20, 0]" @click="onPressConnectETH">
            <img class="w-9 h-9 xl:w-11 xl:h-11" src="@/assets/wallet_meta_mask.png" alt="MetaMask" />
            <NText class="xl:text-[18px] xl:leading-[18px] text-white">MetaMask</NText>
          </NSpace>
        </NSpace>

        <!-- <NSpace class="w-full py-[14px] rounded-lg bg-[#463A8E] cursor-pointer" justify="center" align="center" :size="[20, 0]">
          <img class="w-11 h-11" src="@/assets/wallet_wallet_connect.png" alt="Wallet connect" />
          <NText class="text-[18px] leading-[18px] text-white">Wallet connect</NText>
        </NSpace> -->
      </div>
    </template>
    <template v-else>
      <NSpace class="w-full h-full pt-10 xl:pt-[60px] pb-[40px]" vertical :wrap-item="false" align="center">
        <NSpin class="w-full h-full" :show="loading">
          <NSpace class="w-full h-full" vertical :wrap-item="false" align="center" :size="[0, 0]">
            <NText class="text-[20px] leading-5 xl:text-[32px] xl:leading-8 mb-4 xl:mb-10 font-bold text-white">To be Claimed</NText>
            <NSpace class="w-[362px] h-10 px-4 mb-6 xl:mb-8 leading-10 rounded-lg bg-[#463A8E]" justify="space-between" align="center">
              <img class="w-6 h-6 bg-[#7065B1] rounded-full p-[2px]" src="@/assets/icon_arbitrum.svg" />
              <NText class="text-white">{{ ethPrincipalStr }}</NText>
              <NSpace align="center" :size="[12, 0]">
                <img class="w-5 h-5 cursor-pointer" src="@/assets/icon_unconnect.svg" @click="onPressUnConnectETH" />
                <NTooltip placement="top-end" trigger="click" :style="{ maxWidth: '350px', borderRadius: '8px', background: '#5F51AE' }" :arrow-style="{ background: '#5F51AE' }">
                  <template #trigger>
                    <img class="w-6 h-6 cursor-pointer" src="@/assets/icon_view_all.svg" />
                  </template>
                  <NText class="text-white">{{ ethPrincipal }}</NText>
                </NTooltip>
              </NSpace>
            </NSpace>
            <NSpace class="w-full h-[50px] px-8 bg-[#463A8E] text-[14px] xl:text-[18px]" align="center" justify="space-between" :wrap-item="false" :size="[0, 0]">
              <div class="flex-[0.3] text-white">Amount</div>
              <div class="flex-[0.45] text-white">Status</div>
              <div class="flex-[0.25] text-white flex items-center justify-start gap-x-4 xl:gap-x-9">
                <NText>Action</NText>
                <img class="w-4 h-4 xl:w-5 xl:h-5 cursor-pointer" src="@/assets/icon_refresh.png" @click="onPressRefresh" />
              </div>
            </NSpace>
            <NSpace class="table xl:overflow-auto w-full px-8 xl:max-h-[368px]" :wrap-item="false" :size="[0, 0]">
              <template v-for="(item, index) in orders" :key="item.id">
                <NSpace class="w-full py-3 text-[12px] xl:text-base border-b border-solid border-gray-500" :wrap-item="false" justify="space-between" align="center" :size="[0, 0]">
                  <NText class="flex-[0.3] text-white">{{ Number(item.toAmount).toFixed(4) }}</NText>
                  <NText class="flex-[0.45] text-white">{{ item.status ? (item.claimed ? orderStatus[0] : orderStatus[2]) : orderStatus[1] }}</NText>
                  <div class="flex-[0.25] text-left">
                    <NButton class="w-[80px]" ghost :color="item.status && !item.claimed ? '#397EFF' : '#626273'" @click="onPressClaim(item, index)"> Claim </NButton>
                  </div>
                </NSpace>
              </template>
            </NSpace>
          </NSpace>
        </NSpin>
      </NSpace>
    </template>
  </NSpace>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { NSpace, NText, NSpin, NRadioGroup, NTooltip, NButton, useMessage } from 'naive-ui';
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
  components: { NSpace, NText, NRadioGroup, NTooltip, NButton, NSpin },
  props: {
    isUpdate: { type: Boolean, default: false },
  },
  emits: ['update'],

  setup(props, context) {
    const message = useMessage();
    const http = Http.getInstance();
    const ethUserStore = useETHUserStore();
    const userStore = useUserStore();

    const apiManager = ApiManager.getInstance();
    const merkleClaimApi = apiManager.create(MerkleClaimApi, { address: '0xe485b19Cd1bF9bD417c05ff1d7336789727dB0b9' });

    const loading = ref(false);
    const orders = ref<Array<Order>>([]);
    const depositOrders = ref<Array<DepositOrder>>([]);

    const initDepositOrders = async () => {
      loading.value = true;

      //convert order
      const resp = await http.get({
        url: 'https://api.edgematrix.pro/api/v1/icpconvertorder/query',
        data: { to: ethUserStore.account0 || undefined },
      });
      depositOrders.value = resp.data || [];
      const convertOrders = new Map<number, any>();
      (resp.data || []).forEach((item: any) => {
        convertOrders.set(item.id, item);
      });
      //ALL  Claimed
      const resp1 = await http.get({
        url: 'https://api.edgematrix.pro/api/v1/event/query',
        data: { contract: '0xe485b19Cd1bF9bD417c05ff1d7336789727dB0b9', topic: 'Claimed', size: 100 },
      });
      const claimeds = new Map<number, any>();
      (resp1.data || []).forEach((item: any) => {
        claimeds.set(Number(item.index), item);
      });
      // ALL Transfer
      const { data: rawData } = await userStore.getOrders();
      const newRawData = rawData.filter((item) => item.to.toLocaleLowerCase() === ethUserStore.account0.toLocaleLowerCase());
      const _orders: Order[] = [];
      newRawData.forEach((item) => {
        const newItem: any = {
          ...item,
          from: item.from.toString(),
          owner: item.owner.toString(),
          toAmount: ethers.formatUnits(item.toAmount, 18),
          status: false,
          claimed: false,
        };
        const converted = convertOrders.get(item.id);
        if (converted) {
          newItem.proof = converted.proof;
          newItem.proofIndex = converted.proofIndex;
          newItem.status = true;
          const claimed = claimeds.get(newItem.proofIndex);
          if (claimed) {
            newItem.claimed = true;
          }
        }
        _orders.push(newItem);
      });
      console.info(_orders);
      orders.value = _orders;
      // rawData.map((item: any) => {
      //   // item.owner.toString() === userStore.icpPrincipal &&
      //   if (item.to === ethUserStore.account0) {
      //     item.from = item.from.toString();
      //     item.owner = item.owner.toString();
      //     item.toAmount = ethers.formatUnits(item.toAmount, 0);
      //     orders.value.push(item);
      //   }
      // });

      // orders.value.forEach((item: Order) => {
      //   item.status = depositOrders.value.some((depositItem: DepositOrder) => {
      //     if (item.id === depositItem.id) {
      //       item.proof = depositItem.proof;
      //       item.proofIndex = depositItem.proofIndex;
      //     }
      //     return item.id === depositItem.id;
      //   });
      //   item.claimed = claimeds.some((claimItem: any) => {
      //     return item.proofIndex === Number(claimItem.index);
      //   });
      // });
      // console.log(orders.value);

      loading.value = false;
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
      () => props.isUpdate,
      (val) => {
        if (val) {
          initDepositOrders();
          context.emit('update');
        }
      }
    );

    return {
      ethers,
      orders,
      loading,
      ethPrincipal: computed(() => ethUserStore.account0),
      ethPrincipalStr: computed(() => Utils.formatAddress(ethUserStore.account0, 11)),

      orderStatus: ['withdrawn', 'pending', 'not withdrawn'],
      async onPressConnectETH() {
        await ethUserStore.signIn({ type: 'metamask' });
      },
      onPressRefresh() {
        initDepositOrders();
        context.emit('update');
      },
      onPressUnConnectETH() {
        ethUserStore.signOut();
      },
      async onPressClaim(item: Order, index: number) {
        if (!item.status || item.claimed) {
          message.error('Cannot be Claimed repeatedly');
          return;
        }
        const resp1 = await http.get({
          url: 'https://api.edgematrix.pro/api/v1/icpconvertorder/query',
          data: { id: item.id },
        });
        const { proofIndex, to, toAmount, proof } = resp1.data[0];

        const resp = await merkleClaimApi.claim({
          index: proofIndex,
          account: to.toLocaleLowerCase(),
          amount: BigInt(toAmount),
          merkleProof: proof,
        });
        console.info(proofIndex, to, toAmount, JSON.stringify(proof));

        console.info(resp);
        if (resp._result === 0) {
          item.claimed = true;
          message.success('Claimed');
        } else {
          if (resp._desc?.startsWith('Error: execution reverted')) {
            message.error('Claim error');
          } else {
            message.error('Claim cancel');
          }
        }
      },
    };
  },
});
</script>
<style scoped>
.table::-webkit-scrollbar {
  display: none;
}
.wallet-border {
  position: relative;
  border-radius: 8px;
  background-image: linear-gradient(to right, #4142f1, #0adac3, #d356f3, #f47e63, #4142f1);
  background-size: 400%;
  animation: border 12s linear infinite;
  z-index: 1;
  box-sizing: border-box;
  border: 2px solid;
  border-color: #4248a7;
}
.wallet-content {
  border-radius: 6px;
  padding: 10px;
}

.wallet-border:hover {
  border-color: transparent;
}

@keyframes border {
  100% {
    background-position: -400% 0;
  }
}
</style>
