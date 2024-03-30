<template>
  <div class="item">
    <div class="item-header">
      <span class="item-header-text" :style="titleStyle">{{ title }}</span>
    </div>
    <template v-if="loading">
      <NSkeleton :width="40" :height="12" />
    </template>
    <template v-else>
      <div class="item-data">
        <span class="item-data-value" :style="valueStyle">{{ value }}</span>
        <span class="item-data-unit" :style="unitStyle">&nbsp;{{ unit }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { NSkeleton } from 'naive-ui';
import { computed } from 'vue';

const props = defineProps({
  title: String,
  unit: String,
  value: String,
  tips: String,
  icon: String,
  loading: Boolean,
  size: { type: String, default: 'normal' },
});

const titleStyle = computed(() => {
  const style = {
    fontSize: '16px',
  };
  if (props.size === 'small') {
    style.fontSize = '14px';
  }
  return style;
});

const valueStyle = computed(() => {
  const style = {
    fontSize: '28px',
  };
  if (props.size === 'small') {
    style.fontSize = '24px';
  }
  return style;
});

const unitStyle = computed(() => {
  const style = {
    fontSize: '16px',
  };
  if (props.size === 'small') {
    style.fontSize = '12px';
  }
  return style;
});
</script>

<style scoped>
.item {
  width: 100%;
  padding: 8px 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 16px 0;
}

.item-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
}

.item-header-text {
  font-size: 16px;
  font-weight: 400;
  color: #eeddff;
}

.item-data {
  height: 28px;
  line-height: 28px;
}

.item-data-value {
  font-size: 28px;
  font-weight: 500;
  color: #ffffff;
  font-family: Oxanium;
}

.item-data-unit {
  color: #69656f;
  font-size: 16px;
  font-weight: 500;
}

@media (min-width: 640px) {
  .item {
    padding: 16px 24px;
  }
}
</style>
