<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" size="small" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import NumericBasic from '@/pages/home/numeric/basic-simple.vue';
import { formatNumber, formatMillion } from '@/tools/format-number';
import { getDexData } from '@/apis';
const title = ref('FDV');
const value = ref('');
const unit = ref('');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const { fdv, priceUsd } = await getDexData('solana');
  loading.value = false;
  const { value: _value, text, unit: _unit } = formatMillion(fdv);
  value.value = `$${text}`;
});
</script>

<style scoped></style>
