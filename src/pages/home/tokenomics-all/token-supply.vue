<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" size="small" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import NumericBasic from '@/pages/home/numeric/basic-simple.vue';
import { formatNumber, toFixedClip, formatMillion } from '@/tools/format-number';
import { ethers } from 'ethers';
import { useIsMobile } from '@/composables/use-screen';
import { http } from '@/tools/http';
const isMobile = useIsMobile();
const title = ref('Total Supply');
const value = ref('');
const unit = ref('EMC');
const tips = ref('');
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const resp = await http.get({ url: '/stats/total-supply-all' });
  loading.value = false;

  const data = (resp.data || {}) as { [k: string]: { raw: string } };

  let total = 0n;
  Object.entries(data).forEach(([k, v]) => {
    total += BigInt(v.raw);
  });
  const formatted = ethers.formatUnits(total, 18);
  const number = Number(toFixedClip(formatted, 4)) || 0;
  const { text } = formatMillion(number);
  value.value = text;
  // if (isMobile.value) {
  //   const { text } = formatMillion(number);
  //   value.value = text;
  // } else {
  //   value.value = formatNumber(number);
  // }
});
</script>

<style scoped></style>
