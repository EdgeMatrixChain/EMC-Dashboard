<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {} from 'naive-ui';
import Icon from './icons/token-fdv.png';
import { http } from '@/tools/http';
import NumericBasic from './basic.vue';
import { formatNumber, formatMillion } from './format-number';
import { getDexData } from './apis';
const title = ref('FDV');
const value = ref('');
const unit = ref('');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const { fdv, priceUsd } = await getDexData();
  loading.value = false;
  const { value: _value, text, unit: _unit } = formatMillion(fdv);
  value.value = `$${formatNumber(_value || 0)}`;
  unit.value = _unit;
});
</script>

<style scoped></style>
