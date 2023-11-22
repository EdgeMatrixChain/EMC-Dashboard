<template>
  <NModal class="n-modal" :show="visible" :block-scroll="false" :on-mask-click="onPressMask">
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
            <NSpace class="account-id" @click="onPressCopy(account)" :size="[0, 0]">
              <span>{{ Utils.formatAddress(account, 6) }}</span>
              <img src="@/assets/icon_copy.png" width="12" height="12" style="margin: 0px 0 4px 4px" />
            </NSpace>
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
          <div class="principal-id" @click="onPressCopy(principal)">
            <span>{{ principal }}</span>
            <img src="@/assets/icon_copy.png" width="12" height="12" style="margin: 0px 0 4px 4px; display: inline-block" />
          </div>
        </div>
        <!-- <NSpace class="wallet-main-link" justify="space-between">
          <div class="wallet-main-link-item">
            <span class="theme-font-style">My NFTS</span>
            <img class="wallet-main-link-icon" src="@/assets/icon_arrow_right_theme.svg" />
          </div>
          <div class="wallet-main-link-item">
            <span class="theme-font-style">My nodes</span>
            <img class="wallet-main-link-icon" src="@/assets/icon_arrow_right_theme.svg" />
          </div>
        </NSpace> -->
        <NSpace class="coin-info" justify="space-between" align="center">
          <NSpace class="coin-info-left" justify="space-between" align="center" :wrap-item="false" :size="0">
            <div class="coin-info-icon">
              <img src="@/assets/icon_coin_emc.png" width="28" height="28" />
              <!-- <img :src="emcMetaData.logo" width="24" height="24" /> -->
            </div>
            <!-- {{ emcMetaData.symbol }} -->
            <div class="coin-info-name">EMC</div>
            <!-- <img src="@/assets/icon_arrow_down.svg" width="12" height="6" /> -->
          </NSpace>
          <NSpace class="coin-info-right" justify="space-between" align="center" :wrap-item="false" :size="0">
            <div class="coin-info-balance">Balance :</div>
            <div class="coin-info-balance-box">
              <div class="coin-info-number">{{ emcBalance }}</div>
            </div>
          </NSpace>
        </NSpace>
        <NSpace class="coin-info" justify="space-between" align="center">
          <NSpace class="coin-info-left" justify="space-between" align="center" :wrap-item="false" :size="0">
            <div class="coin-info-icon">
              <img src="@/assets/icon_coin_icp.png" width="28" height="28" />
            </div>
            <!-- {{ icpMetaData.symbol }} -->
            <div class="coin-info-name">ICP</div>
            <!-- <img src="@/assets/icon_arrow_down.svg" width="12" height="6" /> -->
          </NSpace>
          <NSpace class="coin-info-right" justify="space-between" align="center" :wrap-item="false" :size="0">
            <div class="coin-info-balance">Balance :</div>
            <div class="coin-info-balance-box">
              <div class="coin-info-number">{{ icpBalance }}</div>
              <!-- <div class="coin-info-number-probably">
                <span>≈ </span>
                <span>0.00081243</span>
              </div> -->
            </div>
          </NSpace>
        </NSpace>
        <NSpace justify="space-between" align="center" :wrap-item="false" :size="0" style="margin: 12px 8px 0">
          <a href="https://ramp.alchemypay.org/?crypto=ICP&network=ICP&appId=W8eeN2mFk96o0L1w&callbackUrl=https://api.yumi.io/api/fiat_orders/webhooks" target="_blank">
            <div class="wallet-footer-button">
              <div class="wallet-footer-button-bgcolor">
                <NSpace class="wallet-footer-button-bgcolor-content" justify="center" align="center" :size="[12, 0]">
                  <div class="wallet-footer-icon">
                    <img src="@/assets/icon_wallet.svg" width="14" height="14" />
                  </div>
                  <span class="wallet-footer-span">Buy ICP</span>
                </NSpace>
                <img src="@/assets/icon_wallet_mask.png" style="position: absolute; top: 4px; left: 4px; right: 4px; bottom: 4px; z-index: 10; width: 132px" />
              </div>
            </div>
          </a>
          <a href="https://app.icpswap.com/swap?input=ryjl3-tyaaa-aaaaa-aaaba-cai&output=aeex5-aqaaa-aaaam-abm3q-cai" target="_blank">
            <div class="wallet-footer-button">
              <div class="wallet-footer-button-bgcolor">
                <NSpace class="wallet-footer-button-bgcolor-content" justify="center" align="center" :size="[12, 0]">
                  <div class="wallet-info-icon">
                    <img src="@/assets/icon_coin_emc.png" width="20" height="20" />
                  </div>
                  <div class="wallet-footer-icon" style="margin: 0">
                    <img src="@/assets/icon_swap.svg" width="16" height="16" />
                  </div>
                  <div class="wallet-info-icon">
                    <img src="@/assets/icon_coin_icp.png" width="20" height="20" />
                  </div>
                </NSpace>
                <img src="@/assets/icon_wallet_mask.png" style="position: absolute; top: 4px; left: 4px; right: 4px; bottom: 4px; z-index: 10; width: 132px" />
              </div>
            </div>
          </a>
        </NSpace>
        <!-- <a href="https://app.icpswap.com/swap?input=ryjl3-tyaaa-aaaaa-aaaba-cai&output=aeex5-aqaaa-aaaam-abm3q-cai">
          <div class="swap-button">
            <div class="swap-button-mask">Swap</div>
          </div>
        </a> -->
      </div>
    </div>
  </NModal>
