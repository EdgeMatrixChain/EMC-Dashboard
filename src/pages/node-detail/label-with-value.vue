<template>
  <div class="label-with-value">
    <div class="label-with-value-cell-1">
      <slot name="label"></slot>
    </div>
    <div class="label-with-value-cell-2">
      <slot name="value"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { NSpace } from 'naive-ui';
import { useIsMobile } from '@/composables/use-screen';
const isMobile = useIsMobile();

const layoutAttr = computed<any>(() => {
  if (isMobile.value) {
    return {};
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px 0;
  min-height: 64px;
  padding: 12px 24px;
  border-bottom: 1px solid #2d343f;
}

.label-with-value:nth-last-child(1) {
  border-bottom: none;
}

.label-with-value-cell-1,
.label-with-value-cell-2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0 8px;
}
.label-with-value-cell-1 {
  min-width: 128px;
}
.label-with-value-cell-2 {
  width: 100%;
}
@media (min-width: 640px) {
  .label-with-value {
    flex-direction: row;
    align-items: center;
  }
  .label-with-value-cell-2 {
    flex: 1;
    width: 0;
  }
}
</style>
