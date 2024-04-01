<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" size="small" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { http } from '@/tools/http';
import NumericBasic from '../basic-simple.vue';
import { toFixedClip, formatNumber, formatMillion } from '@/tools/format-number';
import { useIsMobile } from '@/composables/use-screen';
const isMobile = useIsMobile();
const title = ref('Total Burn');
const value = ref('');
const unit = ref('EMC');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  //await http.get({ url: '/stats/emcburns' });
  const resp = { data: 0 };
  loading.value = false;
  const number = Number(toFixedClip(resp.data, 4)) || 0;
  const { text } = formatMillion(number);
  value.value = text;
});
</script>

<style scoped></style>
