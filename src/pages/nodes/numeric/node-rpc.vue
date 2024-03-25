<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" icon-bg-color="#2F4A3D3D"/>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Icon from './icons/icon_rpc.svg';
import { getRPCNodes } from '@/apis';
import NumericBasic from './basic-simple.vue';
import { formatNumber } from '@/tools/format-number';
const title = ref('RPC Nodes');
const value = ref('');
const unit = ref('');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const resp = await getRPCNodes({ page: 1, size: 1 });
  loading.value = false;
  value.value = formatNumber(resp.total || 0);
});
</script>

<style scoped></style>
