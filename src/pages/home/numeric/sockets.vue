<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {} from 'naive-ui';
import Icon from './icons/compute-power.png';
import { http } from '@/tools/http';
import NumericBasic from './basic.vue';
import { formatNumber } from './format-number';
const title = ref('Sockets');
const value = ref('');
const unit = ref('');
const tips = ref('8T/20T');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  loading.value = false;
  value.value = '?';
});
</script>

<style scoped></style>
