<template>
  <div class="page">
    <template v-if="error === -1">
      <NSpace align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
        <NSpin />
      </NSpace>
    </template>
    <template v-else-if="error > 0">
      <NSpace vertical align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
        <NText depth="3" style="font-size: 16px">{{ errorText }}</NText>
        <NButton size="large" strong @click="onPressTry">Try Again</NButton>
      </NSpace>
    </template>
    <template v-else>
      <NSpace vertical :wrap-item="false" align="center" justify="center" :size="[16, 16]">
        <NSpin :show="currentLoading">
          <NCard class="card-box emc-border rounded-[16px] p-[6px] font-GeneralSans-Semibold" title="Staking Status" :bordered="false" style="max-width: 880px">
            <template #header>
              <NSpace justify="space-between" :wrap-item="false" :size="[4, 4]">
                <NSpace vertical justify="space-between" :wrap-item="false" :size="[4, 4]">
                  <NSpace :wrap-item="false" :size="[16, 4]">
                    <NText class="text-[#7F32FF]" style="color: #7F32FF; " >{{ title }}</NText>
                    <NButton text tag="a" icon-placement="right" style="background-color: #7F32FF" @click="onPressExplorer(cliffsContract)">
                      {{ Utils.formatAddress(cliffsContract, 6) }}
                      <template #icon>
                        <NIcon size="18" color="#7F32FF">
                          <IconLink />
                        </NIcon>
                      </template>
                    </NButton>
                  </NSpace>
                  <div class="w-[200px] whitespace-nowrap text-ellipsis overflow-hidden">
                    <NPopover>
                      <template #trigger>
                        <NText style="font-size: 14px">{{ Utils.formatAddress(currentAccount, 6) }}</NText>
                      </template>
                      <NText style="font-size: 14px">{{ currentAccount }}</NText>
                    </NPopover>
                  </div>
                  <!-- <NText depth="3" style="font-size:14px;">{{ currentAccount }}</NText> -->
                </NSpace>
                <template v-if="isFilterMode">
                  <NButton type="primary" strong circle @click="onPressClearFilter" style="background-color: var(--n-color)">
                    <NIcon size="16">
                      <IconClose />
                    </NIcon>
                  </NButton>
                </template>
                <template v-else>
                  <NButton type="primary" strong circle @click="onPressOpenFilter" style="background-color: var(--n-color)">
                    <NIcon size="16">
                      <IconRefresh />
                    </NIcon>
                  </NButton>
                </template>
              </NSpace>
            </template>
            <NSpace class="pb-[6px]" vertical justify="center" :wrap-item="false" :size="[30, 30]">
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="2" class="text-[#898B95] font-GeneralSans-Medium " style="font-size: 14px">Total locked</NText>
                <NText class="text-[18px] " strong>{{ ethers.formatUnits(totalLockedAmount, 18) }} EMC</NText>
              </NSpace>
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="2" class="text-[#898B95] font-GeneralSans-Medium " style="font-size: 14px">Current locked</NText>
                <NText class="text-[18px] " strong>{{ ethers.formatUnits(currentStakeAmount, 18) }} EMC</NText>
              </NSpace>
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="2" class="text-[#898B95] font-GeneralSans-Medium " style="font-size: 14px">Eligible for claiming</NText>
                <NText class="text-[18px]" strong>{{ ethers.formatUnits(currentClaimAmount, 18) }} EMC</NText>
              </NSpace>
              <NButton class="rounded-[8px] h-[44px]" type="primary" strong size="large" :loading="claimLoading" :disabled="!currentCanWithdraw"  @click="onPressClaim">
                Claim Now
              </NButton>
            </NSpace>
          </NCard>
          <NCard class="mt-[40px] card-box emc-border rounded-[16px] p-[6px] pb-[10px] font-GeneralSans-Semibold" title="Vesting schedules" :bordered="false" style="max-width: 880px">
            <Table class="bg-[#1E2129]" :data="currentSchedule" />
          </NCard>
        </NSpin>
      </NSpace>
      <NModal :show="isVisibleFilter" :block-scroll="true" :close-on-esc="false" :mask-closable="false" transform-origin="center">
        <NCard title="$EMC Locks" style="max-width: 480px">
          <template #header>
            <NSpace justify="space-between" :wrap-item="false" :size="[4, 4]">
              <NText>Filter</NText>
            </NSpace>
          </template>
          <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
            <NText depth="2" style="font-size: 14px">Holder Address</NText>
            <NInput v-model:value="filterAccount" size="large" style="width: 100%; max-width: 880px"> </NInput>
          </NSpace>
          <NSpace class="mt-[16px]" align="center" justify="end" :wrap-item="false" :size="[16, 0]">
            <NButton class="h-[34px]"  type="default" round @click="onPressFilterCancel">Cancel</NButton>
            <NButton class="h-[34px]"  type="primary" round @click="onPressFilterSubmit">Submit</NButton>
          </NSpace>
        </NCard>
      </NModal>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { NSpace, NPopover, NCard, NText, NInput, NButton, NIcon, NSpin, NModal, useMessage } from 'naive-ui';
