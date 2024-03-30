<template>
  <div class="content">
    <SectionHeader>Token Reward of Node</SectionHeader>
    <div class="content-body">
      <Released />
    </div>
    <div class="content-body">
      <Schedule />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue';
import SectionHeader from '@/components/section-header.vue';
import Released from './released/index.vue';
import Schedule from './schedule/index.vue';

onUnmounted(() => {});
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
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.3);
}

@media (min-width: 640px) {
  .content {
    gap: 16px 0;
  }
  .content-body {
    padding: 24px;
  }
}
</style>
