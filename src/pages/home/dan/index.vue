<template>
  <NSpace class="section" vertical :wrap-item="false" :size="[0, 16]">
    <div class="section-header">
      <span class="section-header-title">Daily Active Node</span>
    </div>
    <NSpace class="section-body w-full" :wrap-item="false" :wrap="false" :size="[16, 0]">
      <div class="w-[100%] h-[360px] relative">
        <Bar :data="data" />
      </div>
    </NSpace>
  </NSpace>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { NSpace } from 'naive-ui';
import Bar from './bar/index.vue';
import { formatNumber } from '@/tools/format-number';
import { getDAN } from '@/apis';
// import { useIsMobile } from '@/composables/use-screen';
const data = ref<any[]>([]);
onMounted(async () => {
  data.value = await getDAN();
});

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
}
</style>
