<template>
  <div class="page">
    <Bg />
    <Header />
    <NSpace class="body" vertical align="center" :wrap-item="false" :size="[0, 24]">
      <div class="banner" :style="bannerStyle">
        <div class="banner-text">
          EMC is a decentralized GPU computing network supported by <br />
          EVM and multi-chain, serving as the gateway for <br />
          Computing Power and Web3 in the Al era.
        </div>
      </div>

      <div class="widget">
        <img class="widget-header" src="@/assets/airdrop/box-header.svg" />
        <div class="widget-body">
          <img class="widget-body-img" src="@/assets/airdrop/box.svg" @click="onPressBox" />
        </div>
      </div>
    </NSpace>
    <GiftLoading :is-visible="isVisibleLoading" />
    <GiftSuccess :is-visible="isVisibleSuccess" :item="claimItem" @claim="onPressClaim" @close="onClaimClose" />
    <GiftFail :is-visible="isVisibleFail" @close="onCloseFail" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMessage, NSpace } from 'naive-ui';
import { useETHUserStore } from '@/stores/eth-user';
import { ApiManager } from '@/web3/api';
import { MerkleClaimApi } from '@/web3/api/merkle-claim';
import { Http } from '@/tools/http';
import Header from '@/layout/app/header/index.vue';
import { useIsMobile } from '@/composables/use-screen';
import Bg from './bg.vue';
import GiftLoading from './gift-loading.vue';
import GiftSuccess from './gift-success.vue';
import GiftFail from './gift-fail.vue';

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

const isMobile = useIsMobile();
const bannerStyle = computed(() => {
  let fontSize = '40px';
  let marginTop = '24px';
  if (isMobile.value) {
    fontSize = '24px';
    marginTop = '0';
  }
  return { fontSize, marginTop };
});

const ADDRESS = '0x9eFbF50306fc75BF11683A1933b7E0b7f54E252E';
const message = useMessage();
const http = Http.getInstance();
const apiManager = ApiManager.getInstance();
const merkleClaimApi = apiManager.create(MerkleClaimApi, { address: ADDRESS });
const ethUserStore = useETHUserStore();

const isVisibleLoading = ref(false);
const isVisibleSuccess = ref(false);
const isVisibleFail = ref(false);

const claimItem = ref<Airdrop>();

const onPressBox = async () => {
  if (!ethUserStore.account0) {
    ethUserStore.signIn();
    return;
  }
  isVisibleLoading.value = true;
  const resp = await http.get({
    url: '/merkle/list',
    data: { contract: ADDRESS, account: ethUserStore.account0 },
  });
  isVisibleLoading.value = false;
  const list = resp.data || [];
  const item = list[list.length - 1];
  if (item) {
    claimItem.value = item;
    isVisibleSuccess.value = true;
  } else {
    isVisibleFail.value = true;
  }
};

const onPressClaim = async (item: Airdrop) => {
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

  onClaimClose();
};

const onCloseFail = () => {
  isVisibleFail.value = false;
};

const onClaimClose = () => {
  isVisibleSuccess.value = false;
  claimItem.value = undefined;
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background-color: #000121;
}

.background {
  position: fixed;
  width: 100%;
  height: 100vh;
  min-height: 800px;
  left: 0;
  top: 0;
  object-fit: cover;
}

.body {
  padding: 24px 0;
}

.banner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  box-sizing: content-box;
  padding: 32px;
  border-radius: 32px;
  font-size: 40px;
  font-weight: 500;
  line-height: 1.8;
  text-align: center;
  font-family: monospace;
  position: relative;
  z-index: 1;
}

.banner-text {
  background: linear-gradient(90deg, #fff 0.23%, #c9f8ff 104.57%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.widget {
  width: 300px;
  height: 604px;
  position: relative;
}

.widget-header {
  position: absolute;
  z-index: 2;
  top: 0;
}

.widget-body {
  position: absolute;
  z-index: 2;
  bottom: 0;
  width: 100%;
  padding-top: calc(100% / 1.118);
  cursor: pointer;
}

.widget-body-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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
