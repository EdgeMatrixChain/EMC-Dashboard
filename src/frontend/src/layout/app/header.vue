<template>
  <NSpace class="header" align="center" justify="space-between" :size="[0, 0]" :wrap-item="false">
    <NSpace class="header-cell">
      <RouterLink :to="{ path: '/' }">
        <img class="header-icon" />
      </RouterLink>
    </NSpace>
    <NSpace class="header-cell" align="center" justify="space-between" :wrap-item="false">
      <NSpace class="header-tabs" align="center" :size="[24, 0]" :wrap-item="false">
        <template v-for="item in tabs">
          <RouterLink :to="{ path: item.path }" style="text-decoration: none; color: inherit">
            <div class="header-tabs-item" :class="{ 'header-tabs-item__actived': item.id === currentTabKey }">
              <span class="header-tabs-item-text">{{ item.name }}</span>
            </div>
          </RouterLink>
        </template>
      </NSpace>
      <template v-if="principal">
        <div class="header-user" @click="onPressUser">
          <template v-if="walletBalance.emcBalance !== '' && walletBalance.icpBalance !== ''">
            <NCarousel direction="vertical" :autoplay="true" :show-dots="false" style="width: 100%; height: 52px">
              <div class="carousel-item">
                {{ walletBalance.emcBalance }} EMC
                <div class="carousel-item-icon">
                  <img src="@/assets/icon_wallet.svg" width="16" height="16" />
                </div>
              </div>
              <div class="carousel-item">
                {{ walletBalance.icpBalance }} ICP
                <div class="carousel-item-icon">
                  <img src="@/assets/icon_swap.svg" width="16" height="16" />
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

          <!-- <span class="header-user-text">{{ Utils.formatAddress(principal_id, 5) }}</span> -->
          <!-- <img src="@/assets/icon_drop_down.svg" width="24" height="24" /> -->
        </div>
        <Wallet v-model:visible="showWallet" @disconnect="onDisconnect" @update:balance="onUpdateBalance" />
      </template>
      <template v-else>
        <div class="header-user" @click="onPressLogin">
          <span class="header-user-text">Connect Wallet</span>
        </div>
        <ICPConnectDialog v-model:visible="showConnect" />
      </template>
    </NSpace>
  </NSpace>
</template>
<script lang="ts">
import { ref, defineComponent, watch, computed } from 'vue';
import { NSpin, NSpace, NCarousel, useMessage } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import { Utils } from '@/tools/utils';
import ICPConnectDialog from '@/components/icp-connect/dialog.vue';
import Wallet from './wallet.vue';
import { useUserStore } from '@/stores/user';

type tabkey = number;

type TabItem = {
  id: tabkey;
  name: string;
  path: string;
};

const tabConfigs: TabItem[] = [
  { id: 1, name: 'Home', path: '/home' },
  { id: 2, name: 'Node', path: '/nodes' },
  // { id: 3, name: 'Marketplace', path: '/market' },
];

const initTabKey = -1;

export default defineComponent({
  components: { RouterLink, NSpin, NSpace, NCarousel, Wallet, ICPConnectDialog },
  emits: ['isLoading'],
  setup(props, context) {
    const message = useMessage();
    const tabs = ref<TabItem[]>(tabConfigs);
    const userStore = useUserStore();
    const currentTabKey = ref<tabkey>(initTabKey);
    const route = useRoute();
    const showWallet = ref(false);
    const showConnect = ref(false);
    const walletBalance = ref({
      emcBalance: '',
      icpBalance: '',
    });
    watch(
      () => route.path,
      (path, oldVal) => {
        const item = tabs.value.find((item) => item.path === path);
        currentTabKey.value = item?.id || initTabKey;
      },
      { immediate: true }
    );

    return {
      tabs,
      currentTabKey,
      principal: computed(() => userStore.icpPrincipal),
      principalFormatted: computed(() => Utils.formatAddress(userStore.icpPrincipal, 5)),
      showWallet,
      showConnect,
      walletBalance,
      onPressUser() {
        showWallet.value = true;
      },
      onPressLogin() {
        showConnect.value = true;
      },
      onDisconnect() {
        showWallet.value = false;
        userStore.disconnect();
        walletBalance.value.emcBalance = '';
        walletBalance.value.icpBalance = '';
      },
      onUpdateBalance(val: { emcBalance: string; icpBalance: string }) {
        walletBalance.value.emcBalance = Number(val.emcBalance).toFixed(2);
        walletBalance.value.icpBalance = Number(val.icpBalance).toFixed(2);
      },
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
  margin-right: 24px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
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
}
.header-user-text {
  font-size: 16px;
  font-weight: 600;
}

@media (prefers-color-scheme: light) {
  .header-icon {
    /* content: url('@/assets/logo.light.png'); */
    content: url('@/assets/logo.png');
  }
}
</style>
