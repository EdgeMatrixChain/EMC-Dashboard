<template>
  <NModal v-model:show="dialogVisible" :block-scroll="true" :close-on-esc="false" :mask-closable="false">
    <div class="dailog">
      <div class="dailog-background"></div>
      <div class="dailog-body">
        <div class="dailog-main">
          <img class="dailog-img-rotate" src="@/assets/airdrop/gift-success-rotate.png" />
          <img class="dailog-img-flower" src="@/assets/airdrop/gift-success-flower.svg" />

          <img class="dailog-img-star dailog-img-star1" src="@/assets/airdrop/icon_gift_star.svg" />
          <img class="dailog-img-star dailog-img-star2" src="@/assets/airdrop/icon_gift_star.svg" />
          <img class="dailog-img-star dailog-img-star3" src="@/assets/airdrop/icon_gift_star.svg" />
          <img class="dailog-img-star dailog-img-star4" src="@/assets/airdrop/icon_gift_star.svg" />

          <div class="red-ball red-ball1"></div>
          <div class="red-ball red-ball2"></div>
          <div class="red-ball red-ball3"></div>
          <div class="yellow-ball yellow-ball1"></div>
          <div class="yellow-ball yellow-ball2"></div>
          <div class="yellow-ball yellow-ball3"></div>

          <img class="dailog-img" src="@/assets/airdrop/gift-success.svg" />
          <img class="dailog-img-close" src="@/assets/airdrop/icon_gift_close.svg" width="24" height="24" @click="handleClose" />
          <div class="dailog-content">
            <div class="dailog-title">Congrats!</div>
            <div class="dailog-amount">{{ amount }} EMC</div>
            <div class="dailog-subtitle">
              You Received an EMC lucky airdrop. <br />
              Shoot to the moon!
            </div>
            <div class="dailog-button" @click="handleClaim">Claim</div>
            <img class="dailog-content-background" src="@/assets/airdrop/back-emc.svg" />
          </div>
        </div>
      </div>
    </div>
  </NModal>
</template>
<script setup lang="ts">
import { ref, PropType, watch } from 'vue';
import { NModal } from 'naive-ui';
import { ethers } from 'ethers';

const props = defineProps({
  isvisible: Boolean,
  amount: String,
});
const emits = defineEmits(['onClaim', 'onClose']);
const dialogVisible = ref(false);
const amountStr = ref('0');

const handleClaim = () => {
  emits('onClaim');
};

const handleClose = () => {
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
  top: calc(0% - 5.5rem);
  left: calc(50% - 5.5rem);
  width: 11rem;
  height: 11rem;
  z-index: 1;
}

@keyframes opactiy {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.dailog-img-star {
  position: absolute;
  z-index: 11;
}

.dailog-img-star1 {
  top: -10%;
  left: calc(50% - 1rem);
  width: 0.5rem;
  height: 0.5rem;
  animation: scaleStar 1.2s linear infinite;
}

.dailog-img-star2 {
  top: 4%;
  left: calc(50% + 2.25rem);
  width: 0.625rem;
  height: 0.625rem;
  animation: scaleStar 1.2s linear 0.2s infinite;
}
.dailog-img-star3 {
  top: 3%;
  left: calc(50% - 2.5rem);
  width: 0.75rem;
  height: 0.75rem;
  animation: scaleStar 1.2s linear 0.5s infinite;
}
.dailog-img-star4 {
  top: -7%;
  left: calc(50% + 1.375rem);
  width: 0.875rem;
  height: 0.875rem;
  animation: scaleStar 1.2s linear 0.8s infinite;
}

@keyframes scaleStar {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1.4);
  }
}
@keyframes scaleBall {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}
.red-ball {
  background-color: #f76973;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
}
.yellow-ball {
  background-color: #f4a821;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
}
.red-ball1 {
  top: -24%;
  left: calc(50% + 3.25rem);
  width: 0.375rem;
  height: 0.375rem;
  animation: scaleBall 1s linear 0.2s infinite;
}
.red-ball2 {
  top: 4%;
  left: calc(50% - 5rem);
  width: 0.625rem;
  height: 0.625rem;
  animation: scaleBall 1s linear 0.4s infinite;
}
.red-ball3 {
  top: 0%;
  left: calc(50% + 6rem);
  width: 0.5rem;
  height: 0.5rem;
  animation: scaleBall 1s linear 0.6s infinite;
}
.yellow-ball1 {
  top: -20%;
  left: calc(50% - 3.25rem);
  width: 0.25rem;
  height: 0.25rem;
  animation: scaleBall 1s linear 0.1s infinite;
}
.yellow-ball2 {
  top: -16%;
  left: calc(50% + 5rem);
  width: 0.75rem;
  height: 0.75rem;
  animation: scaleBall 1s linear 0.3s infinite;
}
.yellow-ball3 {
  top: -10%;
  left: calc(50% - 8.75rem);
  width: 0.625rem;
  height: 0.625rem;
  animation: scaleBall 1s linear 0.5s infinite;
}

.dailog-img-flower {
  position: absolute;
  top: calc(0% - 5.6875rem);
  left: calc(50% - 11.5rem);
  width: 23rem;
  height: 11.375rem;
  animation: scale 0.8s ease forwards;
  z-index: 1;
}

@keyframes scale {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
}

.dailog-img-rotate {
  position: absolute;
  top: calc(0% - 12.75rem);
  left: calc(50% - 17.4375rem);
  width: 34.875rem;
  height: 34.875rem;
  animation: rotate 10s linear infinite;
  z-index: -1;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
  padding: 0 3rem 2.25rem;
}
.dailog-title {
  color: #7e52fb;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  line-height: 2rem;
}

.dailog-amount {
  width: 100%;
  border-radius: 0.25rem;
  background-color: #9396cf;
  text-align: center;
  margin-top: 1rem;
  padding: 0.875rem 0;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 2.75rem;
}
.dailog-subtitle {
  color: #5267fb;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75rem;
  margin: 1rem 0 2rem;
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
