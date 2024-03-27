<template>
  <div class="bg">
    <BgTop />
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import BgTop from './bg-top.vue';
</script>
<style scoped>
.bg {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - var(--header-height));
}
</style>
