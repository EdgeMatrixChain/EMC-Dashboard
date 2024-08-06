<template>
  <div class="item">
    <div class="item-row">
      <span class="item-title" :style="titleStyle">{{ title }}</span>
    </div>
    <div class="item-row">
      <template v-if="loading">
        <NSkeleton height="28" :width="56" size="small" />
      </template>
      <template v-else>
        <div class="item-data">
          <NText class="item-data-value" :style="valueStyle">{{ value }}</NText>
          <NText class="item-data-unit" :style="unitStyle">&nbsp;{{ unit }}</NText>
        </div>
      </template>
      <div class="item-icon">
        <img class="item-icon-img" :src="icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NSpace, NText, NSkeleton } from 'naive-ui';
import { computed } from 'vue';

const props = defineProps({
  title: String,
  unit: String,
  value: String,
  tips: String,
  iconBgColor: String,
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
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
  gap: 16px 0;
}

.item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  color: #898B95;
}

.item-data {
  height: 28px;
  line-height: 28px;
}

.item-data-value {
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
  font-family: GeneralSans-Semibold;
}

.item-data-unit {
  color: #69656f;
  font-size: 16px;
  font-weight: 500;
}

.item-icon-img {
  width: 20px;
  height: 20px;
}
@media (min-width: 640px) {
  .item {
    padding: 16px 24px;
  }
}
</style>
