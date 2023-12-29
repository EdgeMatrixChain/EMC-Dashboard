<template>
  <div class="page">
    <template v-if="error === -1">
      <NSpace align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
        <NSpin />
      </NSpace>
    </template>
    <template v-else-if="error > 0">
      <NSpace vertical align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
        <NText depth="3" style="font-size:16px;">{{ errorText }}</NText>
        <NButton size="large" strong @click="onPressTry">Try Again</NButton>
      </NSpace>
    </template>
    <template v-else>
      <NSpace vertical :wrap-item="false" align="center" :size="[16, 16]">
        <NCard title="About Contract" style="max-width:880px;">
          <NSpace align="center" :wrap-item="false" :size="[16, 16]">
            <template v-if="isBeneficiary">
              <NButton type="primary" strong size="large" round @click="onPressAdminClaimFund"
                style="background-color:var(--n-color);width:100%;flex:1">
                Claim Fund</NButton>
              <NButton type="primary" strong size="large" round @click="onPressAdminWithdrawToken"
                style="background-color:var(--n-color);width:100%;flex:1">
                Withdraw Token</NButton>
            </template>
            <NButton type="primary" strong size="large" round @click="onPressBuy"
              style="background-color:var(--n-color);width:100%;flex:1">
              Buy</NButton>
          </NSpace>
        </NCard>
        <NInput v-model:value="inputAccount" size="large" :round="true" placeholder="Address"
          style="width:100%;max-width:880px; border-radius: 99px !important;">
          <template #suffix>
            <NButton type="primary" strong round @click="onPressSearch" style="background-color:var(--n-color)">
              <NIcon size="24">
                <IconRefresh />
              </NIcon>
            </NButton>
          </template>
        </NInput>
        <NSpin :show="currentLoading">
          <NCard title="Strategy Sale" style="max-width:880px;">
            <template #header>
              <NSpace vertical justify="space-between" :wrap-item="false" :size="[4, 4]">
                <NText>About Address</NText>
                <NText style="font-size:12px;">{{ currentAccount }}</NText>
              </NSpace>
            </template>
            <NSpace vertical justify="center" :wrap-item="false" :size="[16, 16]">
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="3" style="font-size:16px">The balance of the current stake</NText>
                <NText>{{ currentStakeAmountStr }} EMC</NText>
              </NSpace>
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="3" style="font-size:16px">The amount that can be withdrawn</NText>
                <NText>{{ currentWithdrawAmountStr }} EMC</NText>
              </NSpace>
              <NButton type="primary" strong size="large" :disabled="!currentCanWithdraw" round @click="onPressClaim"
                style="background-color:var(--n-color);width:100%;">Withdrawn</NButton>
              <Table :data="currentSchedule" />
            </NSpace>
          </NCard>
        </NSpin>
      </NSpace>
      <AdminClaimFund v-model:visible="isAdminClaimFundVisible" :total-fund="totalFundStr"
        :contract="publicSaleContract" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch, nextTick } from 'vue';
import {
  NSpace,
  NCard,
  NText,
  NInput,
  NButton,
  NIcon,
  NSpin,
  NModal,
  useMessage,
} from 'naive-ui';
import { SearchSharp as IconRefresh, Close as IconClose } from '@vicons/ionicons5';
import { useRoute, useRouter } from 'vue-router';
import { ethers } from 'ethers';
import { Web3Utils } from '@/web3/utils';
import { ApiManager } from '@/web3/api';
import { useETHUserStore } from '@/stores/eth-user';
import { PublicSaleApi } from '@/web3/api/public-sale';
import { CliffsApi } from '@/web3/api/cliffs';
import Table from './table.vue';
import type { Item } from './table.vue';

