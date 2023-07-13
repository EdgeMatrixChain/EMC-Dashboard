<template>
  <NSpace class="header" align="center" justify="space-between" :size="[0, 0]" :wrap-item="false">
    <NSpace class="header-cell">
      <img class="header-icon" />
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
      <template v-if="isLogin">
        <div class="header-user" @click="onPressUser">
          <span class="header-user-text">User Name</span>
        </div>
      </template>
      <template v-else>
        <div class="header-user" @click="onPressLogin">
          <span class="header-user-text">Connect Wallet</span>
        </div>
      </template>
      <Wallet :showWallet="showWallet" @close-modal="closeModal" />
      <NModal v-model:show="showModal" transform-origin="center">
        <div class="header-modal">
          <div class="header-modal-main">
            <img src="@/assets/icon_connect_wallet.svg" />
            <NSpace class="wallet-box" justify="space-between">
              <template v-for="item in walletList">
                <NSpace class="wallet-item" vertical align="center" style="gap: 0" @click="onSelectLogin(item.id)">
                  <div class="wallet-item-icon-bgcolor">
                    <div class="wallet-item-icon-fgcolor">
                      <NSpace class="wallet-item-icon-fgcolor-main" align="center" justify="center">
                        <img :src="item.icon" />
                      </NSpace>
                    </div>
                  </div>
                  <div class="wallet-item-title">{{ item.name }}</div>
                  <div class="wallet-item-tips">Click to connect</div>
                </NSpace>
              </template>
            </NSpace>
          </div>
        </div>
      </NModal>
    </NSpace>
  </NSpace>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
import { NButton, NSpin, NSpace, NMenu, NCard, NTag, NModal, useMessage } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { useRouter, useRoute } from 'vue-router';
import { useLogin } from '@/composables/use-login';
import Wallet from '@/components/wallet.vue';
import walletIcp from '@/assets/wallet_icp.png';
import walletMe from '@/assets/wallet_me.png';
import walletPlug from '@/assets/wallet_plug.png';

type tabkey = number;

type TabItem = {
  id: tabkey;
  name: string;
  path: string;
};

const tabConfigs: TabItem[] = [
  { id: 1, name: 'Home', path: '/home' },
  { id: 2, name: 'Node', path: '/nodes' },
  { id: 3, name: 'Marketplace', path: '/market' },
];

const initTabKey = -1;

type WalletItem = {
  id: number;
  icon: any;
  name: string;
};

const walletConfigs: WalletItem[] = [
  { id: 1, icon: walletIcp, name: 'INTERNET IDENTITY' },
  { id: 2, icon: walletMe, name: 'AstroX ME' },
  { id: 3, icon: walletPlug, name: 'Plug' },
];

export default defineComponent({
  components: { RouterLink, NButton, NSpin, NSpace, NMenu, NCard, NTag, NModal, Wallet },
  setup() {
    const message = useMessage();
    const tabs = ref<TabItem[]>(tabConfigs);
    const walletList = ref<WalletItem[]>(walletConfigs);

    const currentTabKey = ref<tabkey>(initTabKey);
    const isLogin = ref(false);
    const router = useRouter();
    const route = useRoute();
    const showModal = ref(false);
    const showWallet = ref(false);

    const { loginIC } = useLogin();

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
      walletList,
      isLogin,
      showModal,
      showWallet,
      onPressUser() {
        //profile
      },
      onPressLogin() {
        showModal.value = true;
      },
      onSelectLogin(id: number) {
        showModal.value = false;
        showWallet.value = true;
        console.log(id);
        // loginIC();
      },
      closeModal() {
        showWallet.value = false;
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
  background-image: linear-gradient(90deg, #2f0593 0%, #861cb9 100%);
  border-radius: 6px;
  padding: 0 8px;
  height: 52px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.header-user-text {
  font-size: 16px;
  font-weight: 600;
}

.header-modal {
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
}
.header-modal-main {
  padding: 56px 0 48px;
  text-align: center;
  border-radius: 6px;
  background: linear-gradient(180deg, #1f1f1f 0%, #111 100%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.wallet-box {
  padding: 56px 20px 0;
}
.wallet-item {
  min-width: 180px;
}
.wallet-item-icon-bgcolor {
  width: 120px;
  height: 120px;
  border-radius: 2px;
  background: linear-gradient(45deg, #4142f1 0%, #0adac3 32.29%, #d356f3 68.23%, #f47e63 100%);
  box-sizing: border-box;
}
.wallet-item-icon-fgcolor {
  width: 120px;
  height: 120px;
  padding: 1px;
  border-radius: 1.6px;
  background-color: #26414b;
  box-sizing: border-box;
}
.wallet-item-icon-fgcolor:hover {
  background-color: transparent;
  cursor: pointer;
}
.wallet-item-icon-fgcolor-main {
  width: 100%;
  height: 100%;
  border-radius: 1.6px;
  background-color: #13262f;
}
.wallet-item-title {
  margin: 16px 0 12px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
}
.wallet-item-tips {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}

@media (prefers-color-scheme: light) {
  .header-icon {
    content: url('@/assets/logo.light.png');
  }
}
</style>
@/composables/use-login
