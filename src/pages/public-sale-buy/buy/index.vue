<template>
  <NSpin :show="error === -1">
    <!-- :bordered="false" -->
    <NSpace vertical :wrap-item="false" :size="[0, 16]">
      <NSpace vertical :wrap-item="false" :size="[0, 4]">
        <NSpace :wrap-item="false" justify="space-between">
          <NText depth="3" strong style="font-size: 16px">Reciver Address</NText>
        </NSpace>
        <NInput v-model:value="inputReciver" placeholder="Address" size="large"
          style="border-radius: 8px; background: #f5f5f5; height: 56px; line-height: 56px">
        </NInput>
      </NSpace>
      <NSpace vertical :wrap-item="false" :size="[0, 4]">
        <NSpace :wrap-item="false" justify="space-between">
          <NText depth="3" strong style="font-size: 16px">You want buy</NText>
        </NSpace>
        <NInput v-model:value="inputTokenAmount" placeholder="Token amount" size="large"
          style="border-radius: 8px; background: #f5f5f5; height: 56px; line-height: 56px">
          <template #suffix>
            <NSpace :size="[16, 0]" :wrap-item="false" align="center">
              <NText style="color: #02a9c8; cursor: pointer" @click="onPressFundBuyableMax"> Max </NText>
              <div style="height: 32px; width: 1px; background-color: #d1d1d1"></div>
              <NText>{{ tokenSymbol }}</NText>
            </NSpace>
          </template>
        </NInput>
      </NSpace>
      <NSpace align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
        <div>
          <NText depth="3" strong>{{ tokenSymbol }}/{{ fundSymbol }} Rate </NText>
          <NText strong>1{{ tokenSymbol }} = {{ unitPrice }}{{ fundSymbol }}</NText>
        </div>
        <NSpace align="center" :wrap-item="false" :size="[8, 0]">
          <img src="@/assets/token/usdt.svg" style="width: 20px; height: 20px" />
          <NText depth="3" strong style="font-size: 12px">Balance:</NText>
          <NText strong>{{ fundBalanceStr }} {{ fundSymbol }}</NText>
        </NSpace>
      </NSpace>
      <div>
        <NText depth="3" strong>You will pay: </NText>
        <NText strong>{{ total }}{{ fundSymbol }}</NText>
      </div>
    </NSpace>
    <NSpace vertical :wrap-item="false" :size="[0, 0]" style="margin-top: 30px">
      <template v-if="account0">
        <NButton strong size="large" :loading="buyLoading" @click="onPressConfirm"> Buy </NButton>
      </template>
      <template v-else>
        <NButton strong size="large" disabled> Not connected </NButton>
      </template>
    </NSpace>
  </NSpin>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed, nextTick } from 'vue';
import { NSpace, NText, NInput, NButton, NSpin, NIcon, useMessage } from 'naive-ui';
import { ethers } from 'ethers';
import { useETHUserStore } from '@/stores/eth-user';
import { Web3Service } from '@/web3';
import { ApiManager } from '@/web3/api';
import { PublicSaleApi } from '@/web3/api/public-sale';
import { ERC20Api } from '@/web3/api/erc20';
import { Http } from '@/tools/http';
class Calculator {
  unitPrice: number = 0;
  init({ unitPrice }: { unitPrice: number }) {
    this.unitPrice = unitPrice;
  }
  calc(count: string) {
    if (!count) {
      return 0n;
    }
    return (ethers.parseUnits(count, 18) * BigInt(this.unitPrice)) / BigInt(1e18);
  }
}

