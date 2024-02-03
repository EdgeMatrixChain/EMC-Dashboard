<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {} from 'naive-ui';
import Icon from './icons/token-burned.png';
import { http } from '@/tools/http';
import NumericBasic from './basic.vue';
import { toFixedClip, formatNumber } from '@/tools/format-number';
import { ethers } from 'ethers';
const title = ref('Total Burn');
const value = ref('');
const unit = ref('EMC');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const resp = await http.get({ url: '/stats/emcburns' });
  loading.value = false;
  value.value = formatNumber(Number(toFixedClip(resp.data, 4)) || 0);
});
</script>

<style scoped></style>