</template>

<script lang="ts">
import { ref, onMounted, computed, defineComponent, watch } from 'vue';
import { NSpace, NModal, NButton, useMessage } from 'naive-ui';
import copy from 'copy-to-clipboard';
import { Utils } from '@/tools/utils';
import { useUserStore } from '@/stores/user';
import { ethers } from 'ethers';
import { Http } from '@/tools/http';

export default defineComponent({
  name: 'wallet',
  components: { NSpace, NModal, NButton },
  props: {
    visible: { type: Boolean, default: false },
  },
  emits: ['update:visible', 'disconnect', 'update:balance'],
  setup(props, context) {
    const message = useMessage();
    const userStore = useUserStore();
    const http = Http.getInstance();

    const emcMetaData = ref({ symbol: '', logo: '', decimals: 0 });
    const icpMetaData = ref({ symbol: '', logo: '', decimals: 0 });
    const emcBalance = ref('--');
    const icpBalance = ref('--');

    onMounted(async () => {
      const [emcBalance, icpBalance] = await Promise.all([initEMCBalance(), initICPBalance()]);
      context.emit('update:balance', { emcBalance, icpBalance });
    });

    async function initEMCBalance() {
      const [{ data: metaDataStr }, { data: balance }] = await Promise.all([
        http.get({
          url: 'https://api.edgematrix.pro/api/v1/dip20simple',
          data: { method: 'getMetadata' },
        }),
        http.get({
          url: 'https://api.edgematrix.pro/api/v1/dip20balance',
          data: { principal: userStore.icpPrincipal },
        }),
      ]);
      const metaData = JSON.parse(metaDataStr);
      emcMetaData.value = metaData;
      const balanceStr = ethers.formatUnits(balance, Number(metaData.decimals));
      emcBalance.value = balanceStr.replace(/(\.\d{4})\d+/, '$1');
      return emcBalance.value;
    }

    async function initICPBalance() {
      const [{ data: metaData }, { data: balance }] = await Promise.all([
        http.get({
          url: 'https://api.edgematrix.pro/api/v1/icrc1metadata',
        }),
        http.get({
          url: 'https://api.edgematrix.pro/api/v1/icrc1balance',
          data: { principal: userStore.icpPrincipal },
        }),
      ]);
      icpMetaData.value = metaData;
      console.log(metaData.decimals);

      const balanceStr = ethers.formatUnits(balance, Number(metaData.decimals));
      icpBalance.value = balanceStr.replace(/(\.\d{4})\d+/, '$1');
      return icpBalance.value;
    }

    const onPressMask = () => {
      context.emit('update:visible');
    };

    const onPressLogout = () => {
      context.emit('disconnect');
    };

    const onPressCopy = (item: string) => {
      copy(item);
      message.success('Copied');
    };

    return {
      Utils,
      account: computed(() => userStore.icpAccount),
      principal: computed(() => userStore.icpPrincipal),
      emcMetaData,
      icpMetaData,
      emcBalance,
      icpBalance,
      onPressMask,
      onPressLogout,
      onPressCopy,
    };
  },
});
</script>

<style scoped>
.wallet-bgcolor {
  position: absolute;
  top: 72px;
  right: 32px;
  width: 380px;
  height: 406px;
  border-radius: 0px 0px 8px 8px;
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
  border-radius: 0px 0px 8px 8px;
  border: 1px solid #716381;

  background-color: rgba(24, 25, 39, 0.1);
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
  cursor: pointer;
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
  cursor: pointer;
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
  margin-top: 16px;
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
  margin-right: 8px;
  color: #e4e4e4;
  font-size: 12px;
  font-weight: 300;
  line-height: 8px;
}
.coin-info-balance-box {
  width: 144px;
  padding: 6px 0;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-image: linear-gradient(to right, #ffffff00, #ffffff10, #ffffff00) 1;
  background: linear-gradient(90deg, #191a37 -0.49%, #23234f 53.94%, #191a37 100%);
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
.wallet-footer-button {
  position: relative;
  width: 140px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #861bb87c;
  padding: 4px;
}
.wallet-footer-button-bgcolor {
  width: 100%;
  height: 100%;
  /* padding: 0 12px; */
  border-radius: 4px;
  background: linear-gradient(90deg, #340695 0%, #851bb8 100%);
  box-sizing: border-box;
}
.wallet-footer-button-bgcolor-content {
  position: absolute;
  width: 130px;
  height: 30px;
  z-index: 11;
}
.wallet-footer-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(119deg, #5c19f1 0%, #920fd8 100%);
}
.wallet-footer-span {
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
}

.wallet-info-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 1280px) {
  .n-modal {
    left: 0;
    right: 0;
  }
}
</style>
