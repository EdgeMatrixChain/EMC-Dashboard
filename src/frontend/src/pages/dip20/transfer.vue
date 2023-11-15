<template>
  <NSpace class="w-full h-full px-12 bg-[#1a1c34]" vertical :wrap-item="false" align="center">
    <template v-if="!principal">
      <NSpace class="w-full h-full pt-[80px]" vertical :wrap-item="false" align="center" :size="[0, 48]">
        <NText class="text-[40px] leading-[40px] font-bold text-white">Transfer Your EMC </NText>
        <NText class="text-xl leading-5 text-white mt-3">Connect ICP Wallet</NText>
        <NCard style="width: 100%; background-color: #1a1c34" :bordered="false" content-style="padding:0">
          <Content bgColor="#463a8e" />
        </NCard>
        <!-- <NSpace class="w-full py-[14px] rounded-lg bg-[#463A8E] cursor-pointer" justify="center" align="center" :size="[20, 0]">
          <img class="w-11 h-11" src="@/assets/wallet_icp.png" alt="ICP" />
          <NText class="text-[18px] leading-[18px] text-white">INTERNET IDENTITY</NText>
        </NSpace>
        <NSpace class="w-full py-[14px] rounded-lg bg-[#463A8E] cursor-pointer" justify="center" align="center" :size="[20, 0]">
          <img class="w-11 h-11" src="@/assets/wallet_plug.png" alt="Plug" />
          <NText class="text-[18px] leading-[18px] text-white">Plug</NText>
        </NSpace> -->
      </NSpace>
    </template>
    <template v-else>
      <NSpin :show="initLoading">
        <NSpace class="w-full h-full min-h-[646px] pt-12" vertical :wrap-item="false" justify="space-between" align="center" :size="[0, 0]">
          <NSpace class="w-full h-full" vertical :wrap-item="false" align="center" :size="[0, 0]">
            <NText class="text-xl mb-10 leading-5 font-bold text-white">Convert your DIP20 EMC</NText>
            <NSpace class="w-full" :wrap-item="false" :size="[0, 28]">
              <NSpace class="w-full p-4 rounded-lg bg-[#2A2C47]" justify="space-between" align="center" :size="[20, 0]">
                <NSpace align="center" :size="[14, 0]">
                  <NSpace class="min-w-[120px]">
                    <NSpace class="px-4 py-2 h-10 rounded-full bg-[#604ECB]" justify="center" align="center">
                      <NText class="text-base text-white">Principal ID</NText>
                    </NSpace>
                  </NSpace>
                  <NText class="text-white">{{ Utils.formatAddress(principal, 11) }}</NText>
                </NSpace>
                <NSpace align="center" :size="[12, 0]">
                  <img class="w-5 h-5 cursor-pointer" src="@/assets/icon_unconnect.svg" @click="onPressUnConnect" />
                  <NTooltip placement="top-end" trigger="hover" :style="{ maxWidth: '400px', borderRadius: '8px', background: '#5F51AE' }" :arrow-style="{ background: '#5F51AE' }">
                    <template #trigger>
                      <img class="w-6 h-6 cursor-pointer" src="@/assets/icon_view_all.svg" />
                    </template>
                    <NText class="text-white">{{ principal }}</NText>
                  </NTooltip>
                </NSpace>
              </NSpace>
              <NSpace class="w-full p-4 rounded-lg bg-[#2A2C47]" justify="space-between" align="center" :size="[20, 0]">
                <NSpace align="center" :size="[14, 0]">
                  <NSpace class="min-w-[120px]">
                    <NSpace class="px-4 py-2 h-10 rounded-full bg-[#604ECB]" justify="center" align="center">
                      <NText class="text-base text-white">Account</NText>
                    </NSpace>
                  </NSpace>
                  <NText class="text-white">{{ Utils.formatAddress(account, 11) }}</NText>
                </NSpace>
                <NTooltip placement="top-end" trigger="hover" :style="{ maxWidth: '400px', borderRadius: '8px', background: '#5F51AE' }" :arrow-style="{ background: '#5F51AE' }">
                  <template #trigger>
                    <img class="w-6 h-6 cursor-pointer" src="@/assets/icon_view_all.svg" />
                  </template>
                  <NText class="text-white">{{ account }}</NText>
                </NTooltip>
              </NSpace>
              <NSpace class="w-full p-4 rounded-lg bg-[#2A2C47]" justify="space-between" align="center" :size="[20, 0]">
                <NSpace align="center" :size="[14, 0]">
                  <NSpace class="min-w-[120px]">
                    <NSpace class="px-4 py-2 h-10 rounded-full bg-[#604ECB]" justify="center" align="center">
                      <NText class="text-base text-white">Balance</NText>
                    </NSpace>
                  </NSpace>
                  <NText class="text-white">{{ `${balance} EMC` }} </NText>
                </NSpace>
                <NSpace align="center" :size="[14, 0]">
                  <img class="w-5 h-5 cursor-pointer" src="@/assets/icon_refresh.png" @click="onPressRefresh" />
                  <img class="w-7 h-7 bg-white rounded-full" src="@/assets/icon_coin_emc.png" />
                </NSpace>
              </NSpace>
            </NSpace>
            <NSpace class="w-full py-[10px] pl-[10px] border-b border-dashed border-gray-500" :size="[0, 8]">
              <NSpace class="w-full h-4 leading-4" justify="start" align="center" :size="[6, 0]">
                <img class="w-4 h-4" src="@/assets/icon_info.png" />
                <template v-if="whiteListInfo.owner">
                  <NText class="text-xs" depth="3">1 EMC (ARB) = 1 EMC (ICP) PreSale Whitelist</NText>
                </template>
                <template v-else>
                  <NText class="text-xs" depth="3">1 EMC (ARB) = 2.1 EMC (ICP)</NText>
                </template>
              </NSpace>
              <template v-if="whiteListInfo.owner">
                <div class="w-full">
                  <img class="w-4 h-4 mr-[6px] inline-block" src="@/assets/icon_success.png" />
                  <NText class="text-xs" style="text-shadow: 0px 0px 10px #ffffff">{{ `You are a participant in the pre-saleyou have ${whiteListInfo.quota} tokens will get anadditional ${whiteListInfo.quota} bonus` }}</NText>
                </div>
              </template>
            </NSpace>
          </NSpace>
          <NSpace class="w-full h-full py-4 flex-1" vertical align="center" justify="space-around">
            <template v-if="!ethPrincipal">
              <NSpace class="px-4" align="center" justify="center" :size="[20, 8]">
                <NSpace class="h-10 leading-10 px-4 rounded-lg bg-[#463A8E] border border-solid border-[#4248A7] cursor-pointer" :wrap-item="false" justify="center" align="center" :size="[12, 0]" @click="onPressConnectETH">
                  <img class="w-8 h-8" src="@/assets/wallet_meta_mask.png" alt="MetaMask" />
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
              <NSpace class="px-4" vertical align="center" :size="[0, 8]">
                <NSpace class="w-[362px] h-10 px-4 leading-10 rounded-lg bg-[#463A8E]" justify="space-between" align="center">
                  <img class="w-6 h-6" src="@/assets/icon_arbitrum.png" />
                  <NText class="text-white">{{ Utils.formatAddress(ethPrincipal, 11) }}</NText>
                  <div class="w-6 h-6"></div>
                </NSpace>
                <NText class="text-xs" depth="3">{{ `You are expected to receive ${tokenAmount !== 0 ? tokenAmount?.toFixed(4) : '0'} ARB EMC TOKEN` }}</NText>
              </NSpace>
            </template>
            <NSpace class="px-4" vertical align="center" :size="[0, 8]">
              <NSpace class="relative w-[232px] h-10 leading-10 rounded bg-gradient-to-r from-[#2F82FF] to-[#BC3BFB] overflow-hidden cursor-pointer" justify="center" @click="onPressDeposit">
                <NSpin :show="loading">
                  <NText class="text-white">Transfer</NText>
                  <!-- <img class="absolute inset-0" src="@/assets/icon_wallet_mask.png"  /> -->
                </NSpin>
              </NSpace>
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

