<template>
  <NAlert :title="title" :type="type">
    <div class="alert-content">
      <span class="alert-content-text">{{ content }}</span>
      <slot></slot>
    </div>
  </NAlert>
</template>
<script lang="ts" setup>
import { NAlert } from 'naive-ui';
import { PropType } from 'vue';
const props = defineProps({
  type: { type: String as PropType<'default' | 'success' | 'error' | 'warning' | 'info' | undefined> },
  title: { type: String },
  content: { type: String },
});
</script>
<style scoped>
.alert-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.alert-content-text {
  font-size: 14px;
  color: #ffffff;
}
</style>
