<template>
  <div class="page">
    <NSpace vertical :wrap-item="false" align="center" :size="[16, 16]">
      <NGrid x-gap="12" y-gap="12" :cols="24" item-responsive style="max-width: 1000px">
        <NGridItem span="24 1000:12">
          <NCard style="margin-bottom: 12px">
            <NDescriptions label-placement="top" :column="1">
              <template #header>
                <NSpace justify="space-between" :wrap-item="false">
                  <NText>Contracts</NText>
                </NSpace>
              </template>
              <NDescriptionsItem>
                <template #label> Cliffs Contract (ReleaseVesing) </template>
                <NButton text tag="a" type="primary" @click="onPressExplorer(cliffContract)">
                  {{ cliffContract }}
                </NButton>
              </NDescriptionsItem>
              <NDescriptionsItem>
                <template #label> ERC20 Contract </template>
                <NButton text tag="a" type="primary" @click="onPressExplorer(erc20Contract)">
                  {{ erc20Contract }}
                </NButton>
              </NDescriptionsItem>
            </NDescriptions>
          </NCard>
          <NCard>
            <NSpin :show="infoLoading">
              <NDescriptions label-placement="top" :column="1">
                <template #header>
                  <NSpace justify="space-between" :wrap-item="false">
                    <NText>Information</NText>
                    <NButton quaternary circle :disabled="infoLoading" @click="onPressRefreshInfo">
                      <template #icon>
                        <NIcon>
                          <IconRefresh />
                        </NIcon>
                      </template>
                    </NButton>
                  </NSpace>
                </template>
                <template v-if="!isSign">
                  <NDescriptionsItem>Please connect wallet first. </NDescriptionsItem>
                </template>
                <template v-else>
                  <NDescriptionsItem>
                    <template #label> Chain ID </template>
                    {{ chainId }}
                  </NDescriptionsItem>
                  <NDescriptionsItem>
                    <template #label> EMC Balance </template>
                    {{ balanceStr }}
                  </NDescriptionsItem>
                  <NDescriptionsItem>
                    <template #label> EMC Allowance </template>
                    {{ allowanceStr }}
                  </NDescriptionsItem>
                  <NDescriptionsItem>
                    <template #label> Cliffs Amount </template>
                    {{ cliffAmountStr }}
                  </NDescriptionsItem>
                  <NDescriptionsItem>
                    <template #label> Releasable Amount </template>
                    {{ releasableAmountStr }}
                  </NDescriptionsItem>
                  <NDescriptionsItem>
                    <template #label> Releasable Reward Amount </template>
                    {{ releasableAmountRewardStr }}
                  </NDescriptionsItem>
                </template>
              </NDescriptions>
            </NSpin>
          </NCard>
        </NGridItem>
        <NGridItem span="24 1000:12">
          <NCard title="Cliffs">
            <NSpace vertical :wrap-item="false" :size="[16, 16]">
              <NForm ref="formRef" :model="formData" :show-feedback="false">
                <NGrid x-gap="16" y-gap="16" cols="24">
                  <NFormItemGi span="24" path="account" label="Account">
                    <NInput v-model:value="formData.account" style="width: 100%" />
                  </NFormItemGi>
                  <NFormItemGi span="24" path="start" label="From Date">
                    <NDatePicker v-model:value="formData.start" type="date" :is-date-disabled="dateDisabledHandler"
                      style="width: 100%" />
                  </NFormItemGi>
                  <NFormItemGi span="24" path="cycleUnit" label="Cycle Unit">
                    <NSelect v-model:value="formData.cycleUnit" :options="cycleUnitOptions" style="width: 100%" />
                  </NFormItemGi>
                  <NFormItemGi span="24" path="cycles" label="Cycles">
                    <NInputNumber v-model:value="formData.cycles" min="1" style="width: 100%" />
                  </NFormItemGi>
                  <NFormItemGi span="24" path="amount" label="Amount">
                    <NInput v-model:value="formData.amount" min="0" :precision="0" style="width: 100%" />
                  </NFormItemGi>
                  <NFormItemGi span="24">
                    <NButton type="primary" strong :loading="sendLoading"
                      style="width: 100%; background-color: var(--n-color)" @click="onPressSend">Cliffs</NButton>
                  </NFormItemGi>
                </NGrid>
              </NForm>
              <template v-if="result">
                <NCard title="Response">{{ result }}</NCard>
              </template>
            </NSpace>
          </NCard>
        </NGridItem>
      </NGrid>
    </NSpace>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, nextTick, computed } from 'vue';
