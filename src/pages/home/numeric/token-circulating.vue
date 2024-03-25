<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" size="small" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Icon from './icons/token-maket-cap.png';
import NumericBasic from './basic-simple.vue';
import { formatNumber, toFixedClip } from '@/tools/format-number';
import { http } from '@/tools/http';

const title = ref('Circulating Supply');
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
  const [circulation] = await Promise.all([queryCirculation()]);
  loading.value = false;
  value.value = formatNumber(toFixedClip(circulation));
  unit.value = 'EMC';
});
</script>

<style scoped></style>
