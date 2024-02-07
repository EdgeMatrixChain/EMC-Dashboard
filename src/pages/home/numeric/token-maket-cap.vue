<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Icon from './icons/token-maket-cap.png';
import NumericBasic from './basic.vue';
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
    url: '/stats/emccirculation',
    noAutoHint: true,
  });
  return resp.data || { raw: '0', formartted: '0.0', text: '0.0' };
};

onMounted(async () => {
  loading.value = true;
  const [circulation, { fdv, priceUsd }] = await Promise.all([queryCirculation(), getDexData()]);
  loading.value = false;
  const { value: _value, text, unit: _unit } = formatMillion(circulation.formartted * priceUsd);
  value.value = `$${_value}`;
  unit.value = _unit;
  tips.value = `Circulating supply: ${formatNumber(toFixedClip(circulation.formartted))}`;
});
</script>

<style scoped></style>
