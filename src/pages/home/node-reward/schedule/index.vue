<template>
  <NSpace class="content" vertical :wrap-item="false" :size="[0, 16]">
    <div class="content-header">
      <span class="content-header-title">Distribution Schedule Per Epoch</span>
    </div>
    <NSpace class="content-body w-[100%] h-[360px]" align="center" :wrap-item="false" :wrap="false" :size="[16, 0]">
        <Line :data="LineData" />
      <!-- <NScrollbar x-scrollable class="w-[100%] h-[100%]" trigger="hover" :content-style="{ height: '100%' }">
        <div class="w-[4000px] h-[100%] relative">
        </div>
      </NScrollbar> -->
    </NSpace>
  </NSpace>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { NScrollbar, NSpace, NText } from 'naive-ui';
import Line from './line/index.vue';
import LineData from './data';
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
  position: relative;
}
</style>
