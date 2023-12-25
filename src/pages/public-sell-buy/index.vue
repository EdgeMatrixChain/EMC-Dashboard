<template>
  <div class="page">
    <NSpace vertical :wrap-item="false" align="center" :size="[16, 16]">
      <NCard title="Public Sell" style="max-width:640px;">
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
          <Buy :sell-contract="publicSellContract" :token-contract="tokenContract" :fund-contract="fundContract" />
        </template>
      </NCard>
    </NSpace>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import {
  NSpace,
  NCard,
  NText,
  NButton,
  NSpin,
  useMessage,
} from 'naive-ui';
import { RefreshSharp as IconRefresh } from '@vicons/ionicons5';
import { useRoute } from 'vue-router';
import { ApiManager } from '@/web3/api';
import { useETHUserStore } from '@/stores/eth-user';
import { PublicSellApi } from '@/web3/api/public-sell';
import { StakeLockApi } from '@/web3/api/stake-lock';
import Buy from './buy/index.vue';


export default defineComponent({
  name: 'public-sell',
  components: {
    NSpace,
    NCard,
    NText,
    NButton,
    NSpin,
    IconRefresh,
    Buy,
  },
  setup() {
    const message = useMessage();
    const route = useRoute();
    const ethUserStore = useETHUserStore();
    const error = ref(-1);
    const errorText = ref('');
    const publicSellContract = ref('');
    const fundContract = ref('');
    const tokenContract = ref('');
    const stakeLockContract = ref('');
    const apiManager = ApiManager.getInstance();
    let publicSellApi: PublicSellApi | null = null;
    let stakeLockApi: StakeLockApi | null = null;

    onMounted(() => {
      publicSellContract.value = (route.query?.contract as string) || '0x0B41968E3B98feFFF433cF780245D0A16C0a69fE';
      init();
    });

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
      error.value = 0;
    };

    return {
      error,
      errorText,
      isSign: computed(() => ethUserStore.account0),
      chainId: computed(() => ethUserStore.chainId),
      publicSellContract,
      fundContract,
      tokenContract,
      onPressTry() {
        init();
      }
    };
  },
});
</script>

<style scoped></style>
