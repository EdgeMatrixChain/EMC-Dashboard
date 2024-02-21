<template>
  <NModal :show="isVisible" :block-scroll="true" :close-on-esc="false" :mask-closable="false">
    <GiftBox class="git-box" />
  </NModal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { NModal } from 'naive-ui';
import GiftBox from './gift-box.vue';
const props = defineProps({
  isVisible: Boolean,
});
</script>
<style scoped>
.git-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>
