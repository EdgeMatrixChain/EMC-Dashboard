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
        <Wallet :showWallet="showWallet" @close-wallet="closeWallet" @isLogin="loginStatus" />
      </template>
      <template v-else>
        <div class="header-user" @click="onPressLogin">
          <span class="header-user-text">Connect Wallet</span>
        </div>
      </template>
    </NSpace>
    <ConnectWallet :showModal="showModal" @close-modal="closeModal" @isLogin="loginStatus" />
  </NSpace>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
import { NButton, NSpin, NSpace, NMenu, NCard, NTag, NModal, NCollapse, NCollapseItem, useMessage } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { useRouter, useRoute } from 'vue-router';
import { useLogin } from '@/composables/use-login';
import Wallet from './wallet.vue';
import ConnectWallet from '@/components/connect-wallet.vue';

import { instance as emcAuthClient, AuthClient } from '@/tools/auth';

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

export default defineComponent({
  components: { RouterLink, NButton, NSpin, NSpace, NMenu, NCard, NTag, NModal, NCollapse, NCollapseItem, Wallet, ConnectWallet },
  setup() {
    const message = useMessage();
    const tabs = ref<TabItem[]>(tabConfigs);

    const currentTabKey = ref<tabkey>(initTabKey);
    const isLogin = ref(false);
    const router = useRouter();
    const route = useRoute();
    const showModal = ref(false);
    const showWallet = ref(false);

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
      isLogin,
      showWallet,
      showModal,
      onPressUser() {
        //profile
        showWallet.value = true;
      },

      closeWallet() {
        showWallet.value = false;
      },

      onPressLogin() {
        // showModal.value = true;
        emcAuthClient.login({
          provider: 'http://localhost:8080',
          onSuccess: (message) => {
            console.info('success', message);
          },
          onError(message) {
            console.info(message);
          },
        });
      },

      closeModal() {
        showModal.value = false;
      },

      loginStatus(val: boolean) {
        isLogin.value = val;
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
  width: 152px;
  height: 52px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.header-user-text {
  font-size: 16px;
  font-weight: 600;
}

<<<<<<< HEAD
=======
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

>>>>>>> 76b87380af2f6899455cd21c77acc66ffd4fe480
@media (prefers-color-scheme: light) {
  .header-icon {
    content: url('@/assets/logo.light.png');
  }
}
</style>
@/composables/use-login
