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
          <NSpace class="cursor-pointer" align="center" :wrap-item="false" :wrap="false" :size="[8, 0]" @click="onPressItem(item)">
            <img class="w-[40px] h-[40px] rounded-[40px]" :src="item.icon" />
            <div class="flex-1 w-[0px]">
              <div class="whitespace-nowrap text-ellipsis overflow-hidden w-full">
                <NText class="text-[14px]">{{ item.name }}</NText>
              </div>
              <NText class="text-[14px]" depth="3">{{ item.formatted }}{{ item.symbolName }}</NText>
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
import { useETHUserStore } from '@/stores/eth-user';
import type { Token } from '@/stores/eth-user';
import { getDefaultNetwork } from '@/web3/network';
import { toFixedClip } from '@/tools/format-number';
import { w3s } from '@/web3';
type Item = Token & { amount: string };

type ItemLoader = {
  init: (params: any) => Promise<[string, string]>;
};

type ItemLoaders = {
  [k: string]: ItemLoader;
};

const props = defineProps({
  priceUsd: { type: String, default: '0.0' },
});
const ethUserStore = useETHUserStore();
const message = useMessage();
const networkConfig = getDefaultNetwork();

const listInits: ItemLoaders = {
  emc: {
    init: async (params: any) => {
      const account = params.account;
      const token = params.token;
      if (!account) return ['0.0', '0.0'];
      const balance = token.formatted;
      const amount = Number(balance) * Number(props.priceUsd);
      return [toFixedClip(balance, 4), toFixedClip(amount, 4)];
    },
  },
  usdt: {
    init: async (params: any) => {
      const account = params.account;
      const token = params.token;
      if (!account) return ['0.0', '0.0'];
      const balance = token.formatted;
      const amount = Number(balance) * 1;
      return [toFixedClip(balance, 4), toFixedClip(amount, 4)];
    },
  },
};

// const list = ref<Item[]>([
//   {
//     icon: IconEMC,
//     name: 'EdgeMatrix Computing Network',
//     symbol: 'EMC',
//     address: '',
//     balance: '',
//     amount: '',
//   },
//   {
//     icon: IconUSDT,
//     name: 'Tether USD',
//     symbol: 'USDT',
//     address: '',
//     balance: '',
//     amount: '',
//   },
// ]);

const list = ref<any[]>([]);

const loading = ref(false);

async function init() {
  loading.value = true;
  const account = ethUserStore.account0;
  const _tokens = await ethUserStore.updateBalance(account);
  const tokens = { ..._tokens };
  const promises = Object.entries(tokens).map(async ([key, v]) => {
    const listInit = listInits[key];
    const token = tokens[key];
    const data = await listInit.init({ account, token });
    return { key, data };
  });

  const results = await Promise.all(promises);

  list.value = results.map(({ key, data }) => {
    const token = tokens[key];
    const [balance, amount] = data;
    return {
      ...token,
      formatted: balance,
      amount,
    };
  });
  console.info(list.value);
  // const results = await Promise.all(listInits.map((loader) => loader.init({ account, balances })));
  // results.forEach(([balance, amount], index) => {
  //   list.value[index].balance = balance;
  //   list.value[index].amount = amount;
  // });
  loading.value = false;
}

onMounted(() => {
  init();
});

function onPressItem(item: Item) {
  console.info(item);
  w3s.addToken({ type: 'ERC20', address: item.address, symbol: item.symbolName, decimals: item.decimal, image: item.icon });
}
</script>
<style scoped></style>
