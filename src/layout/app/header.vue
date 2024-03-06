<template>
  <NSpace class="header" align="center" justify="space-between" :size="[0, 0]" :wrap-item="false" :wrap="false">
    <NSpace class="header-cell" align="center" :size="[40, 0]" :wrap-item="false" :wrap="false">
      <RouterLink :to="{ path: '/' }">
        <img class="header-icon" />
      </RouterLink>
      <template v-if="!isTablet && !isMobile">
        <NSpace class="header-tabs" align="center" :size="[40, 0]" :wrap-item="false" :wrap="false">
          <template v-for="item in tabs">
            <RouterLink :to="{ path: item.key }" style="text-decoration: none; color: inherit">
              <div class="header-tabs-item" :class="{ 'header-tabs-item__actived': item.id === currentTabKey }">
                <span class="header-tabs-item-text whitespace-nowrap">{{ item.label }}</span>
              </div>
            </RouterLink>
          </template>
        </NSpace>
      </template>
      <template v-else>
        <NDropdown :options="tabs" size="large" @select="onDropdownMenuSelect" trigger="click">
          <NButton type="default" circle strong quaternary size="large">
            <template #icon>
              <NIcon size="28">
                <IconMenu />
              </NIcon>
            </template>
          </NButton>
        </NDropdown>
      </template>
    </NSpace>
    <div class="header-cell flex-nowrap flex gap-x-2 xl:gap-x-10 justify-between items-center">
      <template v-if="!ethUserStore.isConnected">
        <div class="header-user" @click="onPressConnect">
          <span class="header-user-text">Connect Wallet</span>
        </div>
      </template>
      <template v-else-if="ethUserStore.isInvalidNetwork">
        <div class="header-user" @click="onPressSwitchNetwork">
          <span class="header-user-text">Network Error</span>
        </div>
      </template>
      <template v-else>
        <div class="header-user" @click="onPressUser">
          <span class="header-user-text">{{ Utils.formatAddress(ethUserStore.account0, 5) }}</span>
          <div class="text-[12px]">
            <span class="max-w-[76px] overflow-hidden whitespace-nowrap text-ellipsis" style="margin-right: 4px">{{ ethUserStore.tokens.emc.short }}</span>
            <span class="mr-[4px]">{{ ethUserStore.tokens.emc.symbolName }}</span>
          </div>
        </div>
        <NDrawer
          v-model:show="visibleWallet"
          :auto-focus="false"
          :width="400"
          :height="'88%'"
          :placement="walletPlacement"
          style="background-color: transparent"
        >
          <NDrawerContent body-content-style="padding:8px;"> <Wallet @close="onWalletClose" @disconnect="onWalletDisconnect" /> </NDrawerContent>
        </NDrawer>
      </template>
    </div>
  </NSpace>
</template>
<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { NSpace, NDropdown, NButton, NIcon, NDrawer, NDrawerContent } from 'naive-ui';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { Utils } from '@/tools/utils';
import { useETHUserStore } from '@/stores/eth-user';
import Wallet from './wallet/index.vue';
import { MenuSharp as IconMenu } from '@vicons/ionicons5';
import { useIsMobile, useIsTablet } from '@/composables/use-screen';
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
  { id: 4, label: 'Migration', key: '/dip20' },
  // { id: 3, name: 'Marketplace', path: '/market' },
];

const initTabKey = -1;
const emits = defineEmits(['isLoading']);

const ethUserStore = useETHUserStore();
const router = useRouter();
const route = useRoute();
const isMobile = useIsMobile();
const isTablet = useIsTablet();

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

function onDropdownMenuSelect(path: string) {
  if (path.startsWith('http')) {
    window.open(path);
  } else {
    router.push(path);
  }
}

async function onPressConnect() {
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
}

.header-cell {
  position: relative;
  padding: 0 32px;
}

.header-icon {
  width: 244px;
  object-fit: cover;
  content: url('@/assets/logo.png');
}

.header-tabs {
  --actived-color: #8f7df8;
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
}

.header-tabs-item.header-tabs-item__actived .header-tabs-item-text {
  color: var(--actived-color);
}

.header-user {
  position: relative;
  background-image: linear-gradient(90deg, #2f0593 0%, #861cb9 100%);
  border-radius: 6px;
  width: 152px;
  height: 52px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header-user-text {
  font-size: 16px;
  font-weight: 700;
}

@media (prefers-color-scheme: light) {
  .header-icon {
    /* content: url('@/assets/logo.light.png'); */
    content: url('@/assets/logo.png');
  }
}

@media screen and (max-width: 1280px) {
  .header-cell {
    padding: 0 16px;
  }

  .header-icon {
    width: 36px;
    height: 36px;
    /* content: url('@/assets/logo.light.png'); */
    content: url('@/assets/icon_coin_emc.png');
    margin-left: 16px;
  }
}
</style>
