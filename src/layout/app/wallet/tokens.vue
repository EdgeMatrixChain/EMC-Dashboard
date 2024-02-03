<template>
  <div>
    <template v-if="loading">
      <NSpace align="center" justify="center" vertical :size="[0, 16]" :wrap-item="false" :wrap="false" style="height: 80px">
        <NSpin />
      </NSpace>
    </template>
    <template v-else>
      <NSpace vertical :size="[0, 16]" :wrap-item="false" :wrap="false">
        <template v-for="item in list">
          <NSpace align="center" :wrap-item="false" :wrap="false" :size="[8, 0]">
            <img class="w-[40px] h-[40px] rounded-[40px]" :src="item.icon" />
            <div class="flex-1 w-[0px]">
              <div class="whitespace-nowrap text-ellipsis overflow-hidden w-full">
                <NText class="text-[14px]">{{ item.name }}</NText>
              </div>
              <NText class="text-[14px]" depth="3">{{ item.balance }}{{ item.symbol }}</NText>
            </div>
            <div class="whitespace-nowrap text-ellipsis overflow-hidden w-[80px] text-right">
              <NText class="text-[14px] whitespace-nowrap">${{ item.amount }}</NText>
            </div>
          </NSpace>
        </template>
      </NSpace>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { NSpace, useMessage, NText, NSpin } from 'naive-ui';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useETHUserStore } from '@/stores/eth-user';
import { getDefaultNetwork } from '@/web3/network';
import IconEMC from '@/assets/token/emc.white.png';
import IconUSDT from '@/assets/token/usdt.svg';
import { ethers } from 'ethers';
import { ApiManager } from '@/web3/api';
import { ERC20Api } from '@/web3/api/erc20';
import { getDexData } from '@/apis';
import { toFixedClip } from '@/tools/format-number';

type Item = {
  icon: string;
  symbol: string;
  name: string;
  balance: string;
  amount: string;
};

type ItemLoader = {
  init: (params: any) => Promise<[string, string]>;
};

const props = defineProps({
  priceUsd: { type: String, default: '0.0' },
});
const ethUserStore = useETHUserStore();
const message = useMessage();
const networkConfig = getDefaultNetwork();

const listInits: ItemLoader[] = [
  {
    init: async (params: any) => {
      const account = params.account;
      const balances = params.balances;
      if (!account) return ['0.0', '0.0'];
      const balance = balances.emc.formatted;
      const amount = Number(balance) * Number(props.priceUsd);
      return [toFixedClip(balance, 4), toFixedClip(amount, 4)];
    },
  },
  {
    init: async (params: any) => {
      const account = params.account;
      const balances = params.balances;
      if (!account) return ['0.0', '0.0'];
      const balance = balances.usdt.formatted;
      const amount = Number(balance) * 1;
      return [toFixedClip(balance, 4), toFixedClip(amount, 4)];
    },
  },
];

const list = ref<Item[]>([
  {
    icon: IconEMC,
    name: 'EdgeMatrix Computing Network',
    symbol: 'EMC',
    balance: '',
    amount: '',
  },
  {
    icon: IconUSDT,
    name: 'Tether USD',
    symbol: 'USDT',
    balance: '',
    amount: '',
  },
]);

const loading = ref(false);

async function init() {
  loading.value = true;
  const account = ethUserStore.account0;
  const balances = await ethUserStore.updateBalance(account);
  const results = await Promise.all(listInits.map((loader) => loader.init({ account, balances })));
  results.forEach(([balance, amount], index) => {
    list.value[index].balance = balance;
    list.value[index].amount = amount;
  });
  loading.value = false;
}

onMounted(() => {
  init();
});
</script>
<style scoped></style>
