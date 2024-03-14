<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import Icon from './icons/task-pending.png';
import { http } from '@/tools/http';
import NumericBasic from './basic-simple.vue';
import { formatNumber } from '@/tools/format-number';
const title = ref('Pending Tasks');
const value = ref('');
const unit = ref('');
const tips = ref('');
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const resp = await http.get({ url: 'https://openapi.emchub.ai/emchub/api/client/open/queryTaskStatusNum', noAutoHint: true });
  loading.value = false;
  const data = resp.data || {};
  const total = data.waitApiTotal + data.processingApiTotal;
  value.value = formatNumber(total || 0);
});
</script>

<style scoped></style>
