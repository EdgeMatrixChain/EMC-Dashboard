<template>
  <NSpace class="item" vertical justify="space-between" :wrap-item="false" :size="[0, 16]">
    <NSpace vertical justify="center" :wrap-item="false" :size="[0, 0]">
      <NText class="item-title">{{ title }}</NText>
    </NSpace>
    <template v-if="loading">
      <NSkeleton class="rounded" :width="80" size="small"/>
    </template>
    <template v-else>
      <div class="item-data">
        <NText class="item-data-value">{{ value }}</NText>
        <NText class="item-data-unit">&nbsp;{{ unit }}</NText>
      </div>
    </template>
  </NSpace>
</template>

<script lang="ts" setup>
import { NSpace, NText, NSkeleton } from 'naive-ui';

defineProps({
  title: String,
  unit: String,
  value: String,
  tips: String,
  icon: String,
  loading: Boolean,
});
</script>

<style scoped>
.item {
  width: 100%;
  padding: 16px 24px;
  box-sizing: border-box;
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
}

.item-data-unit {
  color: #69656f;
  font-size: 16px;
  font-weight: 500;
}
</style>
