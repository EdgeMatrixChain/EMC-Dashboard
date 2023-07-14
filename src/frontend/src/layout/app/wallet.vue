<template>
  <NModal v-model:show="isVisible" :block-scroll="false" :on-mask-click="onPressMask">
    <div class="wallet-bgcolor">
      <div class="wallet-mask">
        <div class="wallet-mask-header"></div>
        <div class="wallet-mask-footer"></div>
      </div>
      <div class="wallet-border"></div>
      <div class="wallet-decoration">
        <div class="wallet-decoration-ball"></div>
        <div class="wallet-decoration-border-round"></div>
      </div>
      <div class="wallet-main">
        <NSpace class="wallet-main-account" justify="space-between">
          <div>
            <div class="theme-font-style">Account ID</div>
            <div class="account-id">666a1...cc3a46d</div>
          </div>
          <NButton class="logout-button" icon-placement="left" secondary strong @click="onPressLogout">
            <span class="logout-button-span">Log out</span>
            <template #icon>
              <img src="@/assets/icon_logout.svg" width="16" height="16" />
            </template>
          </NButton>
        </NSpace>
        <div class="wallet-main-principal">
          <div class="theme-font-style">Principal ID</div>
          <div class="principal-id">m4zke-gjaul-agomz-q2uia-7afns-nmoxp-o4a5b-dbqk6-jhbg4-qvpe-svg</div>
        </div>
        <NSpace class="wallet-main-link" justify="space-between">
          <div class="wallet-main-link-item">
            <span class="theme-font-style">My NFTS</span>
            <img class="wallet-main-link-icon" src="@/assets/icon_arrow_right_theme.svg" />
          </div>
          <div class="wallet-main-link-item">
            <span class="theme-font-style">My nodes</span>
            <img class="wallet-main-link-icon" src="@/assets/icon_arrow_right_theme.svg" />
          </div>
        </NSpace>
        <NSpace class="coin-info" justify="space-between" align="center">
          <NSpace class="coin-info-left" justify="space-between" align="center" :wrap-item="false" :size="0">
            <div class="coin-info-icon">
              <img src="@/assets/icon_coin_emc.png" width="28" height="28" />
            </div>
            <div class="coin-info-name">EMC</div>
            <img src="@/assets/icon_arrow_down.svg" width="12" height="6" />
          </NSpace>
          <NSpace class="coin-info-right" justify="space-between" align="center" :wrap-item="false" :size="0">
            <div class="coin-info-balance">Balance :</div>
            <div class="coin-info-balance-box">
              <div class="coin-info-number">4.41130 EMC</div>
            </div>
          </NSpace>
        </NSpace>
        <NSpace class="coin-info" justify="space-between" align="center">
          <NSpace class="coin-info-left" justify="space-between" align="center" :wrap-item="false" :size="0">
            <div class="coin-info-icon">
              <img src="@/assets/icon_coin_icp.png" width="28" height="28" />
            </div>
            <div class="coin-info-name">ICP</div>
            <img src="@/assets/icon_arrow_down.svg" width="12" height="6" />
          </NSpace>
          <NSpace class="coin-info-right" justify="space-between" align="center" :wrap-item="false" :size="0">
            <div class="coin-info-balance">Balance :</div>
            <div class="coin-info-balance-box">
              <div class="coin-info-number">1.44458741 ICP</div>
              <div class="coin-info-number-probably">
                <span>≈ </span>
                <span>0.00081243</span>
              </div>
            </div>
          </NSpace>
        </NSpace>
        <div class="swap-button">
          <div class="swap-button-mask">Swap</div>
        </div>
      </div>
    </div>
  </NModal>
</template>

<script lang="ts">
import { ref, watch, computed, defineComponent } from 'vue';
import { NSpace, NModal, NButton } from 'naive-ui';

export default defineComponent({
  name: 'wallet',
  components: { NSpace, NModal, NButton },
  props: {
    showWallet: { type: Boolean, default: false },
  },
  emits: ['close-wallet', 'isLogin'],
  setup(props, context) {
    const isVisible = ref(props.showWallet);
    watch(
      () => props.showWallet,
      (newVal) => {
        isVisible.value = newVal;
      }
    );

    const onPressMask = () => {
      context.emit('close-wallet');
    };
    const onPressLogout = () => {
      context.emit('isLogin', false);
      context.emit('close-wallet');
    };
    return {
      isVisible,
      onPressMask,
      onPressLogout,
    };
  },
});
</script>

