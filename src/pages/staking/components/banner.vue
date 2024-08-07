<template>
  <div class="w-full relative flex flex-col pt-[90px] min-h-[670px] flex-shrink-0 overflow-hidden z-50">
    <!-- <Bg /> -->

    <div class="relative max-w-[1340px] mx-auto justify-center flex w-full px-0 sm:px-5 flex-shrink-0 h-[600px] overflow-hidden z-50">
      <div class="flex flex-1 flex-col justify-start items-center mt-6">
        <h1 class="text-[40px] sm:text-[58px] leading-[60px] text-center w-full xl:leading-[84px] text-[#fff] px-[12px] sm:px-0 font-GeneralSans-Semibold">
          Earn rewards while securing EMC
        </h1>
        <div class="mt-[40px] text-[16px] sm:text-[18px] w-full text-center leading-[30px] text-white/70 break-words px-[12px] sm:px-0">
          Unlock the power of your EMC tokens and contribute to EMC network's security and growth through staking.
        </div>

        <div
          class="max-w-[920px] w-full flex-shrink-0 h-[240px] mt-[30px] sm:mt-0 md:h-[500px] sm:h-[400px] bg-[url('@/assets/fwS4tP1lnpwRB2mUC2cTmSMrg0.png')] bg-top bg-cover"
        ></div>
      </div>
      <!-- <div class="page-one-bg absolute top-0 w-[229px] md:w-[647px] h-[121px] md:h-[254px]"></div> -->
    </div>
    <div class="md:h-[138px] md:w-full mt-0 flex backdrop-filter bg-[#111318] backdrop-blur-[15px] rounded-[16px] md:rounded-[0px]">
      <div class="max-w-[1200px] w-full mx-auto py-[40px] md:py-0 flex-col md:flex-row flex justify-between items-center flex-1 px-5 flex-shrink-0">
        <div class="flex flex-col items-center justify-center relative pb-[32px] mb-[32px] md:pb-[0] md:mb-[0]">
          <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px] mb-[30px]">TOTAL STAKE</em>
          <p class="font-bold text-[32px] text-[#fff] leading-[32px] font-GeneralSans-Semibold">{{ props.totalStaked || '0' }}</p>
        </div>

        <div class="w-[1px] h-[40px] bg-white/20 hidden md:block"></div>

        <div class="flex flex-col items-center justify-center relative pb-[32px] mb-[32px] md:pb-[0] md:mb-[0]">
          <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px] mb-[30px]">TOTAL EARNING</em>
          <p class="font-bold text-[32px] text-[#fff] leading-[32px] font-GeneralSans-Semibold">{{ props.earnings || '0' }}</p>
        </div>
        <div class="w-[1px] h-[40px] bg-white/20 hidden md:block"></div>
        <!-- <div
          class="flex flex-col items-center justify-center relative pb-[32px] mb-[32px] md:pb-[0] md:mb-[0] md:pr-[100px] after:bg-white/20 after:absolute after:bottom-0 md:after:bottom-auto md:after:right-[50px] after:content-[''] after:flex md:after:w-[1px] after:w-[40px] md:after:h-[40px] after:h-[1px]"
        >
          <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">874,490</p>
          <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">Volume in circulation</em>
        </div> -->
        <div class="flex flex-col items-center justify-center">
          <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px] mb-[30px]">APR</em>
          <p class="font-bold text-[32px] text-[#fff] leading-[32px] font-GeneralSans-Semibold">2.7%~7.1%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Bg from './bg.vue';

const props = defineProps({
  earnings: String,
  totalStaked: String,
});
</script>

<style scoped></style>
