<template>
  <NModal v-model:show="dialogVisible" :block-scroll="true" :close-on-esc="false" :mask-closable="false">
    <div class="dailog">
      <div class="dailog-background"></div>
      <div class="dailog-body">
        <div class="dailog-main">
          <img class="dailog-img" src="@/assets/airdrop/gift-fail.svg" />
          <img class="dailog-img-close" src="@/assets/airdrop/icon_gift_close.svg" width="24" height="24" @click="handleClose" />
          <div class="dailog-content">
            <div class="dailog-title">You're not in the whitelist</div>
            <div class="dailog-subtitle">
              Follow
              <span style="color: #fff">EMC twitter</span>
              for more upcoming <br />giveaway activities!
            </div>
            <div class="dailog-button" @click="handleFollow">Follow</div>
            <img class="dailog-content-background" src="@/assets/airdrop/back-emc.svg" />
          </div>
        </div>
      </div>
    </div>
  </NModal>
</template>

<script setup lang="ts">
import { ref, onMounted, h, watch } from 'vue';
import { NModal } from 'naive-ui';
const props = defineProps(['isvisible']);
const emits = defineEmits();

const dialogVisible = ref(false);

const handleFollow = () => {
  window.open('https://twitter.com/EMCprotocol', '_blank');
  handleClose();
};

const handleClose = () => {
  dialogVisible.value = false;
  emits('onClose');
};

watch(
  () => props.isvisible,
  (newVal) => {
    dialogVisible.value = newVal;
  }
);
</script>
<style scoped>
.dailog {
  position: relative;
  width: 32.6875rem;
  height: 27.5rem;
}
.dailog-background {
  position: absolute;
  top: 0rem;
  left: 0rem;
  right: 0rem;
  bottom: 0rem;
  border-radius: 1.5rem;
  padding: 1rem;
  opacity: 0.6;
  background: radial-gradient(34.55% 46.58% at 5.73% 3.11%, #f2a3ff 0%, rgba(231, 227, 248, 0) 100%),
    radial-gradient(37.58% 30.08% at 5.42% 91.67%, #a687ff 0.2%, rgba(192, 177, 255, 0.7) 99.15%), #43eccd;
  mix-blend-mode: screen;
  filter: blur(2.5rem);
}
.dailog-body {
  position: relative;
  width: 32.6875rem;
  height: 27.5rem;
  margin: 0 auto;
  border-radius: 1.5rem;
  padding: 1rem;
  top: 0;
  left: 0;
}
.dailog-main {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  background: radial-gradient(34.55% 46.58% at 5.73% 3.11%, #e3fbe0 0%, rgba(231, 227, 248, 0) 100%),
    radial-gradient(37.58% 30.08% at 5.42% 91.67%, #a687ff 0.2%, rgba(192, 177, 255, 0.7) 99.15%), #84b7ff;
  padding: 1rem;
}
.dailog-img-close {
  width: 1.5rem;
  height: 1.5rem;
  min-width: 16px;
  min-height: 16px;
  position: absolute;
  top: -2.5rem;
  right: -2.5rem;
  cursor: pointer;
}
.dailog-img {
  position: absolute;
  top: calc(0% - 3.5rem);
  left: calc(50% - 4.25rem);
  width: 8.5rem;
  height: 8.5rem;
  z-index: 10;
}
.dailog-content {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  background: linear-gradient(150deg, #f6faef 1.86%, #a19ff1 97.1%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 2.25rem;
}
.dailog-title {
  color: #7e52fb;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  line-height: 2rem;
}

.dailog-subtitle {
  color: #5267fb;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75rem;
  margin: 2rem 0 2.5rem;
}
.dailog-button {
  position: relative;
  width: 9.625rem;
  padding: 0.875rem 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  background: linear-gradient(90deg, #0bfefe 0%, #1a75fe 99.99%, #4a0684 100%);
  box-shadow: 0rem 0rem 1rem 0rem rgba(255, 255, 255, 0.88) inset, 0rem 0.125rem 0.5rem 0rem rgba(0, 234, 255, 0.3);
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1rem;
  cursor: pointer;
  z-index: 10;
}
.dailog-content-background {
  width: 12rem;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
