<template>
  <div class="w-full relative z-20 flex flex-col pt-[90px] md:h-screen min-h-[670px] flex-shrink-0">
    <Bg />
    <div class="relative max-w-[1340px] mx-auto justify-center flex w-full px-5 flex-shrink-0 h-[600px]">
      <div class="flex flex-1 flex-col justify-start items-center mt-6">
        <h1 class="text-[48px] mt-[70px] md:text-[58px] leading-[58px] w-full text-center md:w-[50%] xl:text-[68px] font-bold xl:leading-[84px] text-[#fff]">Earn rewards while securing EMC</h1>
        <p class="mt-[40px] md:mt-[50px] text-[18px] md:text-[20px] w-full md:w-[50%] text-center leading-[30px] text-white/70">Unlock the power of your EMC tokens and contribute to EMC network's security and growth through staking.</p>
      </div>
      <div class="page-one-bg absolute top-0 w-[229px] md:w-[647px] h-[121px] md:h-[254px]"></div>
    </div>
    <div class="md:h-[138px] md:w-full mx-[15px] md:mx-[0px] mt-[66px] md:mt-0 flex backdrop-filter bg-white/10 backdrop-blur-[15px] rounded-[16px] md:rounded-[0px]">
      <div class="max-w-[1340px] mx-auto py-[40px] md:py-0 flex-col md:flex-row flex w-full justify-center flex-1 px-5 flex-shrink-0">
        <div
          class="flex flex-col items-center justify-center relative pb-[32px] mb-[32px] md:pb-[0] md:mb-[0] md:pr-[100px] after:bg-white/20 after:absolute after:bottom-0 md:after:bottom-auto md:after:right-[50px] after:content-[''] after:flex md:after:w-[1px] after:w-[40px] md:after:h-[40px] after:h-[1px]"
        >
          <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">25,349.239</p>
          <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">TOTAL EMC STAKED</em>
        </div>
        <div
          class="flex flex-col items-center justify-center relative pb-[32px] mb-[32px] md:pb-[0] md:mb-[0] md:pr-[100px] after:bg-white/20 after:absolute after:bottom-0 md:after:bottom-auto md:after:right-[50px] after:content-[''] after:flex md:after:w-[1px] after:w-[40px] md:after:h-[40px] after:h-[1px]"
        >
          <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">864,769</p>
          <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">TOTAL VALIDATORS</em>
        </div>
        <div
          class="flex flex-col items-center justify-center relative pb-[32px] mb-[32px] md:pb-[0] md:mb-[0] md:pr-[100px] after:bg-white/20 after:absolute after:bottom-0 md:after:bottom-auto md:after:right-[50px] after:content-[''] after:flex md:after:w-[1px] after:w-[40px] md:after:h-[40px] after:h-[1px]"
        >
          <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">874,490</p>
          <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">Volume in circulation</em>
        </div>
        <div class="flex flex-col items-center justify-center">
          <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">2.7%~7.1%</p>
          <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">APR</em>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Bg from './bg.vue';
</script>

<style scoped></style>