export default defineComponent({
  name: 'public-sale-buy',
  props: {
    sellContract: { type: String, default: '' },
    tokenContract: { type: String, default: '' },
    fundContract: { type: String, default: '' },
  },
  emits: ['success', 'loading'],
  components: {
    NSpace,
    NText,
    NInput,
    NButton,
    NSpin,
    NIcon,
  },
  setup(props, ctx) {
    const message = useMessage();
    const ethUserStore = useETHUserStore();
    const http = Http.getInstance();
    const apiManager = ApiManager.getInstance();
    const w3s = Web3Service.getInstance();

    let publicSaleApi: PublicSaleApi | null = null;
    let fundApi: ERC20Api | null = null;
    let tokenApi: ERC20Api | null = null;
    const calculator = new Calculator();

    const error = ref(-1);
    const errorText = ref('');

    const inputReciver = ref('');
    const inputTokenAmount = ref('');

    const fundTokenPriceWei = ref(0);

    const fundDecimal = ref(0);
    const tokenDecimal = ref(0);
    const fundName = ref('');
    const fundSymbol = ref('');
    const tokenName = ref('');
    const tokenSymbol = ref('');
    const fundBalance = ref<bigint>(0n);
    const tokenBalance = ref<bigint>(0n);
    const tokenBuyableMax = ref<bigint>(0n);
    const buyLoading = ref(false);

    const init = async () => {
      error.value = -1;
      errorText.value = '';
      inputTokenAmount.value = '';

      publicSaleApi = apiManager.create<PublicSaleApi>(PublicSaleApi, { address: props.sellContract });
      fundApi = apiManager.create<ERC20Api>(ERC20Api, { address: props.fundContract });
      tokenApi = apiManager.create<ERC20Api>(ERC20Api, { address: props.tokenContract });

      const [
        { data: _fundName },
        { data: _fundSymbol },
        { data: _fundDecimals },
        { data: _tokenName },
        { data: _tokenSymbol },
        { data: _tokenDecimals },
        { data: _fundTokenPriceWei },
      ] = await Promise.all([
        fundApi.name(),
        fundApi.symbol(),
        fundApi.decimals(),
        tokenApi.name(),
        tokenApi.symbol(),
        tokenApi.decimals(),
        publicSaleApi.tokenPrice(),
      ]);
      fundName.value = _fundName;
      fundSymbol.value = _fundSymbol;
      fundDecimal.value = Number(_fundDecimals);

      tokenName.value = _tokenName;
      tokenSymbol.value = _tokenSymbol;
      tokenDecimal.value = Number(_tokenDecimals);

      fundTokenPriceWei.value = Number(_fundTokenPriceWei);

      calculator.init({ unitPrice: fundTokenPriceWei.value });
      await initUserInfo();

      error.value = 0;
    };
    //init user balance
    const initUserInfo = async () => {
      if (!ethUserStore.account0) {
        fundBalance.value = 0n;
        tokenBalance.value = 0n;
        tokenBuyableMax.value = 0n;
        return;
      }
      const resp1 = await fundApi!.balanceOf({ account: ethUserStore.account0 });
      const resp2 = await tokenApi!.balanceOf({ account: ethUserStore.account0 });
      const resp3 = await publicSaleApi!.tokensOnSale();

      fundBalance.value = (resp1.data as bigint) || 0n;
      tokenBalance.value = (resp2.data as bigint) || 0n;
      tokenBuyableMax.value = (resp3.data as bigint) || 0n;

      if (!inputReciver.value) {
        inputReciver.value = ethUserStore.account0;
      }
    };

    const inWhiteList = async (publicKey: string) => {
      const resp = await http.postJSON({
        url: 'https://api.edgematrix.pro/api/v1/publicsell/validate',
        data: { publicKey },
        noAutoHint: true
      });
      return resp._result === 0;
    }

    const preBuy = async (publicKey: string) => {
      const signatureRaw = 'Public sale whitelist verify';
      const resp1 = await w3s.signMessage(signatureRaw);
      if (resp1._result !== 0) {
        return resp1;
      }
      const signature = resp1.data!.signature;
      const resp = await http.postJSON({
        url: 'https://api.edgematrix.pro/api/v1/publicsell/prebuy',
        data: { publicKey, signatureRaw, signature },
        noAutoHint: true
      });
      return resp;
    }

    const buy = async (params: { account: string, amount: string, isWhiteMode: boolean }) => {
      const account = params.account;
      const amountStr = params.amount;
      const resp = await fundApi!.allowance({ account: account, spender: publicSaleApi!.contract })
      if (resp._result !== 0) {
        return { _result: 1, _desc: 'Allowance failed' };
      }
      const allowanceAmount = resp.data;
      const approveAmount = calculator.calc(amountStr);
      const diffApproveAmount = approveAmount - allowanceAmount;
      if (approveAmount - allowanceAmount > 0) {
        const resp1 = await fundApi!.approve({ amount: diffApproveAmount, spender: publicSaleApi!.contract });
        if (resp1._result !== 0) {
          return { _result: 1, _desc: 'Approve failed' };
        }
      }
      const amount = ethers.parseUnits(amountStr, tokenDecimal.value);
      if (params.isWhiteMode) {
        const resp = await preBuy(account);
        if (resp._result !== 0) {
          return resp;
        }
        const signature = resp.data.signature;
        return publicSaleApi!.buyTokensWithSignature({ account, amount, signature });
      } else {
        return publicSaleApi!.buyTokens({ account, amount });
      }
    };

    const validateBuy = async ({ account, amount, isWhiteMode }: { account: string, amount: string, isWhiteMode: boolean }) => {
      if (!ethers.isAddress(account)) {
        return { _result: -1, _desc: 'Invalid reciver' };
      }
      if (!Number(amount)) {
        return { _result: -1, _desc: 'Invalid amount' };
      }
      if (isWhiteMode) {
        const isWhiteList = await inWhiteList(account);
        if (isWhiteList) {
          return { _result: 0, _desc: '' };
        } else {
          return { _result: -1, _desc: 'Whitelist validation failed' };
        }
      } else {
        return { _result: 0, _desc: '' };
      }
    }

    const handleBuy = async ({ account, amount }: { account: string, amount: string }) => {
      const resp1 = await publicSaleApi!.onWhitelistMode();
      if (resp1._result !== 0) {
        return { _result: 1, _desc: 'Query mode error' };
      }
      const isWhiteMode = resp1.data;
      const resp2 = await validateBuy({ account, amount, isWhiteMode });
      if (resp2._result !== 0) {
        return resp2;
      }
      return buy({ account, amount, isWhiteMode });
    }

    onMounted(() => {
      init();
    });

    watch(
      () => ethUserStore.account0,
      (val) => {
        if (error.value !== 0) return;
        nextTick(() => initUserInfo());
      }
    );

    return {
      error,
      errorText,
      account0: computed(() => ethUserStore.account0),
      inputReciver,
      inputTokenAmount,
      fundName,
      fundSymbol,
      tokenName,
      tokenSymbol,
      fundBalanceStr: computed(() => ethers.formatUnits(fundBalance.value, fundDecimal.value)),
      tokenBalanceStr: computed(() => ethers.formatUnits(tokenBalance.value, tokenDecimal.value)),
      tokenBuyableMaxStr: computed(() => ethers.formatUnits(tokenBuyableMax.value, tokenDecimal.value)),
      total: computed(() => ethers.formatUnits(calculator.calc(inputTokenAmount.value), fundDecimal.value)),
      unitPrice: computed(() => ethers.formatUnits(fundTokenPriceWei.value, fundDecimal.value)),
      buyLoading,
      onPressFundBuyableMax() {
        inputTokenAmount.value = ethers.formatUnits(tokenBuyableMax.value, tokenDecimal.value);
      },
      async onPressConfirm() {
        const account = inputReciver.value;
        const amount = inputTokenAmount.value;
        buyLoading.value = true;
        ctx.emit('loading', buyLoading.value);
        const resp = await handleBuy({ account, amount });
        buyLoading.value = false;
        ctx.emit('loading', buyLoading.value);
        if (resp._result !== 0) {
          return message.error(resp._desc);
        }
        ctx.emit('success');
        init();
      },
    };
  },
});
</script>

