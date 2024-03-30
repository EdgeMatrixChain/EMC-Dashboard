<template>
  <NModal :show="isVisible" :block-scroll="true" :close-on-esc="false" :mask-closable="false" transform-origin="center">
    <div class="dialog">
      <div class="dialog-background"></div>
      <div class="dialog-body">
        <img class="dialog-face" src="@/assets/airdrop/fail.svg" />
        <img class="dialog-close" src="@/assets/airdrop/close.svg" width="24" height="24" @click="handleClose" />
        <div class="dialog-content">
          <div class="dialog-title" :style="titleStyle">You're not in the whitelist</div>
          <div class="dialog-tips">
            Follow
            <span style="color: #fff">EMC twitter</span>
            for more upcoming <br />giveaway activities!
          </div>
          <div class="dialog-button" @click="handleFollow">Follow</div>
          <img class="dialog-footer" src="@/assets/airdrop/footer.svg" />
        </div>
      </div>
    </div>
  </NModal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NModal } from 'naive-ui';
import { useIsMobile } from '@/composables/use-screen';
const props = defineProps({
  isVisible: Boolean,
});
const emits = defineEmits(['close']);
const isMobile = useIsMobile();
const titleStyle = computed(() => {
  let fontSize = '32px';
  if (isMobile.value) {
    fontSize = '24px';
  }
  return { fontSize };
});
const handleFollow = () => {
  window.open('https://twitter.com/EMCprotocol', '_blank');
  handleClose();
};

const handleClose = () => {
  emits('close');
};
</script>
<style scoped>
.dialog {
  position: relative;
  width: 80%;
  max-width: 480px;
}

.dialog-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  opacity: 0.6;
  background: radial-gradient(34.55% 46.58% at 5.73% 3.11%, #f2a3ff 0%, rgba(231, 227, 248, 0) 100%),
    radial-gradient(37.58% 30.08% at 5.42% 91.67%, #a687ff 0.2%, rgba(192, 177, 255, 0.7) 99.15%), #43eccd;
  mix-blend-mode: screen;
  filter: blur(32px);
}
.dialog-body {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: radial-gradient(34.55% 46.58% at 5.73% 3.11%, #e3fbe0 0%, rgba(231, 227, 248, 0) 100%),
    radial-gradient(37.58% 30.08% at 5.42% 91.67%, #a687ff 0.2%, rgba(192, 177, 255, 0.7) 99.15%), #84b7ff;
  padding: 16px;
}
.dialog-close {
  position: absolute;
  top: -40px;
  right: -40px;
  height: 40px;
  width: 40px;
  cursor: pointer;
}

.dialog-face {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 136px;
  height: 136px;
  z-index: 10;
}

.dialog-content {
  position: relative;
  border-radius: 20px;
  background: linear-gradient(150deg, #f6faef 1.86%, #a19ff1 97.1%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 48px 46px 48px;
  gap: 16px 0;
  box-sizing: border-box;
}
.dialog-title {
  font-family: monospace;
  color: #7e52fb;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
}

.dialog-tips {
  color: #5267fb;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
}
.dialog-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 44px;
  border-radius: 6px;
  background: linear-gradient(90deg, #0bfefe 0%, #1a75fe 99.99%, #4a0684 100%);
  box-shadow: 0 0 16px 0 rgba(255, 255, 255, 0.88) inset, 0 4px 8px 0 rgba(0, 234, 255, 0.3);
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  z-index: 10;
}
.dialog-footer {
  width: 188px;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
