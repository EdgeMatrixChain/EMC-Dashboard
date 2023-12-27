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
        <NDropdown :options="tabs" size="large" @select="onSelect" trigger="click">
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
      <template v-if="ethPrincipal">
        <div class="header-user" @click="onPressUser">
          <template v-if="emcBalance">
            <NCarousel direction="vertical" :autoplay="true" :show-dots="false" style="width: 100%; height: 52px">
              <div class="carousel-item">
                <span class="header-user-text"> {{ emcBalance }} EMC</span>
                <div class="carousel-item-icon hidden xl:flex">
                  <img src="@/assets/icon_wallet.svg" width="16" height="16" />
                </div>
              </div>
              <div class="carousel-item">
                <span class="header-user-text">{{ ethPrincipalFormatted }}</span>
              </div>
            </NCarousel>
          </template>
          <template v-else>
            <NSpin size="small" />
          </template>
          <ETHWallet v-model:visible="showWalletETH" @disconnect="onDisconnectETH" />
        </div>
      </template>
      <template v-else>
        <div class="header-user" @click="onPressConnect">
          <span class="header-user-text">Connect Wallet</span>
        </div>
      </template>

      <ICPConnectDialog v-model:visible="showConnect" />
      <ETHConnectDialog v-model:visible="showConnectETH" />
    </div>
  </NSpace>
</template>
<script lang="ts">
import { ref, defineComponent, watch, h, onMounted, computed } from 'vue';
import {
  NAvatar,
  NText,
  NSpin,
  NSpace,
  NCarousel,
  NSelect,
  useMessage,
  NDropdown,
  NButton,
  NIcon,
} from 'naive-ui';
import { useRoute, useRouter, RouterLink, onBeforeRouteUpdate } from 'vue-router';
import { Utils } from '@/tools/utils';
import { useUserStore } from '@/stores/user';
import { useETHUserStore } from '@/stores/eth-user';
import ICPWallet from './icp-wallet.vue';
import ETHWallet from './eth-wallet.vue';
import ICPConnectDialog from '@/components/icp-connect/dialog.vue';
import ETHConnectDialog from '@/components/eth-connect/dialog.vue';
import { MenuSharp as IconMenu } from '@vicons/ionicons5';
import { useIsMobile, useIsTablet } from '@/composables/use-screen';
import IconArbitrum from '@/assets/icon_arbitrum.svg';
import IconWalletIcp from '@/assets/wallet_icp.png';

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
  { id: 4, label: 'Transfer token', key: '/dip20' },

  // { id: 3, name: 'Marketplace', path: '/market' },
];

const initTabKey = -1;

export default defineComponent({
  components: {
    RouterLink,
    NSpin,
    NSpace,
    NCarousel,
    NSelect,
    ETHWallet,
    ICPWallet,
    NAvatar,
    NText,
    ICPConnectDialog,
    ETHConnectDialog,
    NDropdown,
    NButton,
    NIcon,
    IconMenu,
  },
  emits: ['isLoading'],
  setup(props, context) {
    const tabs = ref<TabItem[]>(tabConfigs);
    const userStore = useUserStore();
    const ethUserStore = useETHUserStore();
    const router = useRouter();
    const currentTabKey = ref<tabkey>(initTabKey);
    const route = useRoute();
    const showWalletICP = ref(false);
    const showWalletETH = ref(false);
    const showConnect = ref(false);
    const showConnectETH = ref(false);
    const chainName = ref('Arbitrum');

    const isMobile = useIsMobile();
    const isTablet = useIsTablet();


    watch(
      () => route.path,
      (path, oldVal) => {
        const item = tabs.value.find((item) => item.key === path);
        currentTabKey.value = item?.id || initTabKey;
      },
      { immediate: true }
    );

    return {
      tabs,
      currentTabKey,
      ethPrincipal: computed(() => ethUserStore.account0),
      ethPrincipalFormatted: computed(() => Utils.formatAddress(ethUserStore.account0, 5)),
      showWalletETH,
      showConnect,
      showConnectETH,
      emcBalance: computed(() => ethUserStore.balance.emc.short),
      chainName,
      onPressUser() {
        showWalletETH.value = true;
      },
      async onPressConnect() {
        ethUserStore.signIn();
      },
      onDisconnectETH() {
        showWalletETH.value = false;
        ethUserStore.signOut();
      },
      onSelect(path: string) {
        if (path.startsWith('http')) {
          window.open(path);
        } else {
          router.push(path);
        }
      },
      isMobile,
      isTablet,
    };
  },
});
</script>
<style scoped>
.header {
  --header-height: 84px;
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

.carousel-item {
  width: 100%;
  height: 52px;
  line-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-item-icon {
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  filter: drop-shadow(0px 2px 4px rgba(37, 0, 54, 0.1));
  margin-left: 4px;
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
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-shrink: 0;
}

.header-user-text {
  font-size: 16px;
  font-weight: 600;
}

.n-select :deep(.n-base-selection) {
  --n-border-hover: 1px solid #8f7df8 !important;
  --n-border-active: 1px solid #8f7df8 !important;
  --n-border-focus: 1px solid #8f7df8 !important;
  --n-color: transparent !important;
}

:global(.n-select-menu) {
  --n-option-text-color-active: #8f7df8 !important;
  --n-option-check-color: #8f7df8 !important;
}

@media (prefers-color-scheme: light) {
  .header-icon {
    /* content: url('@/assets/logo.light.png'); */
    content: url('@/assets/logo.png');
  }
}

@media screen and (max-width: 1280px) {
  .header-cell {
    padding: 0 12px;
  }

  .header-icon {
    width: 36px;
    height: 36px;
    /* content: url('@/assets/logo.light.png'); */
    content: url('@/assets/icon_coin_emc.png');
  }

  .header-user {
    width: 102px;
    height: 36px;
  }

  .header-user-text,
  .carousel-item {
    font-weight: normal;
    font-size: 12px;
  }
}
</style>
