<template>
  <NSpin :show="error === -1">
    <!-- :bordered="false" -->
    <NSpace vertical :wrap-item="false" :size="[0, 16]">
      <NSpace vertical :wrap-item="false" :size="[0, 4]">
        <NSpace :wrap-item="false" justify="space-between">
          <NText depth="3" strong style="font-size: 16px">Reciver Address</NText>
        </NSpace>
        <NInput
          v-model:value="inputReciver"
          placeholder="Address"
          size="large"
          style="border-radius: 8px; background: #f5f5f5; height: 56px; line-height: 56px"
        >
        </NInput>
      </NSpace>
      <NSpace vertical :wrap-item="false" :size="[0, 4]">
        <NSpace :wrap-item="false" justify="space-between">
          <NText depth="3" strong style="font-size: 16px">You want buy</NText>
        </NSpace>
        <NInput
          v-model:value="inputTokenAmount"
          placeholder="Token amount"
          size="large"
          style="border-radius: 8px; background: #f5f5f5; height: 56px; line-height: 56px"
        >
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
          <NText strong>1{{ tokenSymbol }} -> {{ unitPrice }}{{ fundSymbol }}</NText>
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
        <NButton class="primary-button" strong size="large" :loading="buyLoading" @click="onPressConfirm"> Buy </NButton>
      </template>
      <template v-else>
        <NButton class="primary-button" strong size="large" disabled> Not connected </NButton>
      </template>
    </NSpace>
  </NSpin>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed, nextTick } from 'vue';
import { NSpace, NText, NInput, NButton, NSpin, NIcon, useMessage } from 'naive-ui';
import { useETHUserStore } from '@/stores/eth-user';
import { ApiManager } from '@/web3/api';
import { PublicSellApi } from '@/web3/api/public-sell';
import { ERC20Api } from '@/web3/api/erc20';
import { ethers } from 'ethers';

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
  name: 'public-sell-buy',
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
    const apiManager = ApiManager.getInstance();

    let publicSellApi: PublicSellApi | null = null;
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

      publicSellApi = apiManager.create<PublicSellApi>(PublicSellApi, { address: props.sellContract });
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
        publicSellApi.tokenPrice(),
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
      const resp3 = await publicSellApi!.tokensOnSale();

      fundBalance.value = (resp1.data as bigint) || 0n;
      tokenBalance.value = (resp2.data as bigint) || 0n;
      tokenBuyableMax.value = (resp3.data as bigint) || 0n;

      if (!inputReciver.value) {
        inputReciver.value = ethUserStore.account0;
      }
    };

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
        if (!ethers.isAddress(inputReciver.value)) {
          message.error('Invalid reciver');
          return;
        }
        if (inputTokenAmount.value === '' || inputTokenAmount.value === '0.0') {
          message.error('Invalid amount');
          return;
        }
        const { data: isWhiteMode } = await publicSellApi!.onWhitelistMode();
        if (isWhiteMode) {
          //查询receiver是否在白名单里
          //
        } else {
        }

        // if (白名单模式) {
        //   if (处于白名单列表) {
        //     白名单购买;
        //   } else {
        //     提示无权购买;
        //   }
        // } else {
        //   普通购买;
        // }

        const approveAmount = calculator.calc(inputTokenAmount.value);
        buyLoading.value = true;
        ctx.emit('loading', buyLoading.value);
        const resp = await fundApi!.approve({ amount: approveAmount, spender: publicSellApi!.contract });
        if (resp._result !== 0) {
          console.info(resp);
          message.error('Transaction Failed');
          buyLoading.value = false;
          ctx.emit('loading', buyLoading.value);
        }
        const amount = ethers.parseUnits(inputTokenAmount.value, tokenDecimal.value);
        const resp2 = await publicSellApi!.buyTokens({ amount: amount });
        buyLoading.value = false;
        ctx.emit('loading', buyLoading.value);
        if (resp2._result !== 0) {
          console.info(resp2);
          message.error('Buy failure');
          return;
        }
        ctx.emit('success');

        init();
      },
    };
  },
});
</script>
<style scoped></style>
