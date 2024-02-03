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
      <NSpace vertical :wrap-item="false" align="center" :size="[16, 16]">
        <NCard title="$EMC Locks" style="max-width: 880px">
          <template #header>
            <NSpace justify="space-between" :wrap-item="false" :size="[4, 4]">
              <NText>$EMC Locks</NText>
              <NButton text tag="a" type="primary" icon-placement="right" @click="onPressExplorer(cliffsContract)">
                {{ cliffsContractFormatted }}
                <template #icon>
                  <NIcon size="18">
                    <IconLink />
                  </NIcon>
                </template>
              </NButton>
            </NSpace>
          </template>
          <NInput
            v-model:value="inputAccount"
            size="large"
            :round="true"
            placeholder="Address"
            style="width: 100%; max-width: 880px; border-radius: 99px !important"
          >
            <template #suffix>
              <NButton type="primary" strong round @click="onPressSearch" style="background-color: var(--n-color)">
                <NIcon size="24">
                  <IconRefresh />
                </NIcon>
              </NButton>
            </template>
          </NInput>
        </NCard>
        <!-- <NInput v-model:value="inputAccount" size="large" :round="true" placeholder="Address"
          style="width:100%;max-width:880px; border-radius: 99px !important;">
          <template #suffix>
            <NButton type="primary" strong round @click="onPressSearch" style="background-color:var(--n-color)">
              <NIcon size="24">
                <IconRefresh />
              </NIcon>
            </NButton>
          </template>
        </NInput> -->
        <NSpin :show="currentLoading">
          <NCard title="Strategy Sale" style="max-width: 880px">
            <template #header>
              <NSpace vertical justify="space-between" :wrap-item="false" :size="[4, 4]">
                <NText>{{ currentAccount }}</NText>
                <!-- <NText depth="3" style="font-size:14px;">{{ currentAccount }}</NText> -->
              </NSpace>
            </template>
            <NSpace vertical justify="center" :wrap-item="false" :size="[16, 16]">
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="2" style="font-size: 14px">Total locked</NText>
                <NText class="text-[18px]" strong>{{ totalLockedAmountStr }} EMC</NText>
              </NSpace>
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="2" style="font-size: 14px">Current locked</NText>
                <NText class="text-[18px]" strong>{{ currentStakeAmountStr }} EMC</NText>
              </NSpace>
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="2" style="font-size: 14px">Eligible for claiming</NText>
                <NText class="text-[18px]" strong>{{ currentClaimAmountStr }} EMC</NText>
              </NSpace>
              <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
                <NText depth="2" style="font-size: 14px">Vesting schedules</NText>
                <Table :data="currentSchedule" />
              </NSpace>
              <NButton
                type="primary"
                strong
                size="large"
                :loading="claimLoading"
                :disabled="!currentCanWithdraw"
                round
                @click="onPressClaim"
                style="background-color: var(--n-color); width: 100%"
                >Claim Now</NButton
              >
            </NSpace>
          </NCard>
        </NSpin>
      </NSpace>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch, nextTick } from 'vue';
import { NSpace, NCard, NText, NInput, NButton, NIcon, NSpin, NModal, useMessage } from 'naive-ui';
import { SearchSharp as IconRefresh, Close as IconClose, LinkOutline as IconLink } from '@vicons/ionicons5';
import { useRoute, useRouter } from 'vue-router';
import { ethers } from 'ethers';
import { ApiManager } from '@/web3/api';
import { useETHUserStore } from '@/stores/eth-user';
import { LockApi } from '@/web3/api/lock';
import Table from './table.vue';
import type { Item } from './table.vue';
import { Utils } from '@/tools/utils';
export default defineComponent({
  name: 'cliffs-view',
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
    IconLink,
    Table,
  },
  setup() {
    const message = useMessage();
    const route = useRoute();
    const ethUserStore = useETHUserStore();
    const error = ref(-1);
    const errorText = ref('');
    const cliffsContract = ref('');
    const inputAccount = ref('');
    const currentLoading = ref(false);
    const currentAccount = ref('');
    const totalLockedAmount = ref(0n);
    const currentStakeAmount = ref(0n);
    const currentClaimAmount = ref(0n);
    const currentSchedule = ref<Item[]>([]);
    const claimLoading = ref(false);
    const apiManager = ApiManager.getInstance();
    let lockApi: LockApi | null = null;

    onMounted(async () => {
      cliffsContract.value = (route.query.contract as string) || '';
      inputAccount.value = (route.query.address as string) || '';
      lockApi = apiManager.create(LockApi, { address: cliffsContract.value });
      error.value = -1;
      if (inputAccount.value) {
        await init(inputAccount.value);
      }
      error.value = 0;
    });

    const init = async (account: string) => {
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

    watch(
      () => ethUserStore.isInvalidConnect,
      (invalid) => {
        if (invalid) return;
        if (!currentAccount.value) {
          nextTick(() => {
            init(ethUserStore.account0);
            inputAccount.value = ethUserStore.account0;
          });
        }
      }
    );

    return {
      error,
      errorText,
      isSign: computed(() => !ethUserStore.isInvalidConnect),
      chainId: computed(() => ethUserStore.chainId),
      cliffsContract,
      inputAccount,
      currentLoading,
      currentAccount,
      cliffsContractFormatted: computed(() => Utils.formatAddress(cliffsContract.value, 6)),
      totalLockedAmountStr: computed(() => ethers.formatUnits(totalLockedAmount.value, 18)),
      currentStakeAmountStr: computed(() => ethers.formatUnits(currentStakeAmount.value, 18)),
      currentClaimAmountStr: computed(() => ethers.formatUnits(currentClaimAmount.value, 18)),
      currentCanWithdraw: computed(() => currentClaimAmount.value > 0n),
      currentSchedule,
      claimLoading,
      onPressTry() {
        location.reload();
      },
      onPressExplorer(contract: string) {
        window.open(`https://arbiscan.io/address/${contract}`);
      },
      onPressSearch() {
        if (!ethers.isAddress(inputAccount.value)) {
          message.error('Invalid address');
          return;
        }
        init(inputAccount.value);
      },
      async onPressClaim() {
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
        init(currentAccount.value);
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
