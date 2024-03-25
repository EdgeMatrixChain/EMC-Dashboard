<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" icon-bg-color="#402F4A3D" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Icon from './icons/icon_computer.svg';
import NumericBasic from './basic-simple.vue';
import { formatNumber } from '@/tools/format-number';
import { getComputeNodes } from '@/apis';
const title = ref('Computing Nodes');
const value = ref('');
const unit = ref('');
const tips = ref('');
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const resp = await getComputeNodes({ page: 1, size: 1 });
  loading.value = false;
  console.info(`computed node ${resp.total}`);
  value.value = formatNumber(resp.total || 0);
});
</script>

<style scoped></style>
