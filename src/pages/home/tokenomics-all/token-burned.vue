<template>
  <NumericBasic :title="title" :unit="unit" :value="value" :tips="tips" :loading="loading" size="small">
    <!-- <template #header-suffix>
      <NPopover :trigger="isMobile ? 'click' : 'hover'">
        <template #trigger>
          <IconTips style="width: 20px; height: 20px; color: #eeddff" />
        </template>
        <div class="tips-content">
          <p class="tips-content-text">{{ totalBridge }} EMC on Arbitrum burned for minting on Solana.</p>
        </div>
      </NPopover>
    </template> -->
  </NumericBasic>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { NPopover } from 'naive-ui';
import { ethers } from 'ethers';
import { AlertCircleOutline as IconTips } from '@vicons/ionicons5';

import { http } from '@/tools/http';
import NumericBasic from '@/pages/home/numeric/basic-simple.vue';
import { toFixedClip, formatNumber, formatMillion } from '@/tools/format-number';
import { useIsMobile } from '@/composables/use-screen';
const isMobile = useIsMobile();
const totalBridge = ref('');
const title = ref('Total Burn');
const value = ref('');
const unit = ref('EMC');
const tips = ref('');
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const resp = await http.get({ url: '/stats/emcburns' });
  loading.value = false;
  const data = resp.data || {};
  const total = data.total || '0';
  const bridge = data.bridge || '0';
  const sum = ethers.formatUnits(ethers.parseUnits(total, 18) + ethers.parseUnits(bridge, 18), 18);

  const number = Number(toFixedClip(sum, 4)) || 0;
  const { text } = formatMillion(number);
  value.value = text;

  const numberBridge = Number(toFixedClip(bridge, 4)) || 0;
  const { text: textBridge } = formatMillion(numberBridge);
  totalBridge.value = textBridge;
});
</script>

<style scoped>
.tips-content-text {
  font-size: 12px;
}

@media (min-width: 640px) {
  .tips-content-text {
    font-size: 14px;
  }
}
</style>
