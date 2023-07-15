<template>
  <NLayout position="absolute" content-style="display:flex;align-items:center;justify-content:center;">
    <div class="wallet">
      <NSpace class="wallet-header" vertical :wrap-item="false" align="center" justify="center" :size="[0, 0]">
        <img class="wallet-header-img" src="@/assets/icon_connect_wallet.svg" />
      </NSpace>
      <NSpace class="wallet-body" :size="[0, 0]" :wrap-item="false" align="center" justify="center">
        <template v-if="error === -1">
          <NSpin></NSpin>
        </template>
        <template v-else-if="error > 0">
          <NH3>{{ errorText }}</NH3>
        </template>
        <template v-else>
          <template v-for="item in walletList">
            <NSpace class="wallet-item" vertical align="center" :size="[0, 0]" @click="onPressItem(item)">
              <div class="wallet-item-icon-bgcolor">
                <div class="wallet-item-icon-fgcolor">
                  <NSpace class="wallet-item-icon-fgcolor-main" align="center" justify="center">
                    <img :src="item.icon" />
                  </NSpace>
                </div>
              </div>
              <div class="wallet-item-name">{{ item.name }}</div>
              <!-- <div class="wallet-item-tips">Click to connect</div> -->
            </NSpace>
          </template>
        </template>
      </NSpace>
    </div>
  </NLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { NLayout, NSpace, NSpin, NH3, useMessage } from 'naive-ui';
import { useLogin } from './use-login';

import IconWalletIcp from '@/assets/wallet_icp.png';
import IconWalletMe from '@/assets/wallet_me.png';
import IconWalletPlug from '@/assets/wallet_plug.png';

type WalletItem = {
  id: number;
  name: string;
  icon: any;
};

type AuthRequest = {
  type: string;
};

interface AuthResult {
  _result: 0 | number;
  _desc?: string;
  request?: AuthRequest;
  origin?: string;
}

const AUTH_MESSAGE_KIND_THIRD_READY = 'authorize-ready';
const AUTH_MESSAGE_KIND_SETUP = 'authorize-setup';
const AUTH_MESSAGE_KIND_SUCCESS = 'authorize-success';
const AUTH_MESSAGE_KIND_FAILURE = 'authorize-failure';

const waitForAuthRequest = (): Promise<AuthResult> => {
  return new Promise<AuthResult>((resolve) => {
    let timer: any = null;

    let eventHandler = (event: MessageEvent) => {
      const authRequest: AuthRequest = event.data as AuthRequest;
      if (authRequest.type === AUTH_MESSAGE_KIND_SETUP) {
        if (timer) clearTimeout(timer);
        window.removeEventListener('message', eventHandler);
        console.log(`Handling ${AUTH_MESSAGE_KIND_SETUP} request `, authRequest);
        resolve({ _result: 0, request: authRequest, origin: event.origin });
      } else {
        console.warn(`Bad authentication request received: `, authRequest);
      }
    };

    // Set up an event listener for receiving messages from the client.
    window.addEventListener('message', eventHandler);

    timer = setTimeout(() => {
      window.removeEventListener('message', eventHandler);
      resolve({ _result: 99, _desc: 'TIMEOUT' });
    }, 5000);
  });
};

const walletConfigs: WalletItem[] = [
  { id: 1, icon: IconWalletIcp, name: 'INTERNET IDENTITY' },
  { id: 2, icon: IconWalletMe, name: 'AstroX ME' },
  { id: 3, icon: IconWalletPlug, name: 'Plug' },
];

export default defineComponent({
  name: 'auth',
  components: { NLayout, NSpace, NSpin, NH3 },
  setup() {
    const message = useMessage();
    const { internetIdentityLogin } = useLogin();
    const error = ref(-1);
    const errorText = ref('');
    const walletList = ref<WalletItem[]>(walletConfigs);
    onMounted(async () => {
      if (window.opener === null) {
        console.error('window.opener in not defined');
        error.value = 1;
        errorText.value = 'Where am I coming from';
        return;
      }
      window.opener.postMessage({ type: AUTH_MESSAGE_KIND_THIRD_READY }, '*');
      const resp = await waitForAuthRequest();
      error.value = resp._result;
      errorText.value = resp._desc || '';
    });
    return {
      error,
      errorText,
      walletList,
      async onPressItem(item: WalletItem) {
        if (item.id === 1) {
          //internet identity
          const resp = await internetIdentityLogin();
          if (resp._result === 0) {
            window.opener.postMessage({ type: AUTH_MESSAGE_KIND_SUCCESS, data: resp.principal }, '*');
          } else {
            window.opener.postMessage({ type: AUTH_MESSAGE_KIND_FAILURE, data: resp._desc }, '*');
          }
        } else if (item.id === 2) {
          message.info('🐔');
        }
      },
    };
  },
});
</script>

<style scoped>
.wallet {
  width: 580px;
  height: 360px;
  box-sizing: border-box;
  padding: 56px 24px;
  text-align: center;
  border-radius: 6px;
  background-image: linear-gradient(180deg, #1f1f1f 0%, #111111 100%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.wallet-header {
  margin-bottom: 48px;
}

.wallet-header-img {
  height: 30px;
}

.wallet-body {
  min-height: 164px;
}

.wallet-item {
  flex: 1;
  width: 0;
}
.wallet-item-icon-bgcolor {
  width: 120px;
  height: 120px;
  border-radius: 2px;
  background-image: linear-gradient(45deg, #4142f1 0%, #0adac3 32.29%, #d356f3 68.23%, #f47e63 100%);
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

.wallet-item-name {
  margin: 16px 0 12px;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
}
.wallet-item-tips {
  opacity: 0.6;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}
</style>
