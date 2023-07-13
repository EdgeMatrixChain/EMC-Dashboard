<template>
  <NLayout position="absolute" content-style="display:flex;align-items:center;justify-content:center;">
    <div class="wallet">
      <img class="wallet-title-img" src="@/assets/icon_connect_wallet.svg" />
      <NSpace class="wallet-body" justify="space-between">
        <template v-for="item in walletList">
          <NSpace class="wallet-item" vertical align="center" :size="[0, 0]" @click="onPressItem(item)">
            <div class="wallet-item-icon-bgcolor">
              <div class="wallet-item-icon-fgcolor">
                <NSpace class="wallet-item-icon-fgcolor-main" align="center" justify="center">
                  <img :src="item.icon" />
                </NSpace>
              </div>
            </div>
            <div class="wallet-item-title">{{ item.name }}</div>
            <!-- <div class="wallet-item-tips">Click to connect</div> -->
          </NSpace>
        </template>
      </NSpace>
    </div>
  </NLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { NLayout, NSpace } from 'naive-ui';

import IconWalletIcp from '@/assets/wallet_icp.png';
import IconWalletMe from '@/assets/wallet_me.png';
import IconWalletPlug from '@/assets/wallet_plug.png';

type WalletItem = {
  id: number;
  name: string;
  icon: any;
};

const walletConfigs: WalletItem[] = [
  { id: 1, icon: IconWalletIcp, name: 'INTERNET IDENTITY' },
  { id: 2, icon: IconWalletMe, name: 'AstroX ME' },
  { id: 3, icon: IconWalletPlug, name: 'Plug' },
];

export default defineComponent({
  name: 'auth',
  components: { NLayout, NSpace },
  setup() {
    const walletList = ref<WalletItem[]>(walletConfigs);
    return {
      walletList,
      onPressItem(item: any) {
        
      },
    };
  },
});
</script>

<style scoped>
.wallet {
  padding: 56px 0;
  text-align: center;
  border-radius: 6px;
  background-image: linear-gradient(180deg, #1f1f1f 0%, #111111 100%);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.wallet-body {
  margin-top: 48px;
  padding: 0 20px;
}

.wallet-item {
  width: 180px;
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

.wallet-item-title {
  margin: 16px 0 12px;
  /* color: #ffffff; */
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
}
.wallet-item-tips {
  /* color: rgba(255, 255, 255, 0.6); */
  opacity: 0.6;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}
</style>
