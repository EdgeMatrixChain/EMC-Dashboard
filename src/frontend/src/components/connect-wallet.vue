<template>
  <NModal v-model:show="isVisible" :block-scroll="false" transform-origin="center" :on-mask-click="onPressMask">
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
</template>
<script lang="ts">
import { ref, watch, computed, defineComponent } from 'vue';
import { NSpace, NModal, NButton } from 'naive-ui';
import walletIcp from '@/assets/wallet_icp.png';
import walletMe from '@/assets/wallet_me.png';
import walletPlug from '@/assets/wallet_plug.png';

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
  name: 'connect-wallet',
  components: { NSpace, NModal, NButton },
  props: {
    showModal: { type: Boolean, default: false },
  },
  emits: ['close-modal', 'isLogin'],
  setup(props, context) {
    const walletList = ref<WalletItem[]>(walletConfigs);
    const isVisible = ref(props.showModal);

    watch(
      () => props.showModal,
      (newVal) => {
        isVisible.value = newVal;
      }
    );
    const onPressMask = () => {
      context.emit('close-modal');
    };

    const onSelectLogin = (id: number) => {
      context.emit('isLogin', true);
      context.emit('close-modal');
    };
    return {
      walletList,
      isVisible,
      onPressMask,
      onSelectLogin,
    };
  },
});
</script>
<style scoped>
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
</style>
