<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Icon from './icons/cpu.png';
import NumericBasic from './basic-simple.vue';
import { formatNumber } from '@/tools/format-number';
import { getTotalHardwares } from '@/apis';
const title = ref('Total CPUs');
const value = ref('');
const unit = ref('cores');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const resp = await getTotalHardwares();
  loading.value = false;
  value.value = formatNumber(resp.cpu || 0);
});
</script>

<style scoped></style>
