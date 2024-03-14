<template>
  <NSpace class="wallet" vertical :size="[0, 0]" :wrap-item="false" :wrap="false">
    <!-- header -->
    <NSpace class="px-[16px] py-[12px]" align="center" justify="space-between" :size="[0, 0]" :wrap-item="false" :wrap="false">
      <NSpace
        class="cursor-pointer"
        align="center"
        justify="space-between"
        :size="[4, 0]"
        :wrap-item="false"
        :wrap="false"
        @click="onPressCopy(ethUserStore.account0)"
      >
        <span class="text-[16px]">{{ Utils.formatAddress(ethUserStore.account0, 5) }}</span>
        <img src="@/assets/icon_copy.svg" width="12" height="12" />
      </NSpace>
      <NButton quaternary circle @click="onPressDisconnect">
        <template #icon>
          <NIcon><img src="@/assets/icon_disconnect.svg" /></NIcon>
        </template>
      </NButton>
    </NSpace>
    <!-- dex -->
    <NSpace class="px-[16px]" vertical align="center" justify="center" :size="[0, 8]" :wrap-item="false" :wrap="false">
      <NSpace class="mb-[8px]" vertical align="center" justify="center" :size="[0, 0]" :wrap-item="false" :wrap="false">
        <span class="text-[14px] font-[400]">EMC/USDT</span>
        <NSpace class="h-[56px]" vertical align="center" justify="center" :size="[0, 0]" :wrap-item="false" :wrap="false">
          <template v-if="loadings.priceUsd">
            <NSkeleton :width="40" :height="12" />
          </template>
          <template v-else>
            <span class="text-[32px] font-[800]">${{ priceUsd }}</span>
          </template>
        </NSpace>
      </NSpace>
      <NButton type="primary" strong class="w-full" icon-placement="right" @click="onPressDex"
        >Trade on DEXs
        <template #icon>
          <NIcon><img src="@/assets/icon_link.svg" /></NIcon>
        </template>
      </NButton>
      <NButton type="primary" strong class="w-full" icon-placement="right" @click="onPressLocks">Staking Status</NButton>
    </NSpace>
    <NSpace class="px-[16px] mt-[8px]" vertical align="center" justify="center" :size="[0, 8]" :wrap-item="false" :wrap="false">
      <NTabs type="bar" animated>
        <NTabPane name="tokens" tab="Tokens">
          <template v-if="!loadings.priceUsd">
            <Tokens :price-usd="priceUsd" />
          </template>
        </NTabPane>
        <NTabPane name="nodes" tab="Nodes">
          <template v-if="!loadings.priceUsd">
            <Nodes @press-item="onPressNode" />
          </template>
        </NTabPane>
        <!-- <NTabPane name="nodes" tab="Nodes"> Hey Jude </NTabPane> -->
        <!-- <NTabPane name="activity" tab="Activity"> Activity </NTabPane> -->
      </NTabs>
    </NSpace>
  </NSpace>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { NSpace, useMessage, NSkeleton, NButton, NIcon, NTabs, NTabPane } from 'naive-ui';
import { useRouter } from 'vue-router';
import copy from 'copy-to-clipboard';
import { Utils } from '@/tools/utils';
import { useETHUserStore } from '@/stores/eth-user';
import { getDefaultNetwork } from '@/web3/network';
import { getDexData } from '@/apis';

import { toFixedClip } from '@/tools/format-number';
import Tokens from './tokens.vue';
import Nodes from './nodes/index.vue';

//[disconnect] emit parent to close self
const emtis = defineEmits(['close', 'disconnect']);

const router = useRouter();
const ethUserStore = useETHUserStore();
const message = useMessage();
const priceUsd = ref<string>('0.0');
const loadings = ref({ priceUsd: false });
const networkConfig = getDefaultNetwork();

const onPressCopy = (text: string) => {
  copy(text);
  message.success('Copied');
};

function onPressDex() {
  window.open('https://dexscreener.com/arbitrum/0x47b6de853d181626918eecb1e0ed946a5cf96449');
}

function onPressLocks() {
  router.push({ name: 'cliffs-view' });
  emtis('close');
}

async function onPressDisconnect() {
  emtis('disconnect');
}

function onPressNode(nodeId: string) {
  emtis('close');
}
async function init() {
  loadings.value.priceUsd = true;
  const { priceUsd: _priceUsd } = await getDexData();
  loadings.value.priceUsd = false;
  priceUsd.value = toFixedClip(_priceUsd, 4);
}
onMounted(async () => {
  init();
});
</script>
<style scoped>
.wallet {
  height: 100%;
  border-radius: 12px;
  border: solid 1px #4c4c5a;
  background-color: #212121;
}
</style>
