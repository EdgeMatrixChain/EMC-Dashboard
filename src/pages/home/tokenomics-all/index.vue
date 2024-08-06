<template>
  <div class="content ">
    <SectionHeader> Tokenomics </SectionHeader>
    <div class="content-body emc-card ">
      <div class="grid grid-cols-3 sm:grid-cols-3 gap-[8px] sm:gap-[16px]">
        <div class="grid-cols-1">
          <TokenSupply :size="numericSize" />
        </div>
        <div class="grid-cols-1">
          <TokenBurned :size="numericSize" />
        </div>
        <div class="grid-cols-1">
          <TokenStaked :size="numericSize" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import SectionHeader from '@/components/section-header.vue';
import TokenSupply from './token-supply.vue';
import TokenBurned from './token-burned.vue';
import TokenStaked from './token-staked.vue';
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
  gap: 12px 0;
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
}
.item-wrapper {
  background-color: rgba(0, 0, 0, 0.3);
}

@media (min-width: 640px) {
  .content {
    gap: 30px 0;
  }
}
</style>
