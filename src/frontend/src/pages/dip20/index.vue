<template>
  <div class="page">
    <div class="container">
      <div class="card card-out" ref="rollOut">
        <Claim :isUpdate="isUpdateClaim" @update="onPressUpdateClaim" />
      </div>
      <div class="card card-in" ref="rollIn">
        <Transfer :isUpdate="isUpdateTransfer" @update="onPressUpdateTransfer" @success="onPressTransfer" />
      </div>

      <div class="switch" ref="switchCtn">
        <NSpace class="w-full h-full" vertical :size="[24, 98]" align="center" justify="center" :wrap-item="false">
          <div class="text-[32px] text-center">Convert your $EMC from ICP (DIP20) to Arbitrum (ERC20)</div>
          <NSpace vertical :size="[24, 24]">
            <div class="text-base text-center">
              ICP Contract Address: <br />
              aeex5-aqaaa-aaaam-abm3q-cai
            </div>
            <div class="text-base text-center">
              Arbitrum Contract Address: <br />
              0xDFB8BE6F8c87f74295A87de951974362CedCFA30
            </div>
          </NSpace>

          <template v-if="isSwitch">
            <div class="switch-arrow-left" @click="onSwitch">
              <div class="switch-arrow-min"></div>
              <div class="switch-arrow-max"></div>
            </div>
          </template>
          <template v-else>
            <div class="switch-arrow-right" @click="onSwitch">
              <div class="switch-arrow-min"></div>
              <div class="switch-arrow-max"></div>
            </div>
          </template>
        </NSpace>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { NSpace } from 'naive-ui';
import Transfer from './transfer.vue';
import Claim from './claim.vue';

export default defineComponent({
  name: 'dip20',
  components: { NSpace, Transfer, Claim },

  setup() {
    const switchCtn = ref<null | HTMLInputElement>(null);
    const rollIn = ref<null | HTMLInputElement>(null);
    const rollOut = ref<null | HTMLInputElement>(null);

    const isSwitch = ref(true); //false => left; true => right
    const isUpdateClaim = ref(false);
    const isUpdateTransfer = ref(false);

    const onSwitch = () => {
      // switchCtn.value?.classList.add('is-gx');
      // setTimeout(function () {
      //   switchCtn.value?.classList.remove('is-gx');
      // }, 1500);
      switchCtn.value?.classList.toggle('is-txr');
      rollIn.value?.classList.toggle('is-txl');
      rollOut.value?.classList.toggle('is-txl');
      rollOut.value?.classList.toggle('is-z');
      isSwitch.value = !isSwitch.value;
      if (isSwitch.value) {
        isUpdateTransfer.value = true;
      } else {
        isUpdateClaim.value = true;
      }
    };

    return {
      onSwitch,
      switchCtn,
      rollIn,
      rollOut,
      isSwitch,
      isUpdateClaim,
      isUpdateTransfer,

      onPressUpdateTransfer() {
        isUpdateTransfer.value = false;
      },
      onPressUpdateClaim() {
        isUpdateClaim.value = false;
      },
      onPressTransfer() {
        isUpdateTransfer.value = true;
        onSwitch();
      },
    };
  },
});
</script>
<style scoped>
.page {
  position: relative;
  width: 1190px;
  min-width: 1190px;
  min-height: 648px;
  height: 648px;
  padding: 1px;
  background: linear-gradient(0deg, #9b51e050 0%, #9b51e0 100%);
  border-radius: 11px;
  overflow: hidden;
  margin: calc(50vh - 391px) auto 0;
}
.container {
  width: 100%;
  height: 100%;
  border-radius: 11px;
  overflow: hidden;
  background-color: #1a1c34;
}
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1px;
  bottom: 1px;
  left: 1px;
  width: 638px;
  height: calc(100% - 2px);
  transition: 1.25s;
  box-sizing: border-box;
  border-radius: 11px 0 0 11px;
  overflow: hidden;
}

.card-in {
  z-index: 100;
  left: 1px;
}

.card-out {
  left: 1px;
  z-index: 0;
}

.switch {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1px;
  left: calc(100% - 553px);
  height: calc(100% - 2px);
  width: 552px;
  padding: 24px;
  z-index: 200;
  transition: 1.25s;
  background: url('@/assets/back_transfer_switch.png') no-repeat;
  border-radius: 0 11px 11px 0;
}

.switch_button {
  cursor: pointer;
}

.switch_button:hover,
.submit:hover {
  box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
  transform: scale(0.985);
  transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
  box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
  transform: scale(0.97);
  transition: 0.25s;
}

.is-txr {
  left: 1px;
  transition: 1.25s;
  transform-origin: left;
  border-radius: 11px 0 0 11px;
}

.is-txl {
  left: calc(100% - 639px);
  transition: 1.25s;
  transform-origin: right;
  border-radius: 0 11px 11px 0;
}

.is-z {
  z-index: 200;
  transition: 1.25s;
}

.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}

.is-gx {
  animation: is-gx 1.25s;
}

@keyframes is-gx {
  0%,
  10%,
  100% {
    width: 552px;
  }

  30%,
  50% {
    width: 600px;
  }
}

.switch-arrow-left {
  position: absolute;
  top: calc(50% - 23px);
  right: 40px;
  cursor: pointer;
}
.switch-arrow-right {
  position: absolute;
  top: calc(50% + 23px);
  left: 40px;
  transform: rotate(180deg);
  cursor: pointer;
}

.switch-arrow-max {
  position: absolute;
  top: 0;
  right: 0;
  width: 26px;
  height: 46px;
  background: url('@/assets/icon_switch_arrow_max.svg') 100% no-repeat;
  animation: left-max 3s ease infinite;
  transform-origin: 50% 50%;
}

.switch-arrow-min {
  position: absolute;
  top: 0;
  right: 20px;
  width: 20px;
  height: 46px;
  background: url('@/assets/icon_switch_arrow_min.svg') 100% no-repeat;
  animation: left-min 3s ease infinite;
  transform-origin: 50% 50%;
}

@keyframes left-max {
  0% {
    transform: translateX(0);
  }

  11% {
    transform: translateX(0);
  }
  22% {
    transform: translateX(20px);
  }
  27% {
    transform: translateX(0);
  }
  33% {
    transform: translateX(20px);
  }
  44% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes left-min {
  0% {
    transform: translateX(0);
  }

  11% {
    transform: translateX(0);
  }
  22% {
    transform: translateX(20px);
  }
  27% {
    transform: translateX(0);
  }
  33% {
    transform: translateX(20px);
  }
  44% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