import AdminClaimFund from './admin-claim-fund/index.vue';
export default defineComponent({
  name: 'public-sale',
  components: {
    NSpace,
    NCard,
    NText,
    NInput,
    NButton,
    NIcon,
    NSpin,
    NModal,
    IconRefresh,
    IconClose,
    Table,
    AdminClaimFund,
  },
  setup() {
    const message = useMessage();
    const route = useRoute();
    const router = useRouter();
    const ethUserStore = useETHUserStore();
    const error = ref(-1);
    const errorText = ref('');
    const publicSaleContract = ref('');
    const beneficiaryAddress = ref('');
    const totalFund = ref(0n);
    const isAdminClaimFundVisible = ref(false);

    const fundContract = ref('');
    const tokenContract = ref('');
    const stakeLockContract = ref('');
    const inputAccount = ref('');
    const currentLoading = ref(false);
    const currentAccount = ref('');
    const currentStakeAmount = ref(0n);
    const currentWithdrawAmount = ref(0n);
    const currentSchedule = ref<Item[]>([]);


    const apiManager = ApiManager.getInstance();
    let publicSaleApi: PublicSaleApi | null = null;
    let cliffsApi: CliffsApi | null = null;

    onMounted(() => {
      publicSaleContract.value = '0x17EA72D614C47Dc4ee5d71044076500272dfBEe3';
      init();
    });

    const initUserInfo = async (account: string) => {
      currentLoading.value = true;
      const [
        { data: _currentStaked },
        { data: _currentClaim },
        { data: _currentSchedule }
      ] = await Promise.all([
        cliffsApi!.getLockedAmount({ account }),
        cliffsApi!.getReleasableAmount({ account }),
        cliffsApi!.getVestingSchedule({ account }),
      ]);
      currentStakeAmount.value = _currentStaked || 0n;
      currentWithdrawAmount.value = _currentClaim || 0n;
      currentSchedule.value = (_currentSchedule || []).map((row: any[]) => {
        const start = Number(row[1] as bigint || 0n);
        const cycles = Number(row[2] as bigint || 0n);
        const amount = row[4] as bigint || 0n;
        const released = row[5] as bigint || 0n;
        return {
          account: row[0],
          start: start,
          cycleUnit: row[3],
          cycles: cycles,
          amount: amount,
          released: released,
        }
      });
      currentAccount.value = account;
      currentLoading.value = false;
    }

    const init = async () => {
      error.value = -1;
      publicSaleApi = apiManager.create(PublicSaleApi, { address: publicSaleContract.value });
      const [
        { data: _beneficiary },
        { data: _fundContract },
        { data: _tokenContract },
        { data: _stakeLockContract }
      ] = await Promise.all([
        publicSaleApi.beneficiary(),
        publicSaleApi.fundToken(),
        publicSaleApi.token(),
        publicSaleApi.releaseContract(),
      ]);
      if (!_beneficiary || !_fundContract || !_tokenContract || !_stakeLockContract) {
        error.value = 1;
        errorText.value = 'Network error';
        return;
      }
      beneficiaryAddress.value = _beneficiary;
      fundContract.value = _fundContract;
      tokenContract.value = _tokenContract;
      stakeLockContract.value = _stakeLockContract;
      cliffsApi = apiManager.create(CliffsApi, { address: stakeLockContract.value });
      if (!ethUserStore.isInvalidConnect) {
        await initUserInfo(ethUserStore.account0);
        inputAccount.value = ethUserStore.account0;
      }
      error.value = 0;
    };

    watch(
      () => ethUserStore.isInvalidConnect,
      (invalid) => {
        if (invalid) return;
        if (!currentAccount.value) {
          nextTick(() => {
            initUserInfo(ethUserStore.account0);
            inputAccount.value = ethUserStore.account0;
          });
        }
      })

    return {
      error,
      errorText,
      isSign: computed(() => !ethUserStore.isInvalidConnect),
      chainId: computed(() => ethUserStore.chainId),
      publicSaleContract,
      isBeneficiary: computed(() => Web3Utils.eq(ethUserStore.account0, beneficiaryAddress.value)),
      totalFundStr: computed(() => ethers.formatUnits(totalFund.value, 6)),
      isAdminClaimFundVisible,
      fundContract,
      tokenContract,
      inputAccount,
      currentLoading,
      currentAccount,
      currentStakeAmountStr: computed(() => ethers.formatUnits(currentStakeAmount.value, 18)),
      currentWithdrawAmountStr: computed(() => ethers.formatUnits(currentWithdrawAmount.value, 18)),
      currentCanWithdraw: computed(() => currentWithdrawAmount.value > 0n),
      currentSchedule,

      onPressTry() {
        init();
      },
      onPressSearch() {
        if (!ethers.isAddress(inputAccount.value)) {
          message.error('Invalid address');
          return;
        }
        initUserInfo(inputAccount.value);
      },
      onPressClaim() {

      },
      onPressAdminClaimFund() {
        isAdminClaimFundVisible.value = true;
      },
      onPressAdminWithdrawToken() {

      },
      onPressBuy() {
        router.push({ name: 'public-sale-buy', query: { contract: publicSaleContract.value } });
      },
    };
  },
});
</script>

<style scoped>
.input-group {
  padding: 2px;
  border: solid 1px #e7e7e7;
  border-radius: 99px;
}
</style>
