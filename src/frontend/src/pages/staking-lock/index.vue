<template>
  <div class="page">
    <NSpace vertical :wrap-item="false" :size="[16, 16]" style="max-width: 1000px">
      <NGrid x-gap="12" y-gap="12" :cols="24" item-responsive>
        <NGridItem span="24 1000:12">
          <NCard title="Staking (Team)">
            <NSpace vertical :wrap-item="false" :size="[16, 16]">
              <NForm ref="formRef" :model="formData" :show-feedback="false">
                <NGrid x-gap="16" y-gap="16" cols="24">
                  <NFormItemGi span="24" path="start" label="From Date">
                    <NDatePicker v-model:value="formData.start" type="date" style="width: 100%" />
                  </NFormItemGi>
                  <NFormItemGi span="24" path="cycles" label="Cycles">
                    <NInputNumber v-model:value="formData.cycles" min="1" style="width: 100%" />
                  </NFormItemGi>
                  <NFormItemGi span="24" path="cycleUnit" label="Cycle Unit">
                    <NSelect v-model:value="formData.cycleUnit" :options="cycleUnitOptions" style="width: 100%" />
                  </NFormItemGi>
                  <NFormItemGi span="24" path="amount" label="Amount">
                    <NInput v-model:value="formData.amount" min="0" :precision="0" style="width: 100%" />
                  </NFormItemGi>
                  <NFormItemGi span="24">
                    <NButton type="primary" strong :loading="sendLoading" style="width: 100%" @click="onPressSend">Send</NButton>
                  </NFormItemGi>
                </NGrid>
              </NForm>
              <template v-if="result">
                <NCard title="Response">{{ result }}</NCard>
              </template>
            </NSpace>
          </NCard>
        </NGridItem>
        <NGridItem span="24 1000:12">
          <NCard>
            <NSpin :show="infoLoading">
              <NDescriptions label-placement="top" :column="1">
                <template #header>
                  <NSpace justify="space-between" :wrap-item="false">
                    <NText>Information</NText>
                    <NButton quaternary circle :disabled="infoLoading" @click="onPressRefreshInfo">
                      <template #icon>
                        <NIcon><IconRefresh /></NIcon>
                      </template>
                    </NButton>
                  </NSpace>
                </template>
                <NDescriptionsItem>
                  <template #label> Chain ID </template>
                  {{ chainId }}
                </NDescriptionsItem>
                <NDescriptionsItem>
                  <template #label> Staking Lock Contract (ReleaseVesing) </template>
                  {{ stakeLockContract }}
                </NDescriptionsItem>
                <NDescriptionsItem>
                  <template #label> ERC20 Contract </template>
                  {{ erc20Contract }}
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
                  <template #label> Lock Amount </template>
                  {{ lockAmountStr }}
                </NDescriptionsItem>
                <NDescriptionsItem>
                  <template #label> Releasable Amount </template>
                  {{ releasableAmountStr }}
                </NDescriptionsItem>
                <NDescriptionsItem>
                  <template #label> Releasable Reward Amount </template>
                  {{ releasableAmountRewardStr }}
                </NDescriptionsItem>
              </NDescriptions>
            </NSpin>
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
  SelectOption,
  useMessage,
} from 'naive-ui';
import { RefreshSharp as IconRefresh } from '@vicons/ionicons5';
import { useRoute } from 'vue-router';
import moment from 'moment';
import { Utils } from '@/tools/utils';
import { useETHUserStore } from '@/stores/eth-user';
import { ApiManager } from '@/web3/api';
import { StakeLockApi } from '@/web3/api/stake-lock';
import { ERC20Api } from '@/web3/api/erc20';
import { ethers } from 'ethers';
type FormData = {
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
    const stakeLockContract = ref('');
    const erc20Contract = ref('');
    const allowance = ref<bigint>(0n);
    const balance = ref<bigint>(0n);
    const lockAmount = ref<bigint>(0n);
    const releasableAmount = ref<bigint>(0n);
    const releasableAmountReward = ref<bigint>(0n);
    const decimals = ref(0);
    const infoLoading = ref(false);
    const sendLoading = ref(false);
    const apiManager = ApiManager.getInstance();
    let stakeLockApi: StakeLockApi | null = null;
    let erc20Api: ERC20Api | null = null;

    const cycleUnitOptions = ref<SelectOption[]>([
      { label: 'Days1', value: 0 },
      { label: 'Days30', value: 1 },
      { label: 'Days90', value: 2 },
      { label: 'Days180', value: 3 },
      { label: 'Days360', value: 4 },
    ]);

    const formData = ref<FormData>({
      start: moment().add(1, 'days').valueOf(), //start timestamp second
      cycles: 1, //vesting cycle count
      cycleUnit: 0,
      amount: '', //vesting amount
    });

    const result = ref('');

    onMounted(() => {
      stakeLockContract.value = (route.params?.contract as string) || '0xD20c8f4e0f3F21EB29cFF00667E2763D8492791B';
      init();
    });

    const init = async () => {
      infoLoading.value = true;
      stakeLockApi = apiManager.create(StakeLockApi, { address: stakeLockContract.value });
      const resp = await stakeLockApi.token();
      erc20Contract.value = resp.data || '-';
      erc20Api = apiManager.create(ERC20Api, { address: erc20Contract.value });
      await initInfoWithUser();
      infoLoading.value = false;
    };

    const initInfoWithUser = async () => {
      if (!ethUserStore.account0) {
        allowance.value = 0n;
        lockAmount.value = 0n;
        releasableAmount.value = 0n;
        return;
      }
      const [resp0, resp1, resp2, resp3, resp4] = await Promise.all([
        erc20Api!.decimals(),
        erc20Api!.balanceOf({ account: ethUserStore.account0 }),
        erc20Api!.allowance({ account: ethUserStore.account0, spender: stakeLockContract.value }),
        stakeLockApi!.getLockedAmount({ account: ethUserStore.account0 }),
        stakeLockApi!.getReleasableAmount({ account: ethUserStore.account0 }),
      ]);
      const _decimals = resp0.data;
      const _balance = resp1.data;
      const _allowance = resp2.data;
      const _lockAmount = resp3.data;
      const _releasableAmount = resp4.data || [];
      decimals.value = Number(_decimals);
      allowance.value = _allowance;
      balance.value = _balance;
      lockAmount.value = _lockAmount;
      releasableAmount.value = _releasableAmount[0];
      releasableAmountReward.value = _releasableAmount[1];
      //Utils.stringify(_releasableAmount);
    };

    const createVesting = async (params: any) => {
      const { account, start, cycles, cycleUnit } = params;
      const amount = ethers.parseUnits(params.amount, decimals.value);
      const resp2 = await erc20Api!.approve({ amount: amount, spender: stakeLockContract.value });
      if (resp2._result !== 0) {
        message.error(`Approve error: ${resp2._desc}`);
        return resp2;
      }
      const resp3 = await stakeLockApi!.createVestingSchedule({ account, start, cycles, cycleUnit, amount });
      if (resp3._result !== 0) {
        message.error(`Staking error: ${resp3._desc}`);
      }
      return resp3;
    };

    watch(
      () => ethUserStore.account0,
      (val) => {
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
      chainId: computed(() => ethUserStore.chainId),
      stakeLockContract,
      erc20Contract,
      allowance,
      balance,
      lockAmount,
      releasableAmount,
      balanceStr: computed(() => ethers.formatUnits(balance.value, decimals.value)),
      allowanceStr: computed(() => ethers.formatUnits(allowance.value, decimals.value)),
      lockAmountStr: computed(() => ethers.formatUnits(lockAmount.value, decimals.value)),
      releasableAmountStr: computed(() => ethers.formatUnits(releasableAmount.value, decimals.value)),
      releasableAmountRewardStr: computed(() => ethers.formatUnits(releasableAmountReward.value, decimals.value)),
      onPressRefreshInfo() {
        init();
      },
      async onPressSend() {
        const limitStart = new Date().getTime() + 365 * 86400000;
        if (formData.value.start < limitStart) {
          message.error("The 'From Date' must be after 365 days");
          return;
        }
        const start = Math.floor(formData.value.start / 1000);
        const cycles = formData.value.cycles;
        const cycleUnit = formData.value.cycleUnit;
        const amount = formData.value.amount;
        if (!/^\d+$/.test(amount)) {
          message.error("The 'Amount' must be number");
          return;
        }
        result.value = '';
        sendLoading.value = true;
        const resp = await createVesting({ account: ethUserStore.account0, start, cycles, cycleUnit, amount });
        sendLoading.value = false;
        result.value = Utils.stringify(resp);
      },
    };
  },
});
</script>

<style scoped></style>
