<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" size="small" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import NumericBasic from '../basic-simple.vue';
import { formatNumber, toFixedClip, formatMillion } from '@/tools/format-number';
import { http } from '@/tools/http';
import { useIsMobile } from '@/composables/use-screen';
const isMobile = useIsMobile();
const title = ref('Circulating Supply');
const value = ref('');
const unit = ref('EMC');
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
  const number = Number(toFixedClip(circulation, 4)) || 0;
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
