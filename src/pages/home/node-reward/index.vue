<template>
  <NSpace class="section" vertical :wrap-item="false" :size="[0, 16]">
    <div class="section-header">
      <span class="section-header-title">Token Reward of Node</span>
    </div>
    <NSpace class="section-body w-full" vertical :wrap-item="false" :wrap="false" :size="[16, 24]">
      <Released />
    </NSpace>
    <NSpace class="section-body w-full" vertical :wrap-item="false" :wrap="false" :size="[16, 24]">
      <Schedule />
    </NSpace>
  </NSpace>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { NSpace, NText } from 'naive-ui';
import Released from './released/index.vue';
import Schedule from './schedule/index.vue';

// const data = ref<any[]>([]);
// onMounted(async () => {
//   data.value = await getDAN();
// });

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

.scroller-wrapper {
  box-sizing: border-box;
}

.section-body {
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
