<template>
  <div class="content">
    <SectionHeader>Token Reward of Node</SectionHeader>
    <div class="content-body bg-[url('/src/assets/images/node-bg.png')] bg-cover bg-no-repeat">
      <Released />
    </div>
    <Schedule class="xs:mt-[46px]"/>
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
  gap: 12px 0;
}

.content-body {
  width: 100%;
  padding: 12px 16px;
  padding-bottom: 24px;
  border-radius: 16px;
}

@media (min-width: 640px) {
  .content {
    gap: 30px 0;
  }
  .content-body {
    padding: 24px;
    /* padding-bottom: 60px; */
  }
}
</style>
