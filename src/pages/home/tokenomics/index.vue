<template>
  <div class="content">
    <SectionHeader>Tokenomics</SectionHeader>
    <NSpace class="content-body">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-[16px] sm:gap-[24px]">
        <div class="grid-cols-1">
          <TokenSupply :size="numericSize" />
        </div>
        <div class="grid-cols-1">
          <TokenStaked :size="numericSize" />
        </div>
        <div class="grid-cols-1">
          <TokenBurned :size="numericSize" />
        </div>

        <div class="grid-cols-1">
          <TokenCirculating :size="numericSize" />
        </div>
        <div class="grid-cols-1">
          <TokenFdv :size="numericSize" />
        </div>
        <div class="grid-cols-1">
          <TokenMaketCap :size="numericSize" />
        </div>
      </div>
    </NSpace>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { NSpace } from 'naive-ui';
import SectionHeader from '@/components/section-header.vue';
import TokenSupply from '@/pages/home/numeric/token-supply.vue';
import TokenStaked from '@/pages/home/numeric/token-staked.vue';
import TokenBurned from '@/pages/home/numeric/token-burned.vue';

import TokenCirculating from '@/pages/home/numeric/token-circulating.vue';
import TokenFdv from '@/pages/home/numeric/token-fdv.vue';
import TokenMaketCap from '@/pages/home/numeric/token-maket-cap.vue';

import { useIsMobile } from '@/composables/use-screen';
const isMobile = useIsMobile();
const numericSize = computed(() => (isMobile.value ? 'small' : 'large'));
</script>

<style scoped>
.content {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px 0;
}

.content-body {
  width: 100%;
}

@media (min-width: 640px) {
  .content {
    gap: 16px 0;
  }
}
</style>
