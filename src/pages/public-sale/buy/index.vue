<template>
  <NSpin :show="error === -1">
    <template v-if="error !== 0">
      <NSpace align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
        <NText>{{ errorText }}</NText>
      </NSpace>
    </template>
    <template v-else>
      <NSpace vertical :wrap-item="false" :size="[0, 32]">
        <NCard title="EMC Strategic Sales: Unlock Your Limit in AI × Web3 Era">
          <NText>
            * EMC tokens will be locked for 1 month from the date of purchase, then released linearly between the 2nd and the 7th month.
          </NText>
        </NCard>
        <NCard title="Strategy Sale">
          <NSpace vertical :wrap-item="false" :size="[0, 32]" style="min-height:240px;">
            <NSpace vertical :wrap-item="false" :size="[0, 16]">
              <NSpace vertical :wrap-item="false" :size="[0, 4]">
                <NSpace :wrap-item="false" justify="space-between">
                  <NText depth="3" strong style="font-size: 16px">Receiver Address</NText>
                </NSpace>
                <NInput v-model:value="inputReceiver" placeholder="Address" size="large"
                  style="border-radius: 8px; background: #f5f5f5; height: 56px; line-height: 56px">
                </NInput>
              </NSpace>
              <NSpace vertical :wrap-item="false" :size="[0, 4]">
                <NSpace :wrap-item="false" justify="space-between">
                  <NText depth="3" strong style="font-size: 16px">EMC Purchase Amount</NText>
                </NSpace>
                <NInput v-model:value="inputTokenAmount" placeholder="Token amount" size="large"
                  style="border-radius: 8px; background: #f5f5f5; height: 56px; line-height: 56px">
                  <template #suffix>
                    <NSpace :size="[16, 0]" :wrap-item="false" align="center">
                      <NText style="color: #02a9c8; cursor: pointer" @click="onPressFundBuyableMax"> Max </NText>
                      <div style="height: 32px; width: 1px; background-color: #d1d1d1"></div>
                      <NSpace align="center" :wrap-item="false" :size="[8, 0]">
                        <div class="flex items-center justify-center w-[20px] h-[20px] bg-[#ffffff] rounded-[24px]">
                          <img src="@/assets/icon_coin_emc.png" style="width: 16px; height: 16px" />
                        </div>
                        <NText strong>{{ tokenBuyableMaxStr }} {{ tokenSymbol }}</NText>
                      </NSpace>
                    </NSpace>
                  </template>
                </NInput>
              </NSpace>
              <NSpace align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                <NSpace align="center" :wrap-item="false" :size="[8, 0]">
                  <NText depth="3" strong>{{ tokenSymbol }}/{{ fundSymbol }} Rate </NText>
                  <NText strong>1{{ tokenSymbol }} = {{ fundTokenPriceStr || '?' }}{{ fundSymbol }}</NText>
                </NSpace>
              </NSpace>
              <NSpace align="center" :wrap-item="false" :size="[8, 0]">
                <NText depth="3" strong>Your USDT Balance:</NText>
                <NSpace align="center" :wrap-item="false" :size="[4, 0]">
                  <img src="@/assets/token/usdt.svg" style="width: 20px; height: 20px" />
                  <NText strong>{{ fundBalanceStr }}{{ fundSymbol }}</NText>
                </NSpace>
              </NSpace>
              <NSpace align="center" justify="space-between" :wrap-item="false" :size="[8, 0]">
                <NSpace align="center" :wrap-item="false" :size="[8, 0]">
                  <NText depth="3" strong>You need to pay: </NText>
                  <NText strong>{{ total }}{{ fundSymbol }}</NText>
                </NSpace>
              </NSpace>
            </NSpace>
            <NSpace vertical :wrap-item="false" :size="[0, 0]">
              <template v-if="!validationError">
                <NButton strong size="large" :loading="buyLoading" @click="onPressConfirm"> Buy </NButton>
              </template>
              <template v-else>
                <NButton strong size="large" disabled> {{ validationError }} </NButton>
              </template>
            </NSpace>
          </NSpace>
        </NCard>
        <NCard title="Record">
          <Table :data="orders" @item="onPressOrderItem" />
        </NCard>
      </NSpace>
    </template>
  </NSpin>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue';
