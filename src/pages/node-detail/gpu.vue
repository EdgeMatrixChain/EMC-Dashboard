<template>
  <section class="gpu-item">
    <div class="gpu-item-name">
      <span>{{ item.product }}</span>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps({ item: { type: Object, default: () => ({}) } });
</script>
<style scoped>
.gpu-item {
  position: relative;
  background-color: #76b900;
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
  box-sizing: border-box;
  padding: 0 8px;
}
</style>
