<template>
  <NSpin :show="error === -1">
    <template v-if="error !== 0">
      <NSpace align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
        <NText>{{ errorText }}</NText>
      </NSpace>
    </template>
    <template v-else>
      <NSpace vertical :wrap-item="false" :size="[0, 32]">
        <NCard title="Claim Revenue">
          <NSpace vertical :wrap-item="false" :size="[0, 32]" style="min-height: 240px">
            <NSpace vertical :wrap-item="false" :size="[0, 16]">
              <NSpace vertical :wrap-item="false" :size="[0, 4]">
                <NSpace :wrap-item="false" justify="space-between">
                  <NText depth="3" strong style="font-size: 16px">Amount</NText>
                </NSpace>
                <NInput
                  v-model:value="inputAmount"
                  placeholder="Token amount"
                  size="large"
                  style="border-radius: 8px; background: #f5f5f5; height: 56px; line-height: 56px"
                >
                  <template #suffix>
                    <template v-if="infoLoading">
                      <NSkeleton :width="120" round size="medium" />
                    </template>
                    <template v-else>
                      <NSpace :size="[16, 0]" :wrap-item="false" align="center">
                        <NText style="color: #02a9c8; cursor: pointer" @click="onPressInputMax"> Max </NText>
                        <!-- <div style="height: 32px; width: 1px; background-color: #d1d1d1"></div>
                        <NSpace align="center" :wrap-item="false" :size="[8, 0]">
                          <img src="@/assets/token/usdt.svg" style="width: 24px; height: 24px" />
                          <NText strong>{{ ethers.formatUnits(fundRevenue, fundDecimal) }} {{ fundSymbol }}</NText>
                        </NSpace> -->
                      </NSpace>
                    </template>
                  </template>
                </NInput>
              </NSpace>
              <NSpace align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                <NSpace align="center" :wrap-item="false" :size="[8, 0]">
                  <NText depth="3" strong>Beneficiary address </NText>
                  <NText strong>{{ beneficiary }}</NText>
                </NSpace>
              </NSpace>
              <NSpace align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                <NSpace align="center" :wrap-item="false" :size="[8, 0]">
                  <NText depth="3" strong>Total Revenue </NText>
                  <NText strong>{{ ethers.formatUnits(fundRevenue, fundDecimal) }}{{ fundSymbol }}</NText>
                </NSpace>
              </NSpace>
            </NSpace>
            <NSpace vertical :wrap-item="false" :size="[0, 0]">
              <template v-if="!validationError">
                <NButton strong size="large" :loading="claimLoading" :disabled="infoLoading" @click="onPressClaim"> Claim </NButton>
              </template>
              <template v-else>
                <NButton strong size="large" disabled> {{ validationError }} </NButton>
              </template>
            </NSpace>
          </NSpace>
        </NCard>
      </NSpace>
    </template>
  </NSpin>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { NSpace, NCard, NText, NInput, NButton, NSpin, NSkeleton, useMessage } from 'naive-ui';
import { ethers } from 'ethers';
import { useETHUserStore } from '@/stores/eth-user';
import { ApiManager } from '@/web3/api';
import { PublicSaleApi } from '@/web3/api/public-sale';
import { ERC20Api } from '@/web3/api/erc20';

const props = defineProps({
  saleContract: { type: String, default: '' },
  tokenContract: { type: String, default: '' },
  fundContract: { type: String, default: '' },
  cliffsContract: { type: String, default: '' },
});

const emits = defineEmits(['success', 'loading']);

const message = useMessage();
const ethUserStore = useETHUserStore();
const apiManager = ApiManager.getInstance();

let publicSaleApi: PublicSaleApi | null = null;
let fundApi: ERC20Api | null = null;
let tokenApi: ERC20Api | null = null;

const error = ref(-1);
const errorText = ref('');
const validationError = ref('');

const inputAmount = ref('');

const fundName = ref('');
const fundSymbol = ref('');
const fundDecimal = ref(0);
const fundRevenue = ref(0n);

const tokenDecimal = ref(0);
const tokenName = ref('');
const tokenSymbol = ref('');

const beneficiary = ref('');

const infoLoading = ref(false);
const claimLoading = ref(false);

const init = async () => {
  error.value = -1;
  errorText.value = '';
  inputAmount.value = '';

  publicSaleApi = apiManager.create<PublicSaleApi>(PublicSaleApi, { address: props.saleContract });
  fundApi = apiManager.create<ERC20Api>(ERC20Api, { address: props.fundContract });
  tokenApi = apiManager.create<ERC20Api>(ERC20Api, { address: props.tokenContract });

  const [
    { data: _fundName },
    { data: _fundSymbol },
    { data: _fundDecimals },
    { data: _tokenName },
    { data: _tokenSymbol },
    { data: _tokenDecimals },
    { data: _beneficiary },
  ] = await Promise.all([
    fundApi.name(),
    fundApi.symbol(),
    fundApi.decimals(),
    tokenApi.name(),
    tokenApi.symbol(),
    tokenApi.decimals(),
    publicSaleApi.beneficiary(),
  ]);
  fundName.value = _fundName;
  fundSymbol.value = _fundSymbol;
  fundDecimal.value = Number(_fundDecimals);

  tokenName.value = _tokenName;
  tokenSymbol.value = _tokenSymbol;
  tokenDecimal.value = Number(_tokenDecimals);
  beneficiary.value = _beneficiary || '';

  infoLoading.value = true;
  const resp = await initUserInfo();
  infoLoading.value = false;
  if (resp._result !== 0) {
    validationError.value = resp._desc || '';
  } else {
    validationError.value = '';
  }
  error.value = 0;
};
//init user balance
const initUserInfo = async () => {
  fundRevenue.value = 0n;

  if (!ethUserStore.account0) {
    return { _result: 1, _desc: 'Not connected' };
  }

  if (ethUserStore.isInvalidNetwork) {
    return { _result: 1, _desc: 'Please switch to arbitrum' };
  }

  if (beneficiary.value.toLocaleLowerCase() !== ethUserStore.account0.toLocaleLowerCase()) {
    return { _result: 1, _desc: 'Invalid beneficiary' };
  }

  const resp1 = await publicSaleApi!.salesRevenue();
  if (resp1._result !== 0) {
    return { _result: 1, _desc: 'Query white list error' };
  }
  fundRevenue.value = resp1.data || 0n;

  return { _result: 0 };
};

onMounted(() => {
  init();
});

watch(
  () => [ethUserStore.account0, ethUserStore.isInvalidNetwork],
  ([account]) => {
    nextTick(async () => {
      infoLoading.value = true;
      const resp = await initUserInfo();
      infoLoading.value = false;
      if (resp._result !== 0) {
        validationError.value = resp._desc || '';
      } else {
        validationError.value = '';
      }
    });
  }
);

function onPressInputMax() {
  inputAmount.value = ethers.formatUnits(fundRevenue.value, fundDecimal.value);
}

async function onPressClaim() {
  if (!Number(inputAmount.value)) {
    message.warning('Invalid amount');
    return;
  }
  claimLoading.value = true;
  emits('loading', claimLoading.value);
  const amount = ethers.parseUnits(inputAmount.value, fundDecimal.value);
  const resp = await publicSaleApi!.claimFund({ amount });
  claimLoading.value = false;
  emits('loading', claimLoading.value);
  if (resp._result !== 0) {
    init();
    return message.error(resp._desc || 'Claim fund failed');
  }
  await resp.data.wait();
  emits('success');
  init();
}
</script>
