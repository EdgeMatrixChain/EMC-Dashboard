<template>
  <NSpace class="item" vertical justify="space-between" :wrap-item="false" :size="[0, 0]">
    <NSpace class="item-header" vertical justify="center" :wrap-item="false" :size="[0, 0]">
      <NText class="item-header-text">{{ title }}</NText>
    </NSpace>
    <template v-if="loading">
      <NSkeleton :width="80" round size="medium" />
    </template>
    <template v-else>
      <div class="item-data">
        <NText class="item-data-value">{{ value }}</NText>
        <NText class="item-data-unit">&nbsp;{{ unit }}</NText>
      </div>
    </template>
    <NSpace class="item-footer" vertical justify="center" :wrap-item="false" :size="[0, 0]">
      <NText class="item-footer-text">{{ tips }}</NText>
    </NSpace>
    <div class="item-icon">
      <img class="item-icon-img" :src="icon" />
    </div>
  </NSpace>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
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
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  padding: 32px 24px 16px 24px;
  border-radius: 12px;
  border: 1px solid #676767;
  background: linear-gradient(180deg, #292929 0%, #121212 64.06%, #000 100%);
}

.item-header {
}

.item-header-text {
  display: inline-block;
  font-size: 16px;
  font-weight: 300;
  background: linear-gradient(to bottom, rgba(252, 88, 179, 1), rgba(254, 174, 104, 1));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.item-data {
  height: 36px;
  line-height: 36px;
}

.item-data-value {
  color: #fff;
  font-size: 36px;
}

.item-data-unit {
  color: #6f6376;
  font-size: 20px;
}

.item-footer {
}

.item-footer-text {
  color: #f2d6ff;
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
}

.item-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40%;
  padding-top: calc(40% * 0.98);
}

.item-icon-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
