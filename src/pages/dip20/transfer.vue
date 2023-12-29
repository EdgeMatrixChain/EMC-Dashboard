<template>
  <NSpace class="w-full h-full px-4 xl:px-12 bg-[#1a1c34]" vertical :wrap-item="false" align="center">
    <template v-if="!principal">
      <div class="flex flex-col items-center w-full h-full pt-10 pb-5 xl:pt-[80px] xl:pb-0 gap-y-3 xl:gap-y-12">
        <NText class="text-[20px] xl:text-[40px] leading-[20px] xl:leading-[40px] font-bold text-white">Transfer Your EMC </NText>
        <NText class="xl:text-xl leading-5 text-white mt-0 mb-2 xl:mb-0 xl:mt-3">Connect ICP Wallet</NText>
        <NCard class="max-w-lg" style="width: 100%; background-color: #1a1c34" :bordered="false" content-style="padding:0">
          <Content bgColor="#463a8e" />
        </NCard>
      </div>
    </template>
    <template v-else>
      <NSpin :show="initLoading">
        <NSpace class="w-full h-full xl:min-h-[646px] pt-8 pb-5 xl:py-[80px]" vertical :wrap-item="false" justify="space-between" align="center" :size="[0, 0]">
          <NSpace class="w-full h-full" vertical :wrap-item="false" align="center" :size="[0, 0]">
            <NText class="text-[20px] leading-5 xl:text-[32px] xl:leading-8 mb-9 xl:mb-10 font-bold text-white">Convert your DIP20 EMC</NText>
            <NSpace class="w-full" :wrap-item="false" :size="[0, 32]">
              <NSpace class="w-full p-3 xl:px-4 xl:py-[18px] rounded-lg bg-[#2A2C47]" justify="space-between" align="center" :wrap="false" :size="[20, 0]">
                <NSpace class="h-8 xl:h-10" align="center" :wrap="false" :size="[14, 0]">
                  <NSpace class="min-w-[120px]">
                    <NSpace class="px-4 py-2 h-10 rounded-full bg-[#443C68]" justify="center" align="center">
                      <NText class="text-base text-white">Principal ID</NText>
                    </NSpace>
                  </NSpace>
                  <NText class="text-white">{{ principalStr }}</NText>
                </NSpace>
                <NSpace align="center" :wrap="false" :size="[12, 0]">
                  <img class="w-4 xl:w-5 h-4 xl:h-5 cursor-pointer" src="@/assets/icon_unconnect.svg" @click="onPressUnConnect" />
                  <NTooltip placement="top-end" trigger="click" :style="{ maxWidth: '350px', borderRadius: '8px', background: '#5F51AE' }" :arrow-style="{ background: '#5F51AE' }">
                    <template #trigger>
                      <img class="w-4 xl:w-6 h-4 xl:h-6 cursor-pointer" src="@/assets/icon_view_all.svg" />
                    </template>
                    <NText class="text-white">{{ principal }}</NText>
                  </NTooltip>
                </NSpace>
              </NSpace>
              <!-- <NSpace class="w-full p-4 rounded-lg bg-[#2A2C47]" justify="space-between" align="center" :size="[20, 0]">
                <NSpace align="center" :size="[14, 0]">
                  <NSpace class="min-w-[120px]">
                    <NSpace class="px-4 py-2 h-10 rounded-full bg-[#604ECB]" justify="center" align="center">
                      <NText class="text-base text-white">Account</NText>
                    </NSpace>
                  </NSpace>
                  <NText class="text-white">{{ accountStr }}</NText>
                </NSpace>
                <NTooltip placement="top-end" trigger="hover" :style="{ maxWidth: '400px', borderRadius: '8px', background: '#5F51AE' }" :arrow-style="{ background: '#5F51AE' }">
                  <template #trigger>
                    <img class="w-6 h-6 cursor-pointer" src="@/assets/icon_view_all.svg" />
                  </template>
                  <NText class="text-white">{{ account }}</NText>
                </NTooltip>
              </NSpace> -->
              <NSpace class="w-full p-3 xl:px-4 xl:py-[18px] rounded-lg bg-[#2A2C47]" justify="space-between" align="center" :wrap="false" :size="[20, 0]">
                <NSpace class="h-8 xl:h-10" align="center" :wrap="false" :size="[14, 0]">
                  <NSpace class="min-w-[120px]">
                    <NSpace class="px-4 py-2 h-10 rounded-full bg-[#443C68]" justify="center" align="center">
                      <NText class="text-base text-white">Balance</NText>
                    </NSpace>
                  </NSpace>
                  <NText class="text-white">{{ `${balance} EMC` }} </NText>
                </NSpace>
                <NSpace align="center" :size="[14, 0]">
                  <img class="w-4 h-4 xl:w-5 xl:h-5 cursor-pointer" src="@/assets/icon_refresh.png" @click="onPressRefresh" />
                  <img class="w-6 h-6 xl:w-7 xl:h-7 bg-white rounded-full" src="@/assets/icon_coin_emc.png" />
                </NSpace>
              </NSpace>
            </NSpace>
            <NSpace class="w-full py-[10px] pl-[10px] border-b border-dashed border-gray-500" :size="[0, 8]">
              <NSpace class="w-full h-4 leading-4" justify="start" align="center" :size="[6, 0]">
                <img class="w-4 h-4" src="@/assets/icon_info.png" />
                <!-- <template v-if="whiteListInfo.owner">
                  <NText class="text-xs" depth="3">1 EMC (ARB) = 1 EMC (ICP) PreSale Whitelist</NText>
                </template> -->
                <NText class="text-xs" depth="3">2.1 EMC (ICP) = 1 EMC (ARB)</NText>
              </NSpace>
              <!-- <template v-if="whiteListInfo.owner">
                <div class="w-full">
                  <img class="w-4 h-4 mr-[6px] inline-block" src="@/assets/icon_success.png" />
                  <NText class="text-xs" style="text-shadow: 0px 0px 10px #ffffff">{{ `You are a participant in the pre-saleyou have ${whiteListInfo.quota} tokens will get anadditional ${whiteListInfo.quota} bonus` }}</NText>
                </div>
              </template> -->
            </NSpace>
          </NSpace>
          <NSpace class="w-full h-full pt-5 xl:pt-8 xl:flex-1" vertical align="center" justify="space-between" :wrap-item="false">
            <template v-if="!ethPrincipal">
              <NSpace class="text-center" vertical align="center" justify="center" :wrap-item="false" :size="[20, 8]">
                <NSpace
                  class="w-full xl:w-[360px] h-11 leading-11 px-4 rounded-lg bg-[#463A8E] border border-solid border-[#4248A7] cursor-pointer"
                  :wrap-item="false"
                  justify="center"
                  align="center"
                  :size="[12, 0]"
                  @click="onPressConnectETH"
                >
                  <img class="w-6 xl:w-8 h-6 xl:h-8" src="@/assets/wallet_meta_mask.png" alt="MetaMask" />
                  <NText class="text-white">MetaMask</NText>
                </NSpace>
                <NText class="text-xs" depth="3">Connect Metamask and Receive your EMC TOKEN on ARBITRUM</NText>
                <!-- <NSpace class="h-10 leading-10 px-4 rounded-lg bg-[#463A8E] border border-solid border-[#4248A7] cursor-pointer" :wrap-item="false" justify="center" align="center" :size="[12, 0]">
                  <img class="w-8 h-8" src="@/assets/wallet_wallet_connect.png" alt="Wallet connect" />
                  <NText class="text-white">Wallet connect</NText>
                </NSpace> -->
              </NSpace>
            </template>
            <template v-else>
              <NSpace vertical align="center" :size="[0, 8]">
                <NSpace class="w-[362px] h-11 leading-11 px-4 rounded-lg bg-[#463A8E]" justify="space-between" align="center">
                  <img class="w-6 h-6 bg-[#7065B1] rounded-full p-[2px]" src="@/assets/icon_arbitrum.svg" />
                  <NText class="text-white">{{ Utils.formatAddress(ethPrincipal, 11) }}</NText>
                  <NSpace align="center" :size="[12, 0]">
                    <img class="w-5 h-5 cursor-pointer" src="@/assets/icon_unconnect.svg" @click="onPressUnConnectETH" />
                    <NTooltip placement="top-end" trigger="hover" :style="{ maxWidth: '400px', borderRadius: '8px', background: '#5F51AE' }" :arrow-style="{ background: '#5F51AE' }">
                      <template #trigger>
                        <img class="w-6 h-6 cursor-pointer" src="@/assets/icon_view_all.svg" />
                      </template>
                      <NText class="text-white">{{ ethPrincipal }}</NText>
                    </NTooltip>
                  </NSpace>
                </NSpace>
                <NText class="text-xs" depth="3">{{ `You are expected to receive ${tokenAmount !== 0 ? tokenAmount?.toFixed(4) : '0'} ARB EMC TOKEN` }}</NText>
              </NSpace>
            </template>
            <NSpace class="relative w-[232px] h-10 leading-10 mt-5 xl:mt-0 rounded bg-gradient-to-r from-[#2F82FF] to-[#BC3BFB] overflow-hidden cursor-pointer" justify="center" @click="onPressDeposit">
              <NSpin :show="loading">
                <NText class="text-white">Transfer</NText>
                <!-- <img class="absolute inset-0" src="@/assets/icon_wallet_mask.png"  /> -->
              </NSpin>
            </NSpace>
          </NSpace>
        </NSpace>
      </NSpin>
    </template>
  </NSpace>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import { NSpace, NText, NIcon, NButton, NTooltip, NCard, NSpin, useMessage } from 'naive-ui';
