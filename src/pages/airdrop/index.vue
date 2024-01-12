<template>
  <div class="page">
    <img class="banner-background" src="@/assets/airdrop/back-airdrop.png" />
    <div class="header">
      <div class="header-container">
        <RouterLink :to="{ name: 'home' }"> <img src="~@/assets/airdrop/logo.png" class="header-logo" /></RouterLink>
        <template v-if="ethPrincipal">
          <div class="header-nav-button" @click="onPressUnConnect">{{ ethPrincipalStr }}</div>
        </template>
        <template v-else>
          <div class="header-nav-button" @click="onPressConnect">Connect Wallet</div>
        </template>
      </div>
    </div>
    <div class="banner">
      <div class="banner-title">
        EMC is a decentralized GPU computing network supported by <br />
        EVM and multi-chain, serving as the gateway for <br />
        Computing Power and Web3 in the Al era.
      </div>
    </div>
    <div class="main"></div>
    <Gift @press="onPressBox" />
    <GiftSuccess :isvisible="isvisibleSuccess" :amount="giftSuccessAmount" @onClaim="onPressClaim" @onClose="onCloseSuccess" />
    <GiftFail :isvisible="isvisibleFail" @onClose="onCloseFail" />
    <GiftBackground />
    <!-- <PageFooter /> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, h, watch } from 'vue';
import { useMessage } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { ethers } from 'ethers';
import { useETHUserStore } from '@/stores/eth-user';
import { ApiManager } from '@/web3/api';
import { MerkleClaimApi } from '@/web3/api/merkle-claim';
import { Http } from '@/tools/http';
import { Utils } from '@/tools/utils';
import Gift from './gift.vue';
import GiftSuccess from './gift-success.vue';
import GiftFail from './gift-fail.vue';
import GiftBackground from './gift-background.vue';

type Airdrop = {
  alias: string;
  _id: string;
  account: string;
  amount: string;
  amount_1: number;
  batchNo: string;
  contract: string;
  createdAt: string;
  updatedAt: string;
};

const ADDRESS = '0x9eFbF50306fc75BF11683A1933b7E0b7f54E252E';
const message = useMessage();
const http = Http.getInstance();
const apiManager = ApiManager.getInstance();
const merkleClaimApi = apiManager.create(MerkleClaimApi, { address: ADDRESS });
const ethUserStore = useETHUserStore();

const isvisibleSuccess = ref(false);
const giftSuccessAmount = ref('');
const isvisibleFail = ref(false);
const list = ref<Airdrop[]>([]);
// const pageNo = ref(1);

const init = async (ethPrincipal: string) => {
  const resp = await http.get({
    url: '/merkle/list',
    data: { contract: ADDRESS, account: ethPrincipal },
  });
  list.value = resp.data || [];
};

const onPressBox = () => {
  if (!ethPrincipal.value) {
    onPressConnect();
    return;
  }
  if (list.value.length !== 0) {
    isvisibleSuccess.value = true;
    const item = list.value[list.value.length - 1];
    const amount = ethers.formatUnits(item.amount, 18);
    giftSuccessAmount.value = String(Math.trunc(Number(amount) * 10000) / 10000);
  } else {
    isvisibleFail.value = true;
  }
};

const onPressClaim = async () => {
  const item = list.value[list.value.length - 1];

  const resp1 = await http.postJSON({
    url: '/merkle/preclaim',
    data: { contract: ADDRESS, id: item._id },
  });

  const { proofIndex, proof } = resp1.data;

  const resp = await merkleClaimApi.claim({
    index: proofIndex,
    account: item.account,
    amount: BigInt(item.amount),
    merkleProof: proof,
  });

  if (resp._result !== 0) {
    const desc = resp._desc || '';
    if (desc.indexOf('Drop already claimed') !== -1) {
      message.info('Drop already claimed');
    } else if (desc.indexOf('transfer amount exceeds balance') !== -1) {
      message.info('Transfer amount exceeds balance');
    } else {
      message.info('Claim close');
    }
  } else {
    message.info('Claimed successfully');
  }

  onCloseSuccess();
};

const onCloseFail = () => {
  isvisibleFail.value = false;
};

const onCloseSuccess = () => {
  isvisibleSuccess.value = false;
  giftSuccessAmount.value = '';
};

const onPressConnect = async () => {
  ethUserStore.signIn();
};

const onPressUnConnect = () => {
  ethUserStore.signOut();
  list.value = [];
  message.info('Disconnect successfully');
};

const ethPrincipal = computed(() => ethUserStore.account0);
const ethPrincipalStr = computed(() => Utils.formatAddress(ethUserStore.account0, 6));

watch(
  () => ethUserStore.account0,
  (ethPrincipal) => {
    if (ethPrincipal) {
      init(ethPrincipal);
      onCloseFail();
      onCloseSuccess();
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
.header {
  width: 100vw;
  height: 7.5rem;
  position: fixed;
  top: 0rem;
  right: 0rem;
  left: 0rem;
  background: rgba(217, 217, 217, 0.02) !important;
  backdrop-filter: blur(0.4rem);
  color: #fff;
  z-index: 99;
  overflow: hidden;
}

.header-container {
  width: 80rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  width: 14rem;
}
.page {
  height: 100%;
  position: relative;
  background-color: #000121;
  min-height: 100vh;
  overflow-x: hidden;
}
.banner-background {
  width: 100%;
  height: 98rem;
  position: absolute;
  object-fit: cover;
}

.banner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  padding: 7.5rem 2rem;
  height: 33.25rem;
  box-sizing: content-box;
}
.banner::after {
  position: absolute;
  top: 7.5rem;
  left: 0;
  content: '';
  width: 100%;
  height: 33.25rem;
  background-image: linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 100px),
    linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 100px);
  background-size: 50px 50px;
  opacity: 0.1;
  z-index: 1;
}

.banner-title {
  position: relative;
  text-align: center;
  font-size: 3rem;
  font-weight: 500;
  line-height: 4.25rem;
  background: linear-gradient(90deg, #fff 0.23%, #c9f8ff 104.57%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 22;
}

.main {
  position: relative;
  height: 60rem;
  overflow: hidden;
}
.header-nav-button {
  padding: 1rem 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: linear-gradient(90deg, #0bfefe 0%, #1a75fe 99.99%, #4a0684 100%);
  box-shadow: 0px 0px 16px 0px rgba(255, 255, 255, 0.88) inset, 0px 2px 8px 0px rgba(0, 234, 255, 0.3);
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  min-width: 100px;
  min-height: 32px;
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .header-logo {
    min-width: 150px;
  }

  .header-container {
    padding: 0 2rem;
    width: 100%;
  }
}
</style>
