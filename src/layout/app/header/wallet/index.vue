<template>
  <div class="wallet">
    <!-- header -->
    <NSpace class="px-[16px] py-[12px]" align="center" justify="space-between" :size="[0, 0]" :wrap-item="false"
      :wrap="false">
      <NSpace class="cursor-pointer" align="center" justify="space-between" :size="[4, 0]" :wrap-item="false"
        :wrap="false" @click="onPressCopy(ethUserStore.account0)">
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
    <div class="wallet-dex px-[16px]">
      <NSpace class="mb-[8px]" vertical align="center" justify="center" :size="[0, 0]" :wrap-item="false" :wrap="false">
        <span class="text-[16px] font-[400] text-[rgba(255,255,255,0.82)]">EMC/USDT</span>
        <NSpace class="h-[56px]" vertical align="center" justify="center" :size="[0, 0]" :wrap-item="false"
          :wrap="false">
          <template v-if="loadings.priceUsd">
            <NSkeleton :width="40" :height="12" />
          </template>
          <template v-else>
            <span class="text-[36px] font-[600]">${{ priceUsd }}</span>
          </template>
        </NSpace>
      </NSpace>
      <NButton type="primary" strong class="w-full text-[16px] font-GeneralSans-Semibold" icon-placement="right" @click="onPressDex">EMC DEX
        <template #icon>
          <NIcon><img src="@/assets/icon_link.svg" /></NIcon>
        </template>
      </NButton>
      <NButton strong class="w-full  text-[16px]" icon-placement="right" @click="onPressLocks">Staking Status</NButton>
    </div>
    <div class="wallet-body px-[16px] mt-[40px] text-[16px]">
      <div class="tab-title flex items-center gap-x-[20px]">
        <div class="text-[#898B95] text-[16px] font-semibold cursor-pointer" @click="onPressTab('nodes')"
          :class="{ '!text-[#fff]': currentTab === 'nodes' }">Nodes</div>
        <div class="text-[#898B95] text-[16px] font-semibold cursor-pointer" @click="onPressTab('tokens')"
          :class="{ '!text-[#fff]': currentTab === 'tokens' }">Tokens</div>
      </div>
      <template v-if="!loadings.priceUsd && currentTab === 'nodes'">
        <Nodes class="pt-[20px]" @press-item="onPressNode" />
      </template>
      <template v-if="!loadings.priceUsd && currentTab === 'tokens'">
        <Tokens class="pt-[20px]" :price-usd="priceUsd" />
      </template>
    </div>
  </div>
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
const currentTab = ref('nodes')

const onPressTab = (tab: string) => {
  currentTab.value = tab
}

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
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 12px;
  background-color: #1E2129;
  border-left: 1px solid transparent;
  border-top: 1px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #1E2129, #1E2129),
    linear-gradient(to bottom,
      rgba(103, 95, 255, 0.5) 0%,
      rgba(103, 95, 255, 0) 100%);
}

.wallet-dex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px 0;
}

.wallet-body {
  flex: 1;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
