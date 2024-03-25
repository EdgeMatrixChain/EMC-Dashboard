<template>
  <NSpace class="item" align="center" justify="space-between" :wrap-item="false" :size="[0, 16]">
    <NSpace class="flex-1 w-[0]" vertical justify="space-between" :wrap-item="false" :size="[0, 16]">
      <NSpace vertical justify="center" :wrap-item="false" :size="[0, 0]">
        <NText class="item-title" :style="titleStyle">{{ title }}</NText>
      </NSpace>
      <template v-if="loading">
        <NSkeleton class="rounded" :width="80" size="small" />
      </template>
      <template v-else>
        <div class="item-data">
          <NText class="item-data-value" :style="valueStyle">{{ value }}</NText>
          <NText class="item-data-unit" :style="unitStyle">&nbsp;{{ unit }}</NText>
        </div>
      </template>
    </NSpace>
    <NSpace class="item-icon" align="center" justify="center" :wrap-item="false" :size="[0, 0]" :style="{ 'background-color': iconBgColor }">
      <img class="item-icon-img" :src="icon" />
    </NSpace>
  </NSpace>
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
    style.fontSize = '12px';
  }
  return style;
});

const valueStyle = computed(() => {
  const style = {
    fontSize: '28px',
  };
  if (props.size === 'small') {
    style.fontSize = '18px';
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
  padding: 16px 24px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
}

.item-title {
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
.item-icon {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.item-icon-img {
  width: 20px;
  height: 20px;
}
</style>
