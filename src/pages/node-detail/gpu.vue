<template>
  <section class="gpu-item">
    <div class="gpu-item-name">
      <span>{{ item.gpuModel }}</span>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps({ item: { type: Object, default: () => ({}) } });
</script>
<style scoped>
.gpu-item {
  position: relative;
  border-radius: 4px;
  background: linear-gradient(61.09deg, #9844ED 0.16%, #533AE6 38.61%, #546CEA 67.14%, #7FC8FC 99.32%);
  width: 120px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.gpu-item-name {
  width: 120px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 12px;
  line-height: 14px;
  box-sizing: border-box;
  padding: 0 8px;
}
</style>
