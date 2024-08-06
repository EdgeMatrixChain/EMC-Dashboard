<template>
  <div class="header">
    <div class="header-content">
      <div class="header-cell w-[232px]">
        <RouterLink class="p-[16px]" :to="{ path: '/' }">
          <img class="header-icon" />
        </RouterLink>
        <template v-if="isMobile">
          <PopupMenu :configs="tabConfigs" />
        </template>
      </div>
      <template v-if="!isMobile">
        <div class="header-tabs flex-1 items-center justify-center">
          <template v-for="item in tabs">
            <RouterLink :to="{ path: item.key }" style="text-decoration: none; color: inherit">
              <!-- <div class="header-tabs-item" :class="{ 'header-tabs-item__actived': item.id === currentTabKey }"> -->
              <div class="header-tabs-item">
                <span
                  class="header-tabs-item-text whitespace-nowrap px-[22.5px] rounded-lg font-GeneralSans-Semibold font-semibold hover:bg-[#1C1B21]">
                  {{ item.label }}
                </span>
              </div>
            </RouterLink>
          </template>
        </div>
      </template>
      <div class="header-cell sm:w-[232px] justify-end">
        <template v-if="!ethUserStore.isConnected">
          <div class="header-user xs:!h-[40px] " @click="onPressConnect">
            <span class="header-user-text xs:!text-[13px]">Connect Wallet</span>
          </div>
        </template>
        <template v-else-if="ethUserStore.isInvalidNetwork">
          <div class="header-user" @click="onPressSwitchNetwork">
            <span class="header-user-text xs:!text-[13px]">Network Error</span>
          </div>
        </template>
        <template v-else>
          <div class="header-user" @click="onPressUser">
            <span class="header-user-text xs:!text-[13px]">{{ Utils.formatAddress(ethUserStore.account0, 5) }}</span>
            <div class="header-user-balance opacity-80">
              <span class="header-user-balance-text" style="margin-right: 4px">({{ ethUserStore.tokens.emc.short || 0
                }})</span>
              <span class="header-user-balance-unit">{{ ethUserStore.tokens.emc.symbolName }}</span>
            </div>
          </div>
          <NDrawer v-model:show="visibleWallet" :auto-focus="false" :width="400" :height="'88%'"
            :placement="walletPlacement" style="background-color: transparent">
            <NDrawerContent body-content-style="padding:8px;">
              <Wallet @close="onWalletClose" @disconnect="onWalletDisconnect" />
            </NDrawerContent>
          </NDrawer>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { NDrawer, NDrawerContent } from 'naive-ui';
import { useRoute, RouterLink } from 'vue-router';
import { Utils } from '@/tools/utils';
import { useETHUserStore } from '@/stores/eth-user';
import { useIsMobile } from '@/composables/use-screen';
import PopupMenu from './popup-menu.vue';
import Wallet from './wallet/index.vue';
type tabkey = number;

type TabItem = {
  id: tabkey;
  label: string;
  key: string;
};

const tabConfigs: TabItem[] = [
  { id: 1, label: 'Home', key: '/home' },
  { id: 2, label: 'Node', key: '/nodes' },
  { id: 3, label: 'Staking', key: '/staking' },
  // { id: 4, label: 'Migration', key: '/dip20' },
  // { id: 3, name: 'Marketplace', path: '/market' },
];

const initTabKey = -1;

const ethUserStore = useETHUserStore();
const route = useRoute();
const isMobile = useIsMobile();

const tabs = ref<TabItem[]>(tabConfigs);
const currentTabKey = ref<tabkey>(initTabKey);
const walletPlacement = computed(() => (isMobile.value ? 'bottom' : 'right'));
const visibleWallet = ref(false);

watch(
  () => route.path,
  (path, oldVal) => {
    const item = tabs.value.find((item) => item.key === path);
    currentTabKey.value = item?.id || initTabKey;
  },
  { immediate: true }
);

async function onPressConnect() {
  console.log('>>>>>>>>>>>1111');

  ethUserStore.signIn();
}

function onPressSwitchNetwork() {
  ethUserStore.switchNetwork();
}

function onPressUser() {
  visibleWallet.value = true;
}

function onWalletDisconnect() {
  visibleWallet.value = false;
  ethUserStore.signOut();
}

function onWalletClose() {
  visibleWallet.value = false;
}
</script>
<style scoped>
.header {
  height: var(--header-height);
  position: relative;
  z-index: 99;
}

.header-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* max-width: var(--screen-max-width); */
  margin: auto;
  box-sizing: border-box;
  /* mobile */
  min-width: 0;
  padding-left: 16px;
  padding-right: 16px;
  height: var(--header-height);
}

.header-cell {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0 8px;
}

.header-icon {
  width: 26px;
  height: 26px;
  object-fit: cover;
  height: auto;
  content: url('@/assets/logo-mobile.png');
}

.header-tabs {
  flex: 1;
  width: 0;
  --actived-color: #8f7df8;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0 55px;
}

.header-tabs-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: var(--header-height);
}

.header-tabs-item::after {
  content: '';
  display: none;
  position: absolute;
  transform: translate(-50%, 0);
  left: 50%;
  bottom: 16px;
  height: 2px;
  width: 32px;
  border-radius: 2px;
  background-color: var(--actived-color);
}

.header-tabs-item.header-tabs-item__actived::after {
  display: block;
}

.header-tabs-item-text {
  font-size: 16px;
  line-height: 40px;
}

.header-tabs-item.header-tabs-item__actived .header-tabs-item-text {
  color: var(--actived-color);
}

.header-user {
  position: relative;
  /* background-image: linear-gradient(90deg, #2f0593 0%, #861cb9 100%);
  border-radius: 6px; */
  border-radius: 68px;
  background: #5a1ddd;
  font-size: 16px;
  width: 120px;
  height: 48px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header-user-text {
  font-size: 14px;
  font-weight: 700;
}

.header-user-balance {
  font-size: 12px;
  line-height: 1.2;
}

.header-user-balance-text {
  display: inline-block;
  max-width: 76px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 4px;
  vertical-align: top;
}

.header-user-balance-unit {}

@media (min-width: 640px) {
  .header-content {
    min-width: var(--screen-min-width);
    padding-left: 100px;
    padding-right: 100px;
  }

  .header-icon {
    width: 200px;
    height: auto;
    content: url('@/assets/logo.png');
  }

  .header-cell {
    gap: 0 16px;
  }

  .header-user {
    width: 166px;
    height: 50px;
  }

  .header-user-text {
    font-size: 16px;
  }
}
</style>
