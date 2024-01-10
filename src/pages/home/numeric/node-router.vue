<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {} from 'naive-ui';
import Icon from './icons/node-route.png';
import { getRouteNodes } from '@/apis';
import NumericBasic from './basic.vue';
import { formatNumber } from './format-number';
const title = ref('Route Nodes');
const value = ref('');
const unit = ref('');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const resp = await getRouteNodes({ page: 1, size: 1 });
  loading.value = false;
  value.value = formatNumber(resp.total || 0);
});
</script>

<style scoped></style>
