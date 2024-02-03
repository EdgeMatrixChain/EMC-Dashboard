<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {} from 'naive-ui';
import Icon from './icons/transactions.png';
import { http } from '@/tools/http';
import NumericBasic from './basic.vue';
import { formatNumber } from '@/tools/format-number';
const title = ref('API Transactions');
const value = ref('');
const unit = ref('txs');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const resp = await http.get({ url: 'https://openapi.emchub.ai/emchub/api/client/open/stats', noAutoHint: true });
  loading.value = false;
  const data = resp.data || {};
  value.value = formatNumber(data.apiTotal || 0);
});
</script>

<style scoped></style>
