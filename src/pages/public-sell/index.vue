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
        <NCard title="Public Sell" style="max-width:800px;">
          <template #header>
            <NSpace align="center" justify="space-between" :wrap-item="false" :size="[4, 4]">
              <NText>About Address</NText>
            </NSpace>
          </template>
          <NSpace vertical justify="center" :wrap-item="false" :size="[16, 16]">
            <NInput v-model:value="inputAccount" size="large" round placeholder="Address" style="width:100%;">
              <template #suffix>
                <NButton type="primary" strong quaternary circle @click="onPressSearch">
                  <NIcon size="24">
                    <IconRefresh />
                  </NIcon>
                </NButton>
              </template>
            </NInput>
            <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
              <NText depth="3" style="font-size:16px">The balance of the current stake</NText>
              <NText>{{ currentStakedStr }} EMC</NText>
            </NSpace>
            <NSpace vertical justify="center" :wrap-item="false" :size="[16, 4]">
              <NText depth="3" style="font-size:16px">The amount that can be withdrawn</NText>
              <NText>{{ currentClaimStr }} EMC</NText>
            </NSpace>
            <NButton type="primary" strong size="large" round @click="onPressClaim"
              style="background-color:var(--n-color);width:100%;">Claim</NButton>
          </NSpace>
        </NCard>
        <NCard title="About Contract" style="max-width:800px;">
          <NButton type="primary" strong size="large" round @click="onPressBuy"
            style="background-color:var(--n-color);width:100%;">
            Buy</NButton>
        </NCard>
      </NSpace>
    </template>


  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import {
  NSpace,
  NCard,
  NText,
  NInput,
  NButton,
  NIcon,
  NSpin,
  useMessage,
} from 'naive-ui';
import { SearchSharp as IconRefresh } from '@vicons/ionicons5';
import { useRoute, useRouter } from 'vue-router';
import { ethers } from 'ethers';
import { ApiManager } from '@/web3/api';
import { useETHUserStore } from '@/stores/eth-user';
import { PublicSellApi } from '@/web3/api/public-sell';
import { StakeLockApi } from '@/web3/api/stake-lock';

export default defineComponent({
  name: 'public-sell',
  components: {
    NSpace,
    NCard,
    NText,
    NInput,
    NButton,
    NIcon,
    NSpin,
    IconRefresh,
  },
  setup() {
    const message = useMessage();
    const route = useRoute();
    const router = useRouter();
    const ethUserStore = useETHUserStore();
    const error = ref(-1);
    const errorText = ref('');
    const publicSellContract = ref('');
    const fundContract = ref('');
    const tokenContract = ref('');
    const stakeLockContract = ref('');
    const inputAccount = ref('');
    const currentAccount = ref('');
    const currentStaked = ref(0n);
    const currentClaim = ref(0n);

    const apiManager = ApiManager.getInstance();
    let publicSellApi: PublicSellApi | null = null;
    let stakeLockApi: StakeLockApi | null = null;

    onMounted(() => {
      publicSellContract.value = (route.query?.contract as string) || '0x0B41968E3B98feFFF433cF780245D0A16C0a69fE';
      init();
    });

    const initUserInfo = async (account: string) => {
      const { data: _currentStaked } = await stakeLockApi!.getLockedAmount({ account });
      const { data: _currentClaim } = await stakeLockApi!.getReleasableAmount({ account });
      currentStaked.value = _currentStaked || 0n;
      currentClaim.value = _currentClaim || 0n;
      currentAccount.value = account;
    }

    const init = async () => {
      error.value = -1;
      publicSellApi = apiManager.create(PublicSellApi, { address: publicSellContract.value });
      const [{ data: _fundContract }, { data: _tokenContract }, { data: _stakeLockContract }] = await Promise.all([
        publicSellApi.fundToken(),
        publicSellApi.token(),
        publicSellApi.releaseContract(),
      ]);
      if (!_fundContract || !_tokenContract || !_stakeLockContract) {
        error.value = 1;
        errorText.value = 'Network error';
        return;
      }
      fundContract.value = _fundContract;
      tokenContract.value = _tokenContract;
      stakeLockContract.value = _stakeLockContract;
      stakeLockApi = apiManager.create(StakeLockApi, { address: stakeLockContract.value });
      if (ethUserStore.account0) {
        initUserInfo(ethUserStore.account0);
        inputAccount.value = ethUserStore.account0;
      }
      error.value = 0;
    };

    watch(() => ethUserStore.account0, (value) => {
      if (value) {
        if (!currentAccount.value) {
          initUserInfo(value);
          inputAccount.value = value;
        }
      }
    })

    return {
      error,
      errorText,
      isSign: computed(() => ethUserStore.account0),
      chainId: computed(() => ethUserStore.chainId),
      publicSellContract,
      fundContract,
      tokenContract,
      inputAccount,
      currentAccount,
      currentStakedStr: computed(() => ethers.formatUnits(currentStaked.value, 18)),
      currentClaimStr: computed(() => ethers.formatUnits(currentClaim.value, 18)),
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
      onPressBuy() {
        router.push({ name: 'public-sell-buy', query: { contract: publicSellContract.value } });
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
