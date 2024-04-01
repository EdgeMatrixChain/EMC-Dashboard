<template>
  <div class="content">
    <SectionHeader> Tokenomics for <img class="header-icon-inline" src="@/assets/icon_arbitrum.svg" /> Arbitrum </SectionHeader>
    <div class="content-body">
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-[16px] sm:gap-[16px]">
        <div class="grid-cols-1">
          <TokenSupply :size="numericSize" />
        </div>
        <div class="grid-cols-1">
          <TokenBurned :size="numericSize" />
        </div>
        <div class="grid-cols-1">
          <TokenStaked :size="numericSize" />
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import SectionHeader from '@/components/section-header.vue';
import TokenSupply from '@/pages/home/numeric/arb/token-supply.vue';
import TokenStaked from '@/pages/home/numeric/arb/token-staked.vue';
import TokenBurned from '@/pages/home/numeric/arb/token-burned.vue';
import TokenCirculating from '@/pages/home/numeric/arb/token-circulating.vue';
import TokenFdv from '@/pages/home/numeric/arb/token-fdv.vue';
import TokenMaketCap from '@/pages/home/numeric/arb/token-maket-cap.vue';

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

.header-icon-inline {
  display: inline-block;
  /* must be 25px */
  height: 25px;
  margin-left: 4px;
}

.section-header-row {
  display: flex;
  align-items: center;
}

.content-body {
  width: 100%;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.3);
}
.item-wrapper {
  background-color: rgba(0, 0, 0, 0.3);
}

@media (min-width: 640px) {
  .content {
    gap: 16px 0;
  }
}
</style>
