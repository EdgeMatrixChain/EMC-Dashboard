<template>
  <NModal :show="visible" :block-scroll="false" :mask-closable="false">
    <NCard title="Unstake" style="max-width: 640px;">
      <template #header-extra>
        <NButton strong secondary circle :disabled="loadings.submit" @click.stop.prevent="onPressClose">
          <template #icon>
            <IconClose />
          </template>
        </NButton>
      </template>
      <template v-if="error === -1">
        <NSpace align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
          <NSpin />
        </NSpace>
      </template>
      <template v-else-if="error > 0">
        <NSpace align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
          <NText>{{ errorText }}</NText>
        </NSpace>
      </template>
      <template v-else>
        <NSpace vertical :wrap-item="false" :size="[0, 16]" style="min-height:160px;">
          <NSpace vertical :wrap-item="false" :size="[0, 4]">
            <NSpace :wrap-item="false" justify="space-between">
              <NText depth="3" strong style="font-size: 16px">Unstake amount</NText>
            </NSpace>
            <NInput v-model:value="inputTokenAmount" placeholder=" " size="large"
              style="border-radius: 8px; background: #f5f5f5; height: 56px; line-height: 56px">
            </NInput>
          </NSpace>

          <NSpace align="center" :wrap-item="false" :size="[8, 0]">
            <NText depth="3" strong>Your stake balance:</NText>
            <template v-if="!loadings.info">
              <NSpace align="center" :wrap-item="false" :size="[4, 0]">
                <img src="@/assets/token/emc.svg" style="width: 20px; height: 20px" />
                <NText strong>{{ stakeTokenBalanceStr }}{{ tokenSymbol }}</NText>
              </NSpace>
            </template>
            <template v-else>
              <NSkeleton text style="width: 80px" />
            </template>
          </NSpace>
          <template v-if="!ethUserStore.account0">
            <NButton type="primary" strong size="large" round disabled
              style="background-color:var(--n-color);width:100%;">Not Connected
            </NButton>
          </template>
          <template v-else-if="ethUserStore.isInvalidNetwork">
            <NButton type="primary" strong size="large" round disabled
              style="background-color:var(--n-color);width:100%;">Switch to arbitrum one
            </NButton>
          </template>
          <template v-else>
            <NButton type="primary" strong size="large" round :loading="loadings.submit || loadings.info"
              @click="onPressSubmit" style="background-color:var(--n-color);width:100%;">Submit
            </NButton>
          </template>
        </NSpace>
      </template>
    </NCard>
  </NModal>
</template>
  
<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue';
import { NModal, NCard, NText, NInput, NSpace, NButton, NAlert, NIcon, NSpin, NSkeleton, useMessage } from 'naive-ui';
import { Close as IconClose } from '@vicons/ionicons5';
import { ethers } from 'ethers';
import { ApiManager } from '@/web3/api';
import { StakeNodeApi } from '@/web3/api/stake-node';
import { ERC20Api } from '@/web3/api/erc20';
import { useETHUserStore } from '@/stores/eth-user';

export default defineComponent({
  name: 'unstake',
  components: { NModal, NCard, NText, NInput, NSpace, NButton, NAlert, NIcon, NSpin, NSkeleton, IconClose },
  props: {
    visible: { type: Boolean, default: false },
    nodeId: { type: String, default: false },
    stakeContract: { type: String, default: false },
    tokenContract: { type: String, default: false },
  },
  emits: ['update:visible', 'success',],
  setup(props, ctx) {
    const message = useMessage();
    const ethUserStore = useETHUserStore();
    const apiManager = ApiManager.getInstance();
    let stakeNodeApi: StakeNodeApi | null = null;
    let tokenApi: ERC20Api | null = null;
    const error = ref(-1);
    const errorText = ref('');
    const inputTokenAmount = ref('');
    const tokenDecimal = ref(0);
    const tokenName = ref('');
    const tokenSymbol = ref('');
    const stakeTokenBalance = ref<bigint>(0n);
    const loadings = ref({ submit: false, info: false });

    const init = async () => {
      error.value = -1;
      errorText.value = '';
      inputTokenAmount.value = '';

      stakeNodeApi = apiManager.create<StakeNodeApi>(StakeNodeApi, { address: props.stakeContract });
      tokenApi = apiManager.create<ERC20Api>(ERC20Api, { address: props.tokenContract });

      const [
        { data: _tokenName },
        { data: _tokenSymbol },
        { data: _tokenDecimals },
      ] = await Promise.all([
        tokenApi.name(),
        tokenApi.symbol(),
        tokenApi.decimals(),
      ]);

      tokenName.value = _tokenName;
      tokenSymbol.value = _tokenSymbol;
      tokenDecimal.value = Number(_tokenDecimals);

      await initUserInfo();

      error.value = 0;
    };

    //init user balance
    const initUserInfo = async () => {
      stakeTokenBalance.value = 0n;
      if (!ethUserStore.account0) {
        return { _result: 0 };
      }
      loadings.value.info = true;
      const [
        { data: _nodeInfo },
      ] = await Promise.all([
        stakeNodeApi!.nodeInfo({ nodeId: props.nodeId }),
      ])
      const [_bindAccount, _totalStaked, _currentStaked, _totalUnstaked] = _nodeInfo || [];
      loadings.value.info = false;
      stakeTokenBalance.value = _currentStaked || 0n;

      return { _result: 0 };
    };

    const handlerSubmit = async (nodeId: string, account: string, amount: bigint) => {
      return stakeNodeApi!.withdraw({ nodeId, account, amount });
    }

    watch(
      () => [ethUserStore.account0, ethUserStore.isInvalidNetwork],
      ([account, isInvalidNetwork]) => {
        if (account || !isInvalidNetwork) {
          initUserInfo();
        }
      });


    watch(
      () => props.visible,
      (val) => {
        if (val) {
          init();
        }
      });

    return {
      error,
      errorText,
      inputTokenAmount,
      tokenSymbol,
      stakeTokenBalanceStr: computed(() => ethers.formatUnits(stakeTokenBalance.value, tokenDecimal.value)),
      ethUserStore,
      loadings,
      onPressClose() {
        ctx.emit('update:visible', false);
      },
      async onPressSubmit() {
        const nodeId = props.nodeId;
        const account = ethUserStore.account0;
        const amount = ethers.parseUnits(inputTokenAmount.value, tokenDecimal.value);
        loadings.value.submit = true;
        const resp = await handlerSubmit(nodeId, account, amount);
        loadings.value.submit = false;
        if (resp._result !== 0) {
          message.warning(resp._desc || 'Stake failed');
          return;
        }
        loadings.value.submit = true;
        await new Promise((resolve) => setTimeout(resolve, 10000));
        loadings.value.submit = false;
        ctx.emit('success');
      },
    };
  },
});
</script>
  
<style scoped></style>
  