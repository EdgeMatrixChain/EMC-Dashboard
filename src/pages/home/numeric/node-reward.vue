<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" :icon="Icon">
    <template #tips-suffix>
      <NTooltip trigger="hover">
        <template #trigger>
          <NIcon size="16" color="#f2d6ff"><IconTips /></NIcon>
        </template>
        24 hours make up an epoch
      </NTooltip>
    </template>
  </NumericBasic>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { NTooltip, NIcon } from 'naive-ui';
import Icon from './icons/node-relay.png';
import { InformationCircleOutline as IconTips } from '@vicons/ionicons5';
import { getNodeRewards } from '@/apis';
import NumericBasic from './basic.vue';
import { toFixedClip } from '@/tools/format-number';
const title = ref('Total Node Rewards');
const value = ref('');
const unit = ref('');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const resp = await getNodeRewards();
  loading.value = false;
  const total = resp.data;
  value.value = `${toFixedClip(total, 4)}`;
  unit.value = 'EMC';
  tips.value = '30000EMC / Epoch';
});
</script>

<style scoped></style>