type whiteListInfoType = {
  owner: string | undefined;
  used: string;
  quota: string;
};
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
    const whiteListInfo = ref<whiteListInfoType>({ owner: '', used: '', quota: '' });

    const init = async (principal: string) => {
      initLoading.value = true;
      const resp = await userStore.getWhiteListInfo({ principal: principal });

      if (resp.data !== undefined && ethers.formatUnits(resp.data.quota, 8) !== '0') {
        const data = {
          owner: resp.data?.owner.toString(),
          used: ethers.formatUnits(resp.data.used, 8),
          quota: ethers.formatUnits(resp.data.quota, 8),
        };
        whiteListInfo.value = data;
      }

      const resp1 = await http.get({
        url: 'https://api.edgematrix.pro/api/v1/dip20balance',
        data: { principal: principal },
      });
      balance.value = ethers.formatUnits(resp1.data, 8);
      initLoading.value = false;
    };

    const tokenAmount = computed(() => {
      const balanceAmount = Number(balance.value);
      if (balanceAmount === 0) return 0;
      if (whiteListInfo.value.quota) {
        const result = Math.min(balanceAmount, Number(whiteListInfo.value.quota));
        if (result !== 0) {
          return Number(result);
        }
      } else {
        return balanceAmount / RADIO;
      }
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
      account: computed(() => userStore.icpAccount),
      balance,
      whiteListInfo,
      tokenAmount,
      Utils,
      loading,
      initLoading,
      async onPressConnectETH() {
        await ethUserStore.signIn({ type: 'metamask' });
        message.success('Connect Success of MetaMmask');
      },
      onPressUnConnect() {
        if (loading.value === true) return;
        whiteListInfo.value = { owner: '', used: '', quota: '' };
        userStore.disconnect();
      },
      onPressRefresh() {
        if (!userStore.icpPrincipal) return;
        init(userStore.icpPrincipal);
      },
      async onPressDeposit() {
        if (!ethUserStore.account0) {
          message.error('No Connect of MetaMmask');
          return;
        }
        if (Number(balance.value) > 0) {
          loading.value = true;

          // return; principal: userStore.icpPrincipal,
          const resp = await userStore.dip20Approve({ amount: balance.value });
          console.info(resp);
          const resp2 = await userStore.deposit({ account: ethUserStore.account0, isWhiteList: Boolean(whiteListInfo.value.owner !== '') });
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
