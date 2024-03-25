<template>
  <NSpace class="content" vertical :wrap-item="false" :size="[0, 16]">
    <div class="content-header">
      <span class="content-header-title">Distributed Node Rewards</span>
    </div>
    <NSpace class="content-body w-full" align="center" justify="space-between" :wrap-item="false" :wrap="false" :size="[16, 0]">
      <NSpace align="center" :wrap-item="false" :wrap="false" :size="[16, 0]">
        <svg width="24" height="63" viewBox="0 0 24 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 11L12 0H0V63H24V11Z" fill="url(#paint0_linear_62_278)" />
          <defs>
            <linearGradient id="paint0_linear_62_278" x1="1.21377e-06" y1="-8.45302e-07" x2="39" y2="56" gradientUnits="userSpaceOnUse">
              <stop stop-color="#04D5EF" />
              <stop offset="1" stop-color="#5D4DDD" />
            </linearGradient>
          </defs>
        </svg>
        <NSpace vertical :wrap-item="false" :wrap="false" :size="[0, 4]">
          <NText class="text-[18px] font-[800]">1824450.1643</NText>
          <NText class="text-[14px] font-[500] text-[#69656f]">EMC</NText>
        </NSpace>
      </NSpace>
      <NSpace :wrap-item="false" :wrap="false">
        <NText class="text-[18px] font-[800]">30000EMC / Epoch</NText>
      </NSpace>
    </NSpace>
  </NSpace>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { NSpace, NText } from 'naive-ui';
// const data = ref<any[]>([]);
// onMounted(async () => {
//   data.value = await getDAN();
// });

onUnmounted(() => {});
</script>

<style scoped>
.content {
  position: relative;
  overflow: hidden;
}

.content-header {
}

.content-header-title {
  /* font-family: Oxanium; */
  font-size: 16px;
  font-weight: 400;
  color: #eeddff;
}

.content-body {
}
</style>
