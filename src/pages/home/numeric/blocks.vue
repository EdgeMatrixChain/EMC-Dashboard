<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {} from 'naive-ui';
import Icon from './icons/blocks.png';
import { http } from '@/tools/http';
import NumericBasic from './basic.vue';
import { formatNumber } from '@/tools/format-number';
const title = ref('Blocks');
const value = ref('');
const unit = ref('Blocks');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const resp = await http.get({ url: '/blocks', noAutoHint: true });
  loading.value = false;
  value.value = formatNumber(resp.data || 0);
});
</script>

<style scoped></style>
