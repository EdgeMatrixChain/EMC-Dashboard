<template>
  <NAlert class="mb-[4px]" title="Waiting synchronize" type="info">
    <NSpace align="center" :wrap-item="false" :size="[8, 8]">
      <NText>Please waiting for owner to synchronize</NText>
    </NSpace>
  </NAlert>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { NSpace, NAlert, NText, NButton, NIcon, NGrid, NGridItem, NScrollbar, NSpin, NTabs, NTabPane, useMessage, useDialog } from 'naive-ui';
import { queryNodeOwner } from '@/apis';
import { Web3Utils } from '@/web3/utils';
const props = defineProps({
  nodeId: { type: String, default: '' },
  bindStakeAccount: { type: String, default: '' },
});

const emits = defineEmits(['finish']);
let isFinish = false;

function triggerFinish() {
  if (!isFinish) {
    isFinish = true;
    emits('finish');
  }
}

async function handler() {
  if (!props.nodeId) {
    triggerFinish();
    return;
  }
  const before = new Date().getTime();
  const { principal } = await queryNodeOwner(props.nodeId);
  const end = new Date().getTime();
  if (!principal) {
    triggerFinish();
  } else if (!props.bindStakeAccount || props.bindStakeAccount === '0x0000000000000000000000000000000000000000') {
    triggerFinish();
  } else if (Web3Utils.eq(principal, props.bindStakeAccount)) {
    triggerFinish();
  } else {
    const diff = 3000 - (end - before);
    if (diff > 0) {
      console.info(`wait ${diff} ms`);
      await new Promise((resolve) => setTimeout(resolve, diff));
    }
    if (!isFinish) {
      handler();
    }
  }
}

onMounted(() => {
  handler();
});

onUnmounted(() => {
  if (!isFinish) {
    isFinish = true;
  }
});
</script>
