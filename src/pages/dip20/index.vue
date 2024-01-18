<template>
  <div class="page h-full fixed top-0 left-0 right-0 flex justify-center items-start xl:items-center pt-[392px] xl:pt-[40px] bg-[#1a1c34] xl:bg-[#101014]">
    <div class="main xl:relative xl:w-[1190px] xl:h-[648px] p-0 xl:p-[1px] w-full">
      <div class="page-container" style="display: flex; flex-direction: column-reverse; align-items: center">
        <div class="card card-out w-full xl:absolute xl:w-[638px]" ref="rollOut">
          <Claim :isUpdate="isUpdateClaim" @update="onPressUpdateClaim" />
        </div>
        <div class="card card-in w-full xl:absolute xl:w-[638px]" ref="rollIn">
          <Transfer :isUpdate="isUpdateTransfer" @update="onPressUpdateTransfer" @success="onPressTransfer" />
        </div>

        <div class="switch w-full top-0 left-0 right-0 xl:top-[1px] xl:w-[552px] xl:p-6 pt-16" ref="switchCtn">
          <NSpace class="w-full h-full" vertical :size="[0, 0]" align="center" justify="center" :wrap-item="false">
            <div class="text-[20px] xl:text-[32px] text-center mb-4 xl:mb-[56px]">
              Migrate your $EMC from <br />
              ICP (DIP20) to Arbitrum (ERC20)
            </div>
            <NSpace class="text-center" vertical :size="[0, 0]">
              <NText class="xl:text-base">
                ICP Contract Address: <br />
                aeex5-aqaaa-aaaam-abm3q-cai
              </NText>
              <NText class="block xl:text-base my-4 xl:my-6">
                Arbitrum Contract Address: <br />
                0xDFB8BE6F8c87f74295A87de951974362CedCFA30
              </NText>
              <NSpace class="px-4 mt-5 xl:mt-6" vertical align="center" :size="[0, 8]">
                <NSpace class="relative w-[232px] h-10 leading-10 rounded bg-gradient-to-r from-[#49DEFF] to-[#F64FFF] overflow-hidden cursor-pointer" justify="center" @click="onPressAddToken">
                  <NText class="text-white">Add Token</NText>
                  <!-- <img class="absolute inset-0" src="@/assets/icon_wallet_mask.png"  /> -->
                </NSpace>
              </NSpace>
            </NSpace>
            <template v-if="isSwitch">
              <div class="switch-arrow-left hidden xl:block" @click="onSwitch">
                <div class="switch-arrow-min"></div>
                <div class="switch-arrow-max"></div>
              </div>
            </template>
            <template v-else>
              <div class="switch-arrow-right hidden xl:block" @click="onSwitch">
                <div class="switch-arrow-min"></div>
                <div class="switch-arrow-max"></div>
              </div>
            </template>
          </NSpace>
        </div>
      </div>
    </div>
    <img class="fixed bottom-0 right-0 z-1 opacity-20" src="@/assets/back_transfer.png" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { NSpace, useMessage, NText } from 'naive-ui';
import Transfer from './transfer.vue';
import Claim from './claim.vue';
import { Web3Service } from '@/web3';
import { ERC20Api } from '@/web3/api/erc20';
import { ApiManager } from '@/web3/api';

export default defineComponent({
  name: 'dip20',
  components: { NSpace, NText, Transfer, Claim },

  setup() {
    const w3s = Web3Service.getInstance();
    const apiManager = ApiManager.getInstance();

    const message = useMessage();

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

      async onPressAddToken() {
        const address = '0xDFB8BE6F8c87f74295A87de951974362CedCFA30';
        const erc20Api: null | ERC20Api = apiManager.create(ERC20Api, { address: address });
        const { data: _decimals } = await erc20Api.decimals();
        const { data: _symbol } = await erc20Api.symbol();

        const resp = await w3s.addToken({
          type: 'ERC20',
          address: address,
          symbol: _symbol,
          decimals: Number(_decimals),
        });

        if (resp._result !== 0) {
          message.error(resp._desc as string);
        } else {
          message.success('Add Token succeeded');
        }
      },
    };
  },
});
</script>
<style scoped>
.page {
  width: 100%;
  /* height: calc(100vh - 132px); */
  /* min-height: 101vh; */
  overflow: auto;
}
.main {
  background: linear-gradient(0deg, #9b51e050 0%, #9b51e0 100%);
  border-radius: 11px;
  z-index: 2;
}
.page-container {
  width: 100%;
  height: 100%;
  border-radius: 11px;
  background-color: #1a1c34;
}
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 1px;
  bottom: 1px;
  left: 1px;
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
  /* display: none; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: calc(100% - 553px);
  height: calc(100% - 2px);
  z-index: 200;
  transition: 1.25s;
  background: url('@/assets/back_transfer_switch.png') no-repeat 100%;
  border-radius: 0 11px 11px 0;
  background-size: cover;
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

@media screen and (max-width: 1280px) {
  .switch {
    left: 0;
    height: 392px;
  }
}
</style>
