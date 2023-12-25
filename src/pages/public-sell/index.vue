<template>
  <div class="page">
    <NSpace vertical :wrap-item="false" align="center" :size="[16, 16]">
      <NCard title="Public Sell">
        <template v-if="!ready">
          <NSpace align="center" justify="center" :wrap-item="false" :size="[16, 16]" style="min-height: 240px">
            <NSpin />
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
import { ApiManager } from '@/web3/api';
import { ethers } from 'ethers';
import { useETHUserStore } from '@/stores/eth-user';
import { PublicSellApi } from '@/web3/api/public-sell';
import { StakeLockApi } from '@/web3/api/stake-lock';
import { ERC20Api } from '@/web3/api/erc20';
import Buy from './buy/index.vue';


export default defineComponent({
  name: 'public-sell',
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
    Buy,
  },
  setup() {
    const message = useMessage();
    const route = useRoute();
    const ethUserStore = useETHUserStore();
    const ready = ref(false);
    const publicSellContract = ref('');
    const fundContract = ref('');
    const tokenContract = ref('');
    const stakeLockContract = ref('');
    const apiManager = ApiManager.getInstance();
    let publicSellApi: PublicSellApi | null = null;
    let stakeLockApi: StakeLockApi | null = null;

    onMounted(() => {
      publicSellContract.value = (route.params?.contract as string) || '0x0B41968E3B98feFFF433cF780245D0A16C0a69fE';
      init();
    });

    const init = async () => {
      ready.value = false;
      publicSellApi = apiManager.create(PublicSellApi, { address: publicSellContract.value });
      const [{ data: _fundContract }, { data: _tokenContract }, { data: _stakeLockContract }] = await Promise.all([
        publicSellApi.fundToken(),
        publicSellApi.token(),
        publicSellApi.releaseContract(),
      ]);
      fundContract.value = _fundContract;
      tokenContract.value = _tokenContract;
      stakeLockContract.value = _stakeLockContract;
      stakeLockApi = apiManager.create(StakeLockApi, { address: stakeLockContract.value });
      ready.value = true;
    };

    return {
      ready,
      isSign: computed(() => ethUserStore.account0),
      chainId: computed(() => ethUserStore.chainId),
      publicSellContract,
      fundContract,
      tokenContract,
    };
  },
});
</script>

<style scoped></style>
