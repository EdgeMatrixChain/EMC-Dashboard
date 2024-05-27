<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" size="small" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import NumericBasic from '@/pages/home/numeric/basic-simple.vue';
import { formatNumber, formatMillion } from '@/tools/format-number';
import { getDexData } from '@/apis';
import { http } from '@/tools/http';
const title = ref('FDV');
const value = ref('');
const unit = ref('');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const [resp, { fdv, priceUsd }] = await Promise.all([http.get({ url: '/stats/total-supply-all' }), getDexData()]);
  loading.value = false;
  const data = (resp.data || {}) as { [k: string]: { raw: string; num: number } };
  const { value: _value, text, unit: _unit } = formatMillion(data.arb.num * priceUsd);
  value.value = `$${text}`;
});
</script>

<style scoped></style>
