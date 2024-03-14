<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import Icon from './icons/cpu.png';
import { http } from '@/tools/http';
import NumericBasic from './basic-simple.vue';
import { formatNumber } from '@/tools/format-number';
const title = ref('Total Memory');
const value = ref('');
const unit = ref('');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const resp = await http.get({
    url: '/stats/nodecpus',
  }); 
  loading.value = false;
  const data = resp.data || {};
  value.value = formatNumber(data.gpu || 0);
});
</script>

<style scoped></style>