import { Http } from '@/tools/http';
import { Utils } from '@/tools/utils';
import { ethers } from 'ethers';
import { useUserStore } from '@/stores/user';
import { useETHUserStore } from '@/stores/eth-user';

import Content from '@/components/icp-connect/content.vue';

// type whiteListInfoType = {
//   owner: string | undefined;
//   used: string;
//   quota: string;
// };
export default defineComponent({
  name: 'transfer',
  components: { NSpace, NText, NIcon, NButton, NTooltip, NCard, NSpin, Content },
  props: {
    isUpdate: { type: Boolean, default: false },
  },
  emits: ['success', 'update'],

  setup(props, context) {
    const RADIO = 2.1;

    const http = Http.getInstance();
    const userStore = useUserStore();
    const ethUserStore = useETHUserStore();
    const message = useMessage();

    const loading = ref(false);
    const initLoading = ref(false);

    const balance = ref('0');
    // const whiteListInfo = ref<whiteListInfoType>({ owner: '', used: '', quota: '' });

    const init = async (principal: string) => {
      initLoading.value = true;
      // const resp = await userStore.getWhiteListInfo({ principal: principal });

      // if (resp.data !== undefined && ethers.formatUnits(resp.data.quota, 8) !== '0') {
      //   const data = {
      //     owner: resp.data?.owner.toString(),
      //     used: ethers.formatUnits(resp.data.used, 8),
      //     quota: ethers.formatUnits(resp.data.quota, 8),
      //   };
      //   whiteListInfo.value = data;
      // }

      const resp1 = await http.get({
        url: 'https://api.edgematrix.pro/api/v1/dip20balance',
        data: { principal: principal },
      });
      balance.value = ethers.formatUnits(resp1.data, 8);
      initLoading.value = false;
    };

    const tokenAmount = computed(() => {
      const balanceAmount = Number(balance.value);
      // if (balanceAmount === 0) return 0;
      // if (whiteListInfo.value.quota) {
      //   const result = Math.min(balanceAmount, Number(whiteListInfo.value.quota));
      //   if (result !== 0) {
      //     return Number(result);
      //   }
      // } else {
      return balanceAmount / RADIO;

      // }
    });

    watch(
      () => userStore.icpPrincipal,
      (val) => {
        if (val) {
          init(val);
          message.success('Connect Success');
        }
      }
    );
    watch(
      () => props.isUpdate,
      (val) => {
        if (val) {
          if (!userStore.icpPrincipal) return;
          init(userStore.icpPrincipal);
          context.emit('update');
        }
      }
    );

    return {
      ethPrincipal: computed(() => ethUserStore.account0),
      principal: computed(() => userStore.icpPrincipal),
      principalStr: computed(() => Utils.formatAddress(userStore.icpPrincipal, 8)),
      account: computed(() => userStore.icpAccount),
      accountStr: computed(() => Utils.formatAddress(userStore.icpAccount, 8)),

      balance,
      // whiteListInfo,
      tokenAmount,
      Utils,
      loading,
      initLoading,
      async onPressConnectETH() {
        await ethUserStore.signIn();
        message.success('Connection successful');
      },
      onPressUnConnect() {
        if (loading.value === true) return;
        // whiteListInfo.value = { owner: '', used: '', quota: '' };
        userStore.disconnect();
      },

      onPressUnConnectETH() {
        if (loading.value === true) return;
        ethUserStore.signOut();
      },
      onPressRefresh() {
        if (!userStore.icpPrincipal) return;
        init(userStore.icpPrincipal);
      },
      async onPressDeposit() {
        if (ethUserStore.isInvalidConnect) {
          message.error('No Connection of Metamask');
          return;
        }
        if (Number(balance.value) > 0) {
          loading.value = true;

          // return; principal: userStore.icpPrincipal,
          const resp = await userStore.dip20Approve({ amount: balance.value });
          console.info(resp);
          const resp2 = await userStore.deposit({ account: ethUserStore.account0, isWhiteList: false });
          console.info(resp2);
          if (resp2._result !== 0) {
            message.error('Error');
          } else {
            message.success('Success');
          }
          loading.value = false;
          init(userStore.icpPrincipal);
          context.emit('success');
        } else {
          message.error('Insufficient balance');
        }
      },
    };
  },
});
</script>
<style scoped></style>
