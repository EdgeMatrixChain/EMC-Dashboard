<template>
  <NSpace class="label-with-value" v-bind="layoutAttr" :wrap="false" :wrap-item="false">
    <NSpace class="min-w-[128px] xl:min-w-[200px]" :wrap-item="false" :size="[8, 0]">
      <slot name="label"></slot>
    </NSpace>
    <NSpace class="xl:flex-1" align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
      <slot name="value"></slot>
    </NSpace>
  </NSpace>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { NSpace } from 'naive-ui';
import { useIsMobile } from '@/composables/use-screen';
const isMobile = useIsMobile();

const layoutAttr = computed<any>(() => {
  if (isMobile.value) {
    return {
      vertical: true,
      justify: 'center',
      size: [0, 4],
    };
  } else {
    return {
      align: 'center',
      size: [0, 0],
    };
  }
});
</script>
<style scoped>
.label-with-value {
  min-height: 64px;
  padding: 12px 24px;
  border-bottom: 1px solid #2d343f;
}

.label-with-value:nth-last-child(1) {
  border-bottom: none;
}
</style>
