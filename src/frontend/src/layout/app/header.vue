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
      <template v-if="isLogin">
        <div class="header-user" @click="onPressUser">
          <span class="header-user-text">User Name</span>
        </div>
        <Wallet :showWallet="showWallet" @close-wallet="closeWallet" @isLogin="loginStatus" :walletData="walletData" />
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

const walletData: { principal_id: string } = {
  principal_id: '',
};

const initTabKey = -1;

export default defineComponent({
  components: {
    RouterLink,
    NButton,
    NSpin,
    NSpace,
    NMenu,
    NCard,
    NTag,
    NModal,
    NCollapse,
    NCollapseItem,
    Wallet,
    ConnectWallet,
  },
  emits: ['isLoading'],
  setup(props, context) {
    const message = useMessage();
    const tabs = ref<TabItem[]>(tabConfigs);

    const currentTabKey = ref<tabkey>(initTabKey);
    const isLogin = ref(false);
    const router = useRouter();
    const route = useRoute();
    const showWallet = ref(false);
    const showModal = ref(false);

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
      walletData,
      showModal,
      onPressUser() {
        //profile
        // showWallet.value = true;
      },
      onPressLogin() {
        context.emit('isLoading', true);
        emcAuthClient.login({
          // provider: 'http://localhost:8080',
          onSuccess: (message) => {
            console.info('success', message);
            //{"type": "authorize-success","data": "tdvch-tx3ik-r2bzp-pncic-ahjes-57rvk-oa6qu-blzh2-brbs5-x67zv-jae"}
            if (message.type === 'authorize-success') {
              walletData.principal_id = message.data;
              isLogin.value = true;
              context.emit('isLoading', false);
            }
          },
          onError(message) {
            console.info(message);
            context.emit('isLoading', false);
          },
        });
      },
      closeWallet() {
        showWallet.value = false;
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

@media (prefers-color-scheme: light) {
  .header-icon {
    content: url('@/assets/logo.light.png');
  }
}
</style>
@/composables/use-login
