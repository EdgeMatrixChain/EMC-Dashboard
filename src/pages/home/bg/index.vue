<template>
  <div class="bg">
    <BgTop />
    <slot></slot>
    <BgBottom />
  </div>
</template>
<script lang="ts" setup>
import BgTop from './bg-top.vue';
import BgBottom from './bg-bottom.vue';
</script>
<style scoped>
.bg {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}
</style>
