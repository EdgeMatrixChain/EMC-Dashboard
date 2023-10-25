<template>
    <div class="w-full relative z-10 flex flex-col pt-[90px] h-screen min-h-[670px] flex-shrink-0">
        <div class="relative max-w-[1340px] mx-auto justify-center flex w-full flex-1 px-5 flex-shrink-0">
            <div class="flex flex-1 flex-col justify-center items-center">
                <h1
                    class="text-[58px] leading-[58px] w-full text-center md:w-[50%] xl:text-[68px] font-bold xl:leading-[84px] text-[#fff]">
                    Earn rewards while securing EMC
                </h1>
                <p class="mt-[50px] text-[20px] w-full md:w-[50%] text-center leading-[30px] text-white/70">
                    Unlock the
                    power of your
                    EMC
                    tokens and
                    contribute to
                    EMC
                    network's
                    security and
                    growth through
                    staking.</p>
            </div>
            <div class="page-one-bg absolute top-0"></div>
        </div>
        <div class="h-[138px] w-full flex backdrop-filter bg-[rgb(26,27,51)]">
            <div class="max-w-[1340px] mx-auto flex w-full justify-center flex-1 px-5 flex-shrink-0">
                <div
                    class="flex flex-col items-center justify-center relative pr-[100px] after:bg-white/20 after:absolute after:right-[50px] after:content-[''] after:flex after:w-[1px] after:h-[40px]">
                    <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">25,349.239</p>
                    <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">TOTAL EMC
                        STAKED</em>
                </div>
                <div
                    class="flex flex-col items-center justify-center relative pr-[100px] after:bg-white/20 after:absolute after:right-[50px] after:content-[''] after:flex after:w-[1px] after:h-[40px]">
                    <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">864,769</p>
                    <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">TOTAL
                        VALIDATORS</em>
                </div>
                <div
                    class="flex flex-col items-center justify-center relative pr-[100px] after:bg-white/20 after:absolute after:right-[50px] after:content-[''] after:flex after:w-[1px] after:h-[40px]">
                    <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">874,490</p>
                    <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">Volume in
                        circulation</em>
                </div>
                <div class="flex flex-col items-center justify-center">
                    <p class="font-medium text-[32px] text-[#fff] mb-[30px] leading-[32px]">3%~6%</p>
                    <em class="not-italic text-white/70 text-[16px] font-medium leading-[16px]">APR</em>
                </div>
            </div>
        </div>
        <Bg />
    </div>
</template>

<script lang="ts" setup>
import Bg from './bg.vue'
</script>

<style scoped></style>