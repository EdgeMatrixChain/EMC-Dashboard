<template>
  <NSpace class="w-full h-full px-12 bg-[#1a1c34]" vertical :wrap-item="false" align="center">
    <template v-if="true">
      <NSpace class="w-full h-full pt-[80px]" vertical :wrap-item="false" align="center" :size="[0, 48]">
        <NText class="text-[40px] leading-[40px] font-bold text-white">Transfer Your EMC</NText>
        <NText class="text-xl leading-5 text-white mt-3">Connect ICP Wallet</NText>
        <NSpace class="w-full py-[14px] rounded-lg bg-[#463A8E] cursor-pointer" justify="center" align="center" :size="[20, 0]">
          <img class="w-11 h-11" src="@/assets/wallet_icp.png" alt="ICP" />
          <NText class="text-[18px] leading-[18px] text-white">INTERNET IDENTITY</NText>
        </NSpace>
        <NSpace class="w-full py-[14px] rounded-lg bg-[#463A8E] cursor-pointer" justify="center" align="center" :size="[20, 0]">
          <img class="w-11 h-11" src="@/assets/wallet_plug.png" alt="Plug" />
          <NText class="text-[18px] leading-[18px] text-white">Plug</NText>
        </NSpace>
      </NSpace>
    </template>
    <template v-if="false">
      <NSpace class="w-full h-full pt-12" vertical :wrap-item="false" align="center" :size="[0, 0]">
        <NText class="text-xl mb-10 leading-5 font-bold text-white">Transfer your DIP20 EMC</NText>
        <NSpace class="w-full" :wrap-item="false" :size="[0, 32]">
          <NSpace class="w-full p-4 rounded-lg bg-[#463A8E]" justify="space-between" align="center" :size="[20, 0]">
            <NSpace align="center" :size="[14, 0]">
              <NSpace class="min-w-[120px]">
                <NSpace class="px-4 py-2 h-10 rounded-full bg-[#604ECB]" justify="center" align="center">
                  <NText class="text-base text-white">Principal ID</NText>
                </NSpace>
              </NSpace>
              <NText class="text-white">{{ '6wpm7-ja2zl-.....dtqsc-2zriz-2ae' }}</NText>
            </NSpace>
            <img class="w-6 h-6" src="@/assets/icon_view_all.svg" />
          </NSpace>
          <NSpace class="w-full p-4 rounded-lg bg-[#463A8E]" justify="space-between" align="center" :size="[20, 0]">
            <NSpace align="center" :size="[14, 0]">
              <NSpace class="min-w-[120px]">
                <NSpace class="px-4 py-2 h-10 rounded-full bg-[#604ECB]" justify="center" align="center">
                  <NText class="text-base text-white">Account</NText>
                </NSpace>
              </NSpace>
              <NText class="text-white">{{ '6wpm7-ja2zl-.....dtqsc-2zriz-2ae' }}</NText>
            </NSpace>
            <img class="w-6 h-6 cursor-pointer" src="@/assets/icon_view_all.svg" />
          </NSpace>
          <NSpace class="w-full p-4 rounded-lg bg-[#463A8E]" justify="space-between" align="center" :size="[20, 0]">
            <NSpace align="center" :size="[14, 0]">
              <NSpace class="min-w-[120px]">
                <NSpace class="px-4 py-2 h-10 rounded-full bg-[#604ECB]" justify="center" align="center">
                  <NText class="text-base text-white">Balance</NText>
                </NSpace>
              </NSpace>
              <NText class="text-white">{{ '4253.54681EMC' }}</NText>
            </NSpace>
            <img class="w-7 h-7 bg-white rounded-full" src="@/assets/icon_coin_emc.png" />
          </NSpace>
        </NSpace>
        <NSpace class="py-[10px] pl-[10px] border-b border-dashed border-gray-500" :size="[0, 8]">
          <NSpace class="w-full h-4 leading-4" justify="start" align="center" :size="[6, 0]">
            <img class="w-4 h-4" src="@/assets/icon_info.png" />
            <NText class="text-xs">{{ '1 DIP20 EMC = 4761904761904762 ARB EMC' }}</NText>
          </NSpace>
          <NSpace class="w-full h-4 leading-4" justify="start" align="center" :size="[6, 0]">
            <img class="w-4 h-4" src="@/assets/icon_success.png" />
            <NText class="text-xs" depth="3">{{ 'You are a participant in the pre-saleyou have xxxx tokens will get anadditional xxx bonus' }}</NText>
          </NSpace>
        </NSpace>
        <NSpace class="py-4" vertical align="center" :size="[0, 28]">
          <template v-if="isLoginClaim">
            <NSpace class="px-4" align="center" :size="[20, 8]">
              <NSpace class="h-10 leading-10 px-4 rounded-lg bg-[#463A8E] border border-solid border-[#4248A7] cursor-pointer" :wrap-item="false" justify="center" align="center" :size="[12, 0]">
                <img class="w-8 h-8" src="@/assets/wallet_meta_mask.png" alt="MetaMask" />
                <NText class="text-white">MetaMask</NText>
              </NSpace>
              <NSpace class="h-10 leading-10 px-4 rounded-lg bg-[#463A8E] border border-solid border-[#4248A7] cursor-pointer" :wrap-item="false" justify="center" align="center" :size="[12, 0]">
                <img class="w-8 h-8" src="@/assets/wallet_wallet_connect.png" alt="Wallet connect" />
                <NText class="text-white">Wallet connect</NText>
              </NSpace>
            </NSpace>
          </template>
          <template v-else>
            <NSpace class="px-4" vertical align="center" :size="[0, 8]">
              <NSpace class="w-[362px] h-8 leading-8 rounded-lg bg-[#463A8E]" justify="center">
                <NText class="text-white">{{ '6wpm7-ja2zl-.....dtqsc-2zriz-2ae' }}</NText>
              </NSpace>
              <NText class="text-xs" depth="3">{{ 'You are expected to receive 2025.349 ARB EMC TOKEN' }}</NText>
            </NSpace>
          </template>
          <NSpace class="px-4" vertical align="center" :size="[0, 8]">
            <NSpace class="relative w-[232px] h-10 leading-10 rounded bg-gradient-to-r from-[#2F82FF] to-[#BC3BFB] overflow-hidden cursor-pointer" justify="center">
              <NText class="text-white">Transfer</NText>
              <img class="absolute inset-0" src="@/assets/icon_wallet_mask.png" />
            </NSpace>
            <NText class="text-xs underline cursor-pointer">{{ 'Check my transfer history' }}</NText>
          </NSpace>
        </NSpace>
      </NSpace>
    </template>
    <template v-if="false">
      <NSpace class="w-full h-full pt-12" vertical :wrap-item="false" align="center" :size="[0, 0]">
        <NText class="text-xl mb-10 leading-5 font-bold text-white">Transfer history</NText>
        <NSpace class="w-full px-4 py-5 border-t border-dashed border-gray-500" :wrap-item="false" :size="[0, 20]">
          <NSpace class="w-full" justify="space-between" align="center">
            <NText depth="3">{{ '2023.10.23 10:35' }}</NText>
            <NText depth="3">{{ '2300.13 EMC' }}</NText>
          </NSpace>
          <NSpace class="w-full" justify="space-between" align="center">
            <NText depth="3">{{ '2023.10.23 10:35' }}</NText>
            <NText depth="3">{{ '2300.13 EMC' }}</NText>
          </NSpace>
          <NSpace class="w-full" justify="space-between" align="center">
            <NText depth="3">{{ '2023.10.23 10:35' }}</NText>
            <NText depth="3">{{ '2300.13 EMC' }}</NText>
          </NSpace>
          <NSpace class="w-full" justify="space-between" align="center">
            <NText depth="3">{{ '2023.10.23 10:35' }}</NText>
            <NText depth="3">{{ '2300.13 EMC' }}</NText>
          </NSpace>
        </NSpace>
      </NSpace>
    </template>
  </NSpace>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NSpace, NText, NIcon, NButton } from 'naive-ui';

export default defineComponent({
  name: 'transfer',
  components: { NSpace, NText, NIcon, NButton },

  setup() {
    const isLoginClaim = ref(false);
    return { isLoginClaim };
  },
});
</script>
<style scoped></style>
