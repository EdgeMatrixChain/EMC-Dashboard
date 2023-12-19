<template>
  <NModal :show="visible" :mask-closable="false" :block-scroll="false">
    <div class="p-4 bg-[#ffffff30] rounded-xl w-[512px]" style="-webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px)">
      <NCard style="width: 100%; border-radius: 6px; overflow: hidden; padding: 36px 24px" content-style="padding:0">
        <NButton class="absolute top-5 right-5" size="tiny" quaternary circle @click="onPressClose">
          <template #icon>
            <NIcon size="26"><IconClose /></NIcon>
          </template>
        </NButton>
        <NSpace vertical align="center" :wrap-item="false" :size="[0, 16]">
          <NText class="text-[28px] leading-[28px] text-white">Connect wallet</NText>
          <NText class="text-[#C1C1C1] mb-3">Select a wallet you want to connect to EMC</NText>
          <NSpace class="wallet-border" align="center" justify="center" :wrap-item="false">
            <NSpace class="wallet-content" :wrap-item="false" justify="center" align="center" :size="[20, 0]" @click="onPressConnectETH">
              <img class="w-11 h-11" src="@/assets/wallet_meta_mask.png" alt="MetaMask" />
              <NText class="text-[18px] leading-[18px] text-white">MetaMask</NText>
            </NSpace>
          </NSpace>
        </NSpace>
      </NCard>
    </div>
  </NModal>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { NModal, NCard, NButton, NIcon, NSpace, NText, useMessage } from 'naive-ui';
import { CloseCircleOutline as IconClose } from '@vicons/ionicons5';
import { useETHUserStore } from '@/stores/eth-user';

export default defineComponent({
  name: 'icp-connect-dialog',
  components: { NModal, NCard, NButton, NIcon, NSpace, NText, IconClose },
  props: {
    visible: { type: Boolean },
    chainName: { type: String },
  },
  emits: ['update:visible'],
  setup(props, ctx) {
    const ethUserStore = useETHUserStore();
    const message = useMessage();

    return {
      async onPressConnectETH() {
        await ethUserStore.signIn({ type: 'metamask' });
      },
      onPressClose() {
        ctx.emit('update:visible', false);
      },
    };
  },
});
</script>

<style scoped>
.wallet-border {
  position: relative;
  width: 100%;
  height: 72px;
  border-radius: 8px;
  background-image: linear-gradient(to right, #4142f1, #0adac3, #d356f3, #f47e63, #4142f1);
  background-size: 500%;
  animation: border 12s linear infinite;
  z-index: 1;
  border-width: 2px;
  border-style: solid;
  border-color: #282250;
}
.wallet-content {
  width: 100%;
  height: 70px;
  border-radius: 6px;
  background-color: #13262f;
  cursor: pointer;
}

.wallet-border:hover {
  border-color: transparent;
  border-radius: 8px;
}

@keyframes border {
  100% {
    background-position: -500% 0;
  }
}
</style>