import {
  NSpace,
  NCard,
  NText,
  NGrid,
  NGridItem,
  NForm,
  NFormItemGi,
  NInput,
  NInputNumber,
  NSelect,
  NDatePicker,
  NButton,
  NDescriptions,
  NDescriptionsItem,
  NSpin,
  NIcon,
  SelectOption,
  useMessage,
} from 'naive-ui';
import { RefreshSharp as IconRefresh } from '@vicons/ionicons5';
import { useRoute } from 'vue-router';
import { ethers } from 'ethers';
import { useETHUserStore } from '@/stores/eth-user';
import { ApiManager } from '@/web3/api';
import { LockApi } from '@/web3/api/lock';
import { ERC20Api } from '@/web3/api/erc20';
import { list as cycleUnitList } from '@/pages/cliffs-team/cycle-unit';

type FormData = {
  account: string;
  start: number;
  cycles: number;
  cycleUnit: number;
  amount: string;
};

export default defineComponent({
  name: 'staking',
  components: {
    NSpace,
    NCard,
    NText,
    NForm,
    NGrid,
    NGridItem,
    NFormItemGi,
    NInput,
    NInputNumber,
    NSelect,
    NDatePicker,
    NButton,
    NDescriptions,
    NDescriptionsItem,
    NSpin,
    NIcon,
    IconRefresh,
  },
  setup() {
    const message = useMessage();
    const route = useRoute();
    const ethUserStore = useETHUserStore();
    const cliffContract = ref('');
    const erc20Contract = ref('');
    const allowance = ref<bigint>(0n);
    const balance = ref<bigint>(0n);
    const cliffAmount = ref<bigint>(0n);
    const releasableAmount = ref<bigint>(0n);
    const releasableAmountReward = ref<bigint>(0n);
    const decimals = ref(0);
    const infoLoading = ref(false);
    const sendLoading = ref(false);
    const apiManager = ApiManager.getInstance();
    let limitStart = new Date().getTime() + 365 * 86400000;
    let lockApi: LockApi | null = null;
    let erc20Api: ERC20Api | null = null;

    const cycleUnitOptions = ref<SelectOption[]>(cycleUnitList);
    const defaultFormData = () => ({
      account: '',
      start: new Date().getTime(), //start timestamp second
      cycles: 1, //vesting cycle count
      cycleUnit: 0,
      amount: '', //vesting amount
    });

    const formData = ref<FormData>(defaultFormData());

    const result = ref('');

    onMounted(() => {
      cliffContract.value = '0xbfbc3BF85FBA818fc49A0354D2C84623cE711b63';
      limitStart = new Date().getTime();
      formData.value.start = limitStart + 86400000;
      init();
    });

    const init = async () => {
      infoLoading.value = true;
      lockApi = apiManager.create(LockApi, { address: cliffContract.value });
      const resp = await lockApi.token();
      erc20Contract.value = resp.data || '-';
      erc20Api = apiManager.create(ERC20Api, { address: erc20Contract.value });
      await initInfoWithUser();
      infoLoading.value = false;
    };

    const initInfoWithUser = async () => {
      if (ethUserStore.isInvalidConnect) {
        allowance.value = 0n;
        cliffAmount.value = 0n;
        releasableAmount.value = 0n;
        return;
      }

      const [resp0, resp1, resp2, resp3, resp4] = await Promise.all([
        erc20Api!.decimals(),
        erc20Api!.balanceOf({ account: ethUserStore.account0 }),
        erc20Api!.allowance({ account: ethUserStore.account0, spender: cliffContract.value }),
        lockApi!.getLockedAmount({ account: ethUserStore.account0 }),
        lockApi!.getReleasableAmount({ account: ethUserStore.account0 }),
      ]);

      const _decimals = resp0.data;
      const _balance = resp1.data;
      const _allowance = resp2.data;
      const _cliffAmount = resp3.data;
      const _releasableAmount = resp4.data || [];

      decimals.value = Number(_decimals);

      allowance.value = _allowance;
      balance.value = _balance;
      cliffAmount.value = _cliffAmount;

      releasableAmount.value = _releasableAmount[0] || 0n;
      releasableAmountReward.value = _releasableAmount[1] || 0n;

      if (!formData.value.account) {
        formData.value.account = ethUserStore.account0;
      }

      //Utils.stringify(_releasableAmount);
    };

    const createVesting = async (params: any) => {
      const { account, start, cycles, cycleUnit } = params;
      const amount = ethers.parseUnits(params.amount, decimals.value);
      const resp = await erc20Api!.allowance({ account: ethUserStore.account0, spender: cliffContract.value });
      const allowance = resp.data as bigint; //bigint;
      const diffAllowance = amount - allowance;
      if (diffAllowance > 0n) {
        const resp2 = await erc20Api!.approve({ amount: diffAllowance, spender: cliffContract.value });
        if (resp2._result !== 0) {
          message.error(`Approve error: ${resp2._desc}`);
          return resp2;
        }
      }
      const resp3 = await lockApi!.createVestingSchedule({
        account,
        start: BigInt(start),
        cycles: BigInt(cycles),
        cycleUnit,
        amount,
      });
      return resp3;
    };

    watch(
      () => ethUserStore.isInvalidConnect,
      (invalid) => {
        if (invalid) return;
        nextTick(() => initInfoWithUser());
      }
    );

    return {
      cycleUnitOptions,
      formData,
      result,
      //info
      infoLoading,
      sendLoading,
      isSign: computed(() => ethUserStore.account0),
      chainId: computed(() => ethUserStore.chainId),
      cliffContract,
      erc20Contract,
      allowance,
      balance,
      cliffAmount,
      releasableAmount,
      balanceStr: computed(() => ethers.formatUnits(balance.value, decimals.value)),
      allowanceStr: computed(() => ethers.formatUnits(allowance.value, decimals.value)),
      cliffAmountStr: computed(() => ethers.formatUnits(cliffAmount.value, decimals.value)),
      releasableAmountStr: computed(() => ethers.formatUnits(releasableAmount.value, decimals.value)),
      releasableAmountRewardStr: computed(() => ethers.formatUnits(releasableAmountReward.value, decimals.value)),
      dateDisabledHandler(ts: number) {
        return ts < limitStart;
      },
      onPressRefreshInfo() {
        init();
      },
      onPressExplorer(contract: string) {
        window.open(`https://arbiscan.io/address/${contract}`);
      },
      async onPressSend() {
        if (ethUserStore.isInvalidConnect) {
          message.error('Please connect wallet first');
          return;
        }
        if (formData.value.start < limitStart) {
          message.error("The 'From Date' must be after 365 days");
          return;
        }
        const account = formData.value.account;
        if (!ethers.isAddress(account)) {
          message.error('Invalid account');
          return;
        }
        const start = Math.floor(formData.value.start / 1000);
        const cycles = formData.value.cycles;
        const cycleUnit = formData.value.cycleUnit;
        const amount = formData.value.amount;
        if (!/^[0-9]+([\.][0-9]{1,18})?$/.test(amount)) {
          message.error("Invalid 'Amount'");
          return;
        }
        result.value = '';
        sendLoading.value = true;
        const resp = await createVesting({ account, start, cycles, cycleUnit, amount });
        sendLoading.value = false;
        result.value = JSON.stringify(resp);
        if (resp._result === 0) {
          const originAccount = formData.value.account;
          formData.value = defaultFormData();
          formData.value.account = originAccount;
          message.success('Successful');
        } else {
          message.success('Failed');
        }
      },
    };
  },
});
</script>

<style scoped></style>
