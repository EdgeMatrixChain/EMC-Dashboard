<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" size="small" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import NumericBasic from '../basic-simple.vue';
import { formatNumber, formatMillion, toFixedClip } from '@/tools/format-number';
import { getDexData } from '@/apis';
import { http } from '@/tools/http';

const title = ref('Market Cap');
const value = ref('');
const unit = ref('');
const tips = ref('');
const loading = ref(false);

const queryCirculation = async () => {
  const resp = await http.get({
    url: '/stats/circulating-supply',
    data: { fmt: 'num' },
    noAutoHint: true,
  });
  return resp || 0;
};

onMounted(async () => {
  loading.value = true;
  const [circulation, { fdv, priceUsd }] = await Promise.all([new Promise<number>((resolve) => resolve(19999999.83)), getDexData('solana')]);
  loading.value = false;
  const { value: _value, text, unit: _unit } = formatMillion(circulation * 1.4783);
  value.value = `$${text}`;
  tips.value = `Circulating supply: ${formatNumber(toFixedClip(circulation))}`;
});
</script>

<style scoped></style>
