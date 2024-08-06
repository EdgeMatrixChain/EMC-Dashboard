<template>
  <div class="content">
    <SectionHeader>
      <!-- <img class="header-icon-inline" :src="logo" />  -->
      {{ title }}
    </SectionHeader>
    <div class="content-body">
      <div class="grid grid-cols-2 sm:grid-cols-2 gap-[8px] sm:gap-[16px]">
        <div class="grid-cols-1">
          <Numeric title="Total Earnings" :size="numericSize" :value="totalReward" :unit="'EMC'" />
        </div>
        <div class="grid-cols-1">
          <Numeric title="Balance" :size="numericSize" :value="currentReward" :unit="'EMC'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import SectionHeader from '@/components/section-header.vue';
import Numeric from './numeric.vue';

import { useIsMobile } from '@/composables/use-screen';

const props = defineProps({
  logo: String,
  title: String,
  totalReward: String,
  currentReward: String,
});

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
  /* must be -2px */
  margin-top: -2px;
  margin-right: 4px;
}

.section-header-row {
  display: flex;
  align-items: center;
}

.content-body {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
}

@media (min-width: 640px) {
  .content {
    gap: 16px 0;
  }
}
</style>