<style scoped>
.wallet-bgcolor {
  position: absolute;
  top: 84px;
  right: 32px;
  width: 380px;
  height: 390px;
  border-radius: 0px 0px 4px 4px;
  background-color: #181927;
  box-shadow: 0px 0px 0px 0px rgba(131, 125, 176, 0.1), 0px 10px 30px 0px rgba(131, 125, 176, 0.1), 0px 20px 54px 0px rgba(131, 125, 176, 0.09), 0px 20px 73px 0px rgba(131, 125, 176, 0.05), 0px 100px 86px 0px rgba(131, 125, 176, 0.01),
    0px 338px 95px 0px rgba(131, 125, 176, 0);
  /* transition: 1s all linear; */
  overflow: hidden;
  z-index: 1;
}
.wallet-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  filter: blur(40px);

  z-index: 2;
}
.wallet-mask-header {
  position: absolute;
  left: 30px;
  top: -30px;
  width: 234px;
  height: 90px;
  background: linear-gradient(235deg, rgba(33, 55, 142, 0.48) 0%, rgba(176, 80, 160, 0.48) 100%);
}
.wallet-mask-footer {
  position: absolute;
  left: 35px;
  bottom: 20px;
  width: 234px;
  height: 90px;
  background: linear-gradient(101deg, rgba(113, 209, 209, 0.18) 0%, rgba(176, 80, 160, 0.18) 100%);
}
.wallet-border {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0px 0px 4px 4px;
  border-right: 1px solid #716381;
  border-bottom: 1px solid #716381;
  border-left: 1px solid #716381;
  background: rgba(24, 25, 39, 0.1);
  backdrop-filter: blur(10px);
  z-index: 3;
}
.wallet-decoration {
  position: absolute;
  top: 54px;
  right: 92px;
  z-index: 4;
}
.wallet-decoration-border-round {
  position: absolute;
  top: -10px;
  left: 10px;
  width: 46px;
  height: 46px;
  transform: rotate(-45deg);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  z-index: 5;
}
.wallet-decoration-ball {
  position: absolute;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  transform: rotate(-45deg);
  background: conic-gradient(from 180deg at 50% 50%, #561ed0 0deg, rgba(58, 27, 141, 0.8) 91.87500357627869deg, #65238a 178.1249964237213deg, rgba(79, 23, 185, 0.8) 266.2499928474426deg, #3678e7 360deg);
  filter: blur(2px);
  z-index: 6;
}
.wallet-main {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  z-index: 7;
}

.theme-font-style {
  color: #8f7df8;
  font-size: 12px;
  font-weight: 300;
  line-height: 16px;
}
.wallet-main-account {
  padding-left: 12px;
}
.account-id {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}

.logout-button {
  padding: 8px;
  border-radius: 8px;
  background: rgba(14, 14, 14, 0.12);
  backdrop-filter: blur(1px);
}
.logout-button-span {
  font-size: 12px;
  font-weight: 300;
  line-height: 12px;
}

.wallet-main-principal {
  width: 100%;
  margin-top: 16px;
  padding: 10px 12px;
  border-radius: 8px;
  background-color: #1d1f40;
  box-sizing: border-box;
}
.principal-id {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
}
.wallet-main-link {
  margin: 16px 0;
}
.wallet-main-link-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 42px;
  border-radius: 8px;
  background-color: #1d1f40;
}
.wallet-main-link-icon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
}
.coin-info {
  width: 100%;
  height: 72px;
  margin-top: 8px;
  padding: 0px 8px;
  background-color: #191a37;
  border: 4px solid #1d1f40;
  border-radius: 8px;
  box-sizing: border-box;
}
.coin-info-left {
  display: flex;
  align-items: center;
}

.coin-info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  border-radius: 50%;
  background-color: #fff;
  filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.1)) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.09)) drop-shadow(0px 7px 4px rgba(0, 0, 0, 0.05)) drop-shadow(0px 12px 5px rgba(0, 0, 0, 0.01))
    drop-shadow(0px 19px 5px rgba(0, 0, 0, 0));
}
.coin-info-name {
  min-width: 32px;
  margin-right: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.7px;
}
.coin-info-balance {
  margin-right: 12px;
  color: #e4e4e4;
  font-size: 12px;
  font-weight: 300;
  line-height: 8px;
}
.coin-info-balance-box {
  width: 112px;
  padding: 6px 0;
  background: linear-gradient(90deg, #191a37 0%, #23234f 54.17%, #191a37 100%);
  text-align: center;
}

.coin-info-number {
  color: #fff;
  font-size: 14px;
  font-weight: 300;
  line-height: 22px;
  letter-spacing: 0.7px;
}
.coin-info-number-probably {
  color: #eee;
  font-size: 12px;
  font-weight: 300;
  line-height: 12px;
}

.swap-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: calc(50% - 20px);
  bottom: 76px;
  width: 40px;
  height: 40px;
  background-image: linear-gradient(119deg, #5c19f1 0%, #920fd8 100%);
  border-radius: 50%;
  z-index: 111;
}
.swap-button-mask {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  border-radius: 50%;
  border: 1px solid #202020;
  background: radial-gradient(37.5% 37.5% at 50% 50%, rgba(20, 0, 54, 0.2204) 0%, rgba(0, 0, 0, 0.38) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  box-sizing: border-box;
}
</style>
