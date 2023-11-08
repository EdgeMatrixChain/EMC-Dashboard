<template>
  <NSpace class="w-full h-full bg-[#1a1c34]" vertical :wrap-item="false" align="center">
    <template v-if="false">
      <NSpace class="w-full h-full pt-[80px] px-12" vertical :wrap-item="false" align="center" :size="[0, 48]">
        <NText class="text-[40px] leading-[40px] font-bold text-white">Claim Your ARB EMC!</NText>
        <NText class="text-[20px] leading-[20px] text-white mt-3">Connect ICP Wallet</NText>
        <NSpace class="w-full py-[14px] rounded-lg bg-[#463A8E] cursor-pointer" justify="center" align="center" :size="[20, 0]">
          <img class="w-11 h-11" src="@/assets/wallet_meta_mask.png" alt="MetaMask" />
          <NText class="text-[18px] leading-[18px] text-white">MetaMask</NText>
        </NSpace>
        <NSpace class="w-full py-[14px] rounded-lg bg-[#463A8E] cursor-pointer" justify="center" align="center" :size="[20, 0]">
          <img class="w-11 h-11" src="@/assets/wallet_wallet_connect.png" alt="Wallet connect" />
          <NText class="text-[18px] leading-[18px] text-white">Wallet connect</NText>
        </NSpace>
      </NSpace>
    </template>
    <template v-if="true">
      <NSpace class="w-full h-full pt-12" vertical :wrap-item="false" align="center" :size="[0, 0]">
        <NText class="mb-9 text-[32px] leading-[32px] font-bold text-white">You Can Claim</NText>
        <NSpace class="w-full h-[50px] px-[60px] bg-[#463A8E] text-[18px]" align="center" :wrap-item="false" :size="[0, 0]">
          <div class="w-[220px] text-white">Balance</div>
          <div class="w-[220px] text-white">Status</div>
          <div class="flex-1 text-white">Action</div>
        </NSpace>
        <NRadioGroup class="w-full" v-model:value="value" name="radiogroup">
          <NSpace class="w-full px-5" :wrap-item="false" :size="[0, 0]">
            <NSpace class="w-full py-3 text-base border-b border-solid border-gray-500" :wrap-item="false" justify="space-between" align="center">
              <NRadio class="w-[249px]" :key="1">
                <NText class="text-white">4253.54681 EMC</NText>
              </NRadio>
              <NText class="w-[207px] text-white">withdrawn</NText>
              <NText class="flex-1 text-[#397EFF]">Claim</NText>
            </NSpace>
          </NSpace>
        </NRadioGroup>
      </NSpace>
    </template>
  </NSpace>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NSpace, NText, NRadioGroup, NRadio } from 'naive-ui';

export default defineComponent({
  name: 'transfer',
  components: { NSpace, NText, NRadioGroup, NRadio },

  setup() {
    return {};
  },
});
</script>
<style scoped></style>
