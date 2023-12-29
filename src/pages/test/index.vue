<template>
  <NSpace vertical align="center" :wrap-item="false" :size="[0, 16]">
    <NCard title="ICP Transfer" style="width: 600px">
      <template v-if="!icpSign">
        <span>Please connect icp wallet first.</span>
        <Content />
      </template>
      <template v-else>
        <NForm :model="formData" :show-feedback="false">
          <NFormItem path="account" label="Ethernet Account">
            <NInput v-model:value="formData.account" />
          </NFormItem>
          <NFormItem>
            <NButton :loading="loading" @click="onPressDeposit">Deposit 1 EMC</NButton>
          </NFormItem>
        </NForm>
      </template>
    </NCard>

    <NCard title="ICP Transfer" style="width: 600px">
      <template v-if="!ethSign">
        <NButton @click="onPressConnectETH">Connect Ethernet</NButton>
      </template>
      <template v-else>
        <NSpace vertical :wrap-item="false" :size="[16, 16]">
          <template v-for="(item, index) in depositOrders">
            <NSpace align="center" :wrap-item="false" :size="[16, 16]">
              <div>{{ item.id }} {{ item.to }} {{ item.toAmount }}</div>
              <NButton @click="onPressClaim(item, index)">Claim</NButton>
            </NSpace>
          </template>
        </NSpace>
      </template>
    </NCard>
  </NSpace>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from 'vue';
import { NSpace, NCard, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui';
import { Http } from '@/tools/http';

import { useUserStore } from '@/stores/user';

import { useETHUserStore } from '@/stores/eth-user';
import { ApiManager } from '@/web3/api';
import { MerkleClaimApi } from '@/web3/api/merkle-claim';
import { ERC20Api } from '@/web3/api/erc20';

import Content from '@/components/icp-connect/content.vue';
type DepositOrder = {
  _id: string;
  id: number;
  owner: string;
  from: string;
  fromAmount: string;
  to: string;
  toAmount: string;
  createdAt: string;
  updatedAt: string;
  proofIndex: number;
  proof: string[];
};

export default defineComponent({
  name: 'test',
  components: { NSpace, NCard, NForm, NFormItem, NInput, NButton, Content },
  setup() {
    const message = useMessage();
    const http = Http.getInstance();
    const userStore = useUserStore();
    const ethUserStore = useETHUserStore();
    const formData = ref({ account: '0x5079960bCa12Ab54298394D5808A9315710DB1f5' });
    const loading = ref(false);
    //eth
    const apiManager = ApiManager.getInstance();
    const merkleClaimApi = apiManager.create(MerkleClaimApi, { address: '0xbc11851363a64b10FB15864Cd3eA719425cd46Ee' });

    // const erc20Api = apiManager.create(ERC20Api, { address: 'EMC' });
    // const {data:balance} = await erc20Api.balanceOf({account:ethUserStore.account0});
    // console.info(balance)

    const depositOrders = ref<Array<DepositOrder>>([]);
    const initDepositOrders = async () => {
      const resp = await http.get({
        url: 'https://api.edgematrix.pro/api/v1/icpconvertorder/query',
        data: { to: ethUserStore.account0 || undefined },
      });
      depositOrders.value = resp.data || [];
    };

    watch(
      () => ethUserStore.isInvalidConnect,
      (invalid) => {
        if (invalid) return;
        initDepositOrders();
      },
      {
        immediate: true,
      }
    );

    return {
      formData,
      loading,
      depositOrders,
      icpSign: computed(() => userStore.icpPrincipal),
      ethSign: computed(() => ethUserStore.account0),
      async onPressDeposit() {
        loading.value = true;
        const resp = await userStore.dip20Approve({ amount: '1' });
        console.info(resp);
        const resp2 = await userStore.deposit({ account: formData.value.account, isWhiteList: false });
        console.info(resp2);
        loading.value = false;
      },
      async onPressConnectETH() {
        await ethUserStore.signIn();
      },
      async onPressClaim(item: DepositOrder, index: number) {
        if (ethUserStore.isInvalidConnect) {
          message.error('Sign in ethernet first');
        }
        const resp = await merkleClaimApi.claim({
          index: item.proofIndex,
          account: item.to,
          amount: BigInt(item.toAmount),
          merkleProof: item.proof,
        });
        console.info(resp);
        if (resp._result === 0) {
          message.success('Claimed');
        }
      },
    };
  },
});
</script>

<style scoped></style>
