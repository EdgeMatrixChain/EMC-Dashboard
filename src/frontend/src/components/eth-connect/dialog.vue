<template>
  <NModal :show="visible" :mask-closable="false" :block-scroll="false">
    <NCard style="width: 100%; max-width: 516px; border-radius: 12px; overflow: hidden; border: 16px solid rgba(255, 255, 255, 0.1); padding: 36px 24px" content-style="padding:0">
      <NButton class="absolute top-5 right-5" size="tiny" quaternary circle @click="onPressClose">
        <template #icon>
          <NIcon size="26"><IconClose /></NIcon>
        </template>
      </NButton>
      <NSpace vertical align="center" :wrap-item="false" :size="[0, 16]">
        <NText class="text-[28px] leading-[28px] text-white">Connect wallet</NText>
        <NText class="text-[#C1C1C1] mb-3">Select a wallet you want to connect to EMC</NText>
        <NSpace class="wallet-border w-full" align="center" justify="center" :wrap-item="false">
          <NSpace class="wallet-content w-full h-full py-[14px] rounded-lg bg-[#13262F] cursor-pointer" justify="center" align="center" :size="[20, 0]" @click="onPressConnectETH">
            <img class="w-11 h-11" src="@/assets/wallet_meta_mask.png" alt="MetaMask" />
            <NText class="text-[18px] leading-[18px] text-white">MetaMask</NText>
          </NSpace>
        </NSpace>
      </NSpace>
    </NCard>
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
  height: 72px;
  border-radius: 8px;
  background-image: linear-gradient(to right, #4142f1, #0adac3, #d356f3, #f47e63, #4142f1);
  background-size: 400%;
  animation: border 12s linear infinite;
  z-index: 1;
  box-sizing: border-box;
}
.wallet-content {
  border-radius: 6px;
  padding: 10px;
}

.wallet-border:hover {
  padding: 2px;
}

@keyframes border {
  100% {
    background-position: -400% 0;
  }
}
</style>
