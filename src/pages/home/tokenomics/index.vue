<template>
  <NSpace class="section" vertical :wrap-item="false" :size="[0, 16]">
    <div class="section-header">
      <span class="section-header-title">Tokenomics</span>
    </div>
    <NSpace class="section-body w-full" vertical :wrap-item="false" :wrap="false" :size="[16, 24]">
      <NSpace class="row" :wrap-item="false" :size="[24, 16]">
        <NSpace class="col flex-1" vertical :wrap-item="false" :size="[0, 0]">
          <TokenSupply />
        </NSpace>
        <NSpace class="col flex-1" vertical :wrap-item="false" :size="[0, 0]">
          <TokenStaked />
        </NSpace>
        <NSpace class="col flex-1" vertical :wrap-item="false" :size="[0, 0]">
          <TokenBurned />
        </NSpace>
      </NSpace>
      <NSpace class="row" :wrap-item="false" :size="[24, 16]">
        <NSpace class="col flex-1" vertical :wrap-item="false" :size="[0, 0]">
          <TokenCirculating />
        </NSpace>
        <NSpace class="col flex-1" vertical :wrap-item="false" :size="[0, 0]">
          <TokenFdv />
        </NSpace>
        <NSpace class="col flex-1" vertical :wrap-item="false" :size="[0, 0]">
          <TokenMaketCap />
        </NSpace>
      </NSpace>
    </NSpace>
  </NSpace>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { NSpace } from 'naive-ui';
import TokenSupply from '@/pages/home/numeric/token-supply.vue';
import TokenStaked from '@/pages/home/numeric/token-staked.vue';
import TokenBurned from '@/pages/home/numeric/token-burned.vue';

import TokenCirculating from '@/pages/home/numeric/token-circulating.vue';
import TokenFdv from '@/pages/home/numeric/token-fdv.vue';
import TokenMaketCap from '@/pages/home/numeric/token-maket-cap.vue';

// import { useIsMobile } from '@/composables/use-screen';

onMounted(async () => {});

onUnmounted(() => {});
</script>

<style scoped>
.section {
  position: relative;
  overflow: hidden;
}

.section-header {
}

.section-header-title {
  font-family: Oxanium;
  font-size: 24px;
  font-weight: 500;
}

.section-body {
}
.row {
  /* border: solid 1px #3d1a5a; */
}
.col {
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
/* .row .col:not(:last-child)::after {
  content: '';
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #3d1a5a;
} */
</style>