import { NSpace, NCard, NText, NInput, NButton, NSpin, NIcon, useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import { ethers } from 'ethers';
import { useETHUserStore } from '@/stores/eth-user';
import { Web3Service } from '@/web3';
import { ApiManager } from '@/web3/api';
import { PublicSaleApi } from '@/web3/api/public-sale';
import { ERC20Api } from '@/web3/api/erc20';
import { Http } from '@/tools/http';
import Table from './table.vue';
import type { Item } from './table.vue';
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

function wait(t: number) {
  return new Promise((resolve) => setTimeout(resolve, t));
}


export default defineComponent({
  name: 'public-sale-buy',
  props: {
    saleContract: { type: String, default: '' },
    tokenContract: { type: String, default: '' },
    fundContract: { type: String, default: '' },
    cliffsContract: { type: String, default: '' },
  },
  emits: ['success', 'loading'],
  components: {
    NSpace,
    NCard,
    NText,
    NInput,
    NButton,
    NSpin,
    NIcon,
    Table
  },
  setup(props, ctx) {
    const router = useRouter();
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
    const validationError = ref('');

    const inputReceiver = ref('');
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
    const orders = ref<Item[]>([]);
    const buyLoading = ref(false);
    let timer: any = null;

    const init = async () => {
      error.value = -1;
      errorText.value = '';
      inputTokenAmount.value = '';

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

      ] = await Promise.all([
        fundApi.name(),
        fundApi.symbol(),
        fundApi.decimals(),
        tokenApi.name(),
        tokenApi.symbol(),
        tokenApi.decimals(),
      ]);
      fundName.value = _fundName;
      fundSymbol.value = _fundSymbol;
      fundDecimal.value = Number(_fundDecimals);

      tokenName.value = _tokenName;
      tokenSymbol.value = _tokenSymbol;
      tokenDecimal.value = Number(_tokenDecimals);

      const resp = await initUserInfo();
      if (resp._result !== 0) {
        validationError.value = resp._desc || '';
      } else {
        validationError.value = '';
      }
      error.value = 0;
    };
    //init user balance
    const initUserInfo = async () => {
      fundBalance.value = 0n;
      tokenBalance.value = 0n;
      tokenBuyableMax.value = 0n;
      fundTokenPriceWei.value = 0;
      calculator.init({ unitPrice: 0 });
      orders.value = [];
      inputReceiver.value = '';
      if (ethUserStore.isInvalidConnect) {
        return { _result: 1, _desc: 'Not connected' };
      }
      const resp1 = await publicSaleApi!.onWhitelistMode();
      if (resp1._result !== 0) {
        return { _result: 1, _desc: 'Query white list error' };
      }
      const isWhiteMode = resp1.data;
      const resp2 = await validateWhiteList({ account: ethUserStore.account0, isWhiteMode })
      if (resp2._result !== 0) {
        return { _result: 1, _desc: resp2._desc };
      }

      const [
        { data: _fundBalance },
        { data: _tokenBalance },
        { data: _fundTokenPriceWei },
        { buyableMax: _tokenBuyableMax,
          orders: _orders }
      ] = await Promise.all([
        fundApi!.balanceOf({ account: ethUserStore.account0 }),
        tokenApi!.balanceOf({ account: ethUserStore.account0 }),
        publicSaleApi!.tokenPrice(),
        updateOrders(isWhiteMode),
      ])

      fundBalance.value = _fundBalance || 0n;
      tokenBalance.value = _tokenBalance || 0n;
      tokenBuyableMax.value = _tokenBuyableMax || 0n;
      fundTokenPriceWei.value = Number(_fundTokenPriceWei) || 0;
      calculator.init({ unitPrice: fundTokenPriceWei.value });
      orders.value = _orders;
      inputReceiver.value = ethUserStore.account0;

      const pendding = _orders.find((item: any) => item.status === 0);
      if (pendding) {
        startTimer(isWhiteMode);
      }

      return { _result: 0 };
    };

    const updateOrders = async (isWhiteMode: boolean) => {
      const [
        { data: _tokenBuyableMax },
        { data: _orders }
      ] = await Promise.all([
        queryBuyableMax(isWhiteMode),
        http.get({
          url: '/publicsale/logs',
          data: { publicKey: ethUserStore.account0 }
        })
      ])
      return {
        buyableMax: _tokenBuyableMax || 0n,
        orders: _orders
      }
    }

    const startTimer = async (isWhiteMode: boolean) => {
      if (timer) {
        stopTimer();
      }
      timer = setInterval(async () => {
        const { buyableMax: _tokenBuyableMax, orders: _orders } = await updateOrders(isWhiteMode);
        if (validationError.value) {
          tokenBuyableMax.value = 0n;
          orders.value = [];
          stopTimer();
        } else {
          tokenBuyableMax.value = _tokenBuyableMax || 0n;
          orders.value = _orders;
          const pendding = _orders.find((item: any) => item.status === 0);
          if (!pendding) {
            stopTimer();
          }
        }

      }, 5000)
    };

    const stopTimer = () => {
      clearInterval(timer);
      timer = null;
    }

    const queryBuyableMax = async (isWhiteMode: boolean) => {
      if (isWhiteMode) {
        const resp = await http.postJSON({
          url: '/publicsale/whitelimit',
          data: {
            publicKey: ethUserStore.account0,
            contract: props.saleContract,
            chainId: ethUserStore.chainId,
          },
          noAutoHint: true
        });
        if (resp._result !== 0) {
          return { data: 0n };
        }
        return { data: BigInt(resp.data) };
      } else {
        return await publicSaleApi!.tokensOnSale();
      }
    };
    const inWhiteList = async (publicKey: string) => {
      console.info(publicKey);
      const resp = await http.postJSON({
        url: '/publicsale/validate',
        data: { publicKey },
        noAutoHint: true
      });
      return resp._result === 0;
    }

    const preBuy = async (receiver: string, amount: bigint) => {
      const signatureRaw = 'Strategy Sale whitelist verify';
      const resp1 = await w3s.signMessage(signatureRaw);
      if (resp1._result !== 0) {
        return resp1;
      }
      const signature = resp1.data!.signature;
      const resp = await http.postJSON({
        url: '/publicsale/prebuy',
        data: {
          publicKey: ethUserStore.account0,
          receiver: receiver,
          amount: amount.toString(),
          contract: props.saleContract,
          chainId: ethUserStore.chainId,
          signatureRaw,
          signature
        },
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
        const resp = await preBuy(account, amount);
        if (resp._result !== 0) {
          return resp;
        }
        const data = resp.data || {};
        const nonce = data.nonce;
        const signature = data.signature;
        return publicSaleApi!.buyTokensWithSignature({ account, nonce, amount, signature });
      } else {
        return publicSaleApi!.buyTokens({ account, amount });
      }
    };

    const validateWhiteList = async ({ account, isWhiteMode }: { account: string, isWhiteMode: boolean }) => {
      if (isWhiteMode) {
        const isWhiteList = await inWhiteList(account);
        if (isWhiteList) {
          return { _result: 0, _desc: '' };
        } else {
          return { _result: -1, _desc: 'The current address is not in the whitelist' };
        }
      } else {
        return { _result: 0, _desc: '' };
      }
    }

    const validateBuy = ({ account, amount, isWhiteMode }: { account: string, amount: string, isWhiteMode: boolean }) => {
      if (!ethers.isAddress(account)) {
        return { _result: -1, _desc: 'Invalid receiver' };
      }
      if (!Number(amount)) {
        return { _result: -1, _desc: 'Invalid amount' };
      }
      return validateWhiteList({ account: ethUserStore.account0, isWhiteMode });
    }

    const handleBuy = async ({ account, amount }: { account: string, amount: string }) => {
      if (!fundTokenPriceWei.value) {
        return { _result: 1, _desc: 'Invalid price' };
      }
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

    onUnmounted(() => {
      stopTimer();
    });

    watch(
      () => ethUserStore.account0,
      (account) => {
        nextTick(async () => {
          const resp = await initUserInfo();
          if (resp._result !== 0) {
            validationError.value = resp._desc || '';
          } else {
            validationError.value = '';
          }
        });
      }
    );

    return {
      error,
      errorText,
      validationError,
      account0: computed(() => ethUserStore.account0),
      inputReceiver,
      inputTokenAmount,
      fundName,
      fundSymbol,
      tokenName,
      tokenSymbol,
      fundBalanceStr: computed(() => ethers.formatUnits(fundBalance.value, fundDecimal.value)),
      tokenBalanceStr: computed(() => ethers.formatUnits(tokenBalance.value, tokenDecimal.value)),
      tokenBuyableMaxStr: computed(() => ethers.formatUnits(tokenBuyableMax.value, tokenDecimal.value)),
      total: computed(() => ethers.formatUnits(calculator.calc(inputTokenAmount.value), fundDecimal.value)),
      fundTokenPriceStr: computed(() => fundTokenPriceWei.value ? ethers.formatUnits(fundTokenPriceWei.value, fundDecimal.value) : '?'),
      orders,
      buyLoading,
      onPressFundBuyableMax() {
        inputTokenAmount.value = ethers.formatUnits(tokenBuyableMax.value, tokenDecimal.value);
      },
      async onPressConfirm() {
        const account = inputReceiver.value;
        const amount = inputTokenAmount.value;
        buyLoading.value = true;
        ctx.emit('loading', buyLoading.value);
        const resp = await handleBuy({ account, amount });
        await wait(2000);
        buyLoading.value = false;
        ctx.emit('loading', buyLoading.value);
        if (resp._result !== 0) {
          init();
          return message.error(resp._desc);
        }
        ctx.emit('success');
        init();
      },
      onPressOrderItem(item: Item) {
        router.push({ name: 'cliffs-view', query: { address: item.receiver, contract: props.cliffsContract } });
      },
    };
  },
});
</script>

