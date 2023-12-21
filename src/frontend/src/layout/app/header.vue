<template>
  <NSpace class="header" align="center" justify="space-between" :size="[0, 0]" :wrap-item="false" :wrap="false">
    <NSpace class="header-cell">
      <RouterLink :to="{ path: '/' }">
        <img class="header-icon" />
      </RouterLink>
    </NSpace>
    <div class="header-cell flex-nowrap flex gap-x-2 xl:gap-x-10 justify-between items-center">
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
      <NSelect
        style="min-width: 134px"
        v-model:value="selectValue"
        :options="options"
        :render-label="renderLabel"
        @update:value="handleUpdateValue"
        :show-checkmark="false"
      />
      <template v-if="chainName === 'ICP'">
        <template v-if="principal">
          <div class="header-user" @click="onPressUserICP">
            <template v-if="walletBalance.emcBalance !== '' && walletBalance.icpBalance !== ''">
              <NCarousel direction="vertical" :autoplay="true" :show-dots="false" style="width: 100%; height: 52px">
                <div class="carousel-item">
                  {{ walletBalance.emcBalance }} EMC
                  <div class="carousel-item-icon xl:w-7 xl:h-7 w-5 h-5 hidden xl:flex">
                    <img class="xl:w-4 xl:h-4 w-2 h-2" src="@/assets/icon_wallet.svg" />
                  </div>
                </div>
                <div class="carousel-item">
                  {{ walletBalance.icpBalance }} ICP
                  <div class="carousel-item-icon xl:w-7 xl:h-7 w-5 h-5 hidden xl:flex">
                    <img class="xl:w-4 xl:h-4 w-2 h-2" src="@/assets/icon_swap.svg" />
                  </div>
                </div>
                <div class="carousel-item">
                  <span class="header-user-text">{{ principalFormatted }}</span>
                </div>
              </NCarousel>
            </template>
            <template v-else>
              <NSpin size="small" />
            </template>
            <ICPWallet v-model:visible="showWalletICP" @disconnect="onDisconnectICP" @update:balance="onUpdateBalance" />

            <!-- <span class="header-user-text">{{ Utils.formatAddress(principal_id, 5) }}</span> -->
            <!-- <img src="@/assets/icon_drop_down.svg" width="24" height="24" /> -->
          </div>
        </template>
        <template v-else>
          <div class="header-user" @click="onPressLogin">
            <span class="header-user-text">Connect Wallet</span>
          </div>
        </template>
      </template>
      <template v-else>
        <template v-if="ethPrincipal">
          <div class="header-user" @click="onPressUserETH">
            <template v-if="EMCBalanceETH !== '-1'">
              <NCarousel direction="vertical" :autoplay="true" :show-dots="false" style="width: 100%; height: 52px">
                <div class="carousel-item">
                  {{ EMCBalanceETH }} EMC
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
            <ETHWallet v-model:visible="showWalletETH" @disconnect="onDisconnectETH" @update:balance="onUpdateBalanceETH" />
          </div>
        </template>
        <template v-else>
          <div class="header-user" @click="onPressLoginETH">
            <span class="header-user-text">Connect Wallet</span>
          </div>
        </template>
      </template>
      <template v-if="isTablet || isMobile">
        <NDropdown :options="tabs" size="large" @select="onSelect" trigger="click">
          <NButton type="default" circle strong quaternary size="large">
            <template #icon>
              <NIcon size="28"><IconMenu /></NIcon>
            </template>
          </NButton>
        </NDropdown>
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
  SelectOption,
  SelectRenderTag,
  SelectRenderLabel,
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
import { useIsMobile, useIsTablet, useIsSmallDesktop, useIsDesktop } from '@/composables/use-screen';

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
    const message = useMessage();
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
    const selectValue = ref('Arbitrum');
    const walletBalance = ref({
      emcBalance: '',
      icpBalance: '',
    });
    const EMCBalanceETH = ref('-1');

    const isMobile = useIsMobile();
    const isTablet = useIsTablet();

    // props.config.forEach((item: TabItem) => {
    //   options.push({ key: item.path, label:  });
    // });

    const options: Array<SelectOption> = [
      {
        label: 'ICP',
        value: 'ICP',
      },
      {
        label: 'Arbitrum',
        value: 'Arbitrum',
      },
    ];

    const renderLabel: SelectRenderLabel = (option: any) => {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
          },
        },
        [
          option.value === 'Arbitrum'
            ? h('img', {
                src: require('@/assets/icon_arbitrum.svg'),
                style: {
                  width: '28px',
                  height: '28px',
                },
              })
            : h('img', {
                src: require('@/assets/wallet_icp.png'),
                style: {
                  width: '28px',
                  height: '28px',
                },
              }),
          h(
            'div',
            {
              style: {
                marginLeft: '8px',
                padding: '4px 0',
              },
            },
            [h('div', null, [option.label as string])]
          ),
        ]
      );
    };

    onMounted(() => {}),
      watch(
        () => route.path,
        (path, oldVal) => {
          const item = tabs.value.find((item) => item.key === path);
          currentTabKey.value = item?.id || initTabKey;
        },
        { immediate: true }
      );
    watch(
      () => userStore.icpPrincipal,
      (val) => {
        if (chainName.value === 'ICP' && val) {
          showConnect.value = false;
        }
      }
    );
    watch(
      () => ethUserStore.account0,
      (val) => {
        if (chainName.value === 'Arbitrum' && val) {
          showConnectETH.value = false;
        }
      }
    );

    return {
      tabs,
      currentTabKey,
      ethPrincipal: computed(() => ethUserStore.account0),
      ethPrincipalFormatted: computed(() => Utils.formatAddress(ethUserStore.account0, 5)),
      principal: computed(() => userStore.icpPrincipal),
      principalFormatted: computed(() => Utils.formatAddress(userStore.icpPrincipal, 5)),
      showWalletICP,
      showWalletETH,
      showConnect,
      showConnectETH,
      walletBalance,
      EMCBalanceETH,
      chainName,
      onPressUserICP() {
        showWalletICP.value = true;
      },
      onPressUserETH() {
        showWalletETH.value = true;
      },
      onPressLogin() {
        showConnect.value = true;
      },
      onPressLoginETH() {
        showConnectETH.value = true;
      },
      onDisconnectICP() {
        showWalletICP.value = false;
        userStore.disconnect();
        walletBalance.value.emcBalance = '';
        walletBalance.value.icpBalance = '';
      },
      onDisconnectETH() {
        ethUserStore.signOut();
        showWalletETH.value = false;
      },
      onUpdateBalance(val: { emcBalance: string; icpBalance: string }) {
        walletBalance.value.emcBalance = Number(val.emcBalance).toFixed(2);
        walletBalance.value.icpBalance = Number(val.icpBalance).toFixed(2);
      },
      onUpdateBalanceETH(val: { emcBalance: string }) {
        EMCBalanceETH.value = Number(val.emcBalance).toFixed(2);
      },
      handleUpdateValue(value: string, option: SelectOption) {
        chainName.value = value;
      },
      selectValue,
      options,
      renderLabel,
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
  flex-shrink: 0;
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
  bottom: 0;
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