import { SearchSharp as IconRefresh, Close as IconClose, LinkOutline as IconLink } from '@vicons/ionicons5';
import { useRoute, useRouter } from 'vue-router';
import { ethers } from 'ethers';
import { ApiManager } from '@/web3/api';
import { useETHUserStore } from '@/stores/eth-user';
import { LockApi } from '@/web3/api/lock';
import { getDefaultNetwork } from '@/web3/network';
import Table from './table.vue';
import type { Item } from './table.vue';
import { Utils } from '@/tools/utils';

const message = useMessage();
const route = useRoute();
const ethUserStore = useETHUserStore();
const error = ref(-1);
const errorText = ref('');
const cliffsContract = ref('');

const currentLoading = ref(false);
const currentAccount = ref('');
const totalLockedAmount = ref(0n);
const currentStakeAmount = ref(0n);
const currentClaimAmount = ref(0n);
const currentSchedule = ref<Item[]>([]);
const claimLoading = ref(false);
const apiManager = ApiManager.getInstance();
const networkConfig = getDefaultNetwork();
const nodeUnstakeClaimContract = networkConfig.smarts.nodeUnstakeClaim.contract;
const isVisibleFilter = ref(false);
const isFilterMode = ref(false);
const filterAccount = ref('');
const title = computed(() => {
  return cliffsContract.value === nodeUnstakeClaimContract ? 'Staking Status' : '$EMC Locks';
});
const currentCanWithdraw = computed(() => currentClaimAmount.value > 0n);
let lockApi: LockApi | null = null;

onMounted(async () => {
  cliffsContract.value = (route.query.contract as string) || nodeUnstakeClaimContract;
  lockApi = apiManager.create(LockApi, { address: cliffsContract.value });
  init();
});

async function init() {
  const account = (route.query.address as string) || ethUserStore.account0 || '';
  error.value = -1;

  isVisibleFilter.value = false;
  isFilterMode.value = false;
  filterAccount.value = '';

  totalLockedAmount.value = 0n;
  currentStakeAmount.value = 0n;
  currentClaimAmount.value = 0n;
  currentSchedule.value = [];
  currentAccount.value = '';
  currentLoading.value = false;

  if (account) {
    await initHolderInfo(account);
  }

  error.value = 0;
}

const initHolderInfo = async (account: string) => {
  currentLoading.value = true;
  const [{ data: _amountInfo }, { data: _currentStaked }, { data: _currentClaim }, { data: _currentSchedule }] = await Promise.all([
    lockApi!.getAmount({ account }),
    lockApi!.getLockedAmount({ account }),
    lockApi!.getReleasableAmount({ account }),
    lockApi!.getVestingSchedule({ account }),
  ]);
  const [_totalLockedAmount, _totalClaimedAmount] = _amountInfo || [];
  totalLockedAmount.value = _totalLockedAmount || 0n;
  currentStakeAmount.value = _currentStaked || 0n;
  currentClaimAmount.value = _currentClaim || 0n;
  currentSchedule.value = (_currentSchedule || []).map((row: any[]) => {
    const start = Number((row[1] as bigint) || 0n);
    const cycles = Number((row[2] as bigint) || 0n);
    const amount = (row[4] as bigint) || 0n;
    const released = (row[5] as bigint) || 0n;
    return {
      account: row[0],
      start: start,
      cycleUnit: row[3],
      cycles: cycles,
      amount: amount,
      released: released,
    };
  });
  currentAccount.value = account;
  currentLoading.value = false;
};

watch<[string, boolean]>(
  () => [ethUserStore.account0, ethUserStore.isInvalidNetwork],
  ([account, isInvalidNetwork]) => {
    if (account || !isInvalidNetwork) {
      nextTick(() => init());
    }
  }
);

function onPressTry() {
  location.reload();
}

function onPressExplorer(contract: string) {
  window.open(`https://arbiscan.io/address/${contract}`);
}

function onPressOpenFilter() {
  filterAccount.value = '';
  isVisibleFilter.value = true;
}

function onPressClearFilter() {
  init();
}

function onPressFilterCancel() {
  isVisibleFilter.value = false;
}

function onPressFilterSubmit() {
  if (!ethers.isAddress(filterAccount.value)) {
    message.error('Invalid address');
    return;
  }
  initHolderInfo(filterAccount.value);
  isFilterMode.value = true;
  isVisibleFilter.value = false;
}

async function onPressClaim() {
  if (!currentAccount.value) {
    message.warning('Address is none');
    return;
  }
  claimLoading.value = true;
  const resp = await lockApi!.release({ account: currentAccount.value });
  if (resp._result !== 0) {
    claimLoading.value = false;
    message.warning(resp._desc || 'Claim failed');
    return;
  }
  await resp.data.wait();
  claimLoading.value = false;
  initHolderInfo(currentAccount.value);
}
</script>

<style scoped>
.card-box{
  background: linear-gradient(0deg, #111318 0%, #111318 100%), linear-gradient(180deg, rgba(243, 238, 255, 0.00)0%, rgba(243, 238, 255, 0.04)100%), rgba(200, 139, 196, 0.01);
}
</style>
