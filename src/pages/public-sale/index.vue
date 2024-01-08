<template>
  <div class="page">
    <div style="max-width:640px;margin:auto;">
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
        <Buy :sale-contract="saleContract" :token-contract="tokenContract" :fund-contract="fundContract"
          :cliffs-contract="cliffsContract" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
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
import { PublicSaleApi } from '@/web3/api/public-sale';
import { LockApi } from '@/web3/api/lock';
import Buy from './buy/index.vue';

export default defineComponent({
  name: 'public-sale',
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
    const saleContract = ref('');
    const fundContract = ref('');
    const tokenContract = ref('');
    const cliffsContract = ref('');
    const apiManager = ApiManager.getInstance();
    let publicSaleApi: PublicSaleApi | null = null;
    let lockApi: LockApi | null = null;

    onMounted(() => {
      // saleContract.value = '0x17EA72D614C47Dc4ee5d71044076500272dfBEe3';
      saleContract.value = '0x4A71EdAeDf64b29F43A6eF1F581d83bc71586D1f';
      init();
    });

    const init = async () => {
      error.value = -1;
      publicSaleApi = apiManager.create(PublicSaleApi, { address: saleContract.value });
      const [{ data: _fundContract }, { data: _tokenContract }, { data: _cliffsContract }] = await Promise.all([
        publicSaleApi.fundToken(),
        publicSaleApi.token(),
        publicSaleApi.releaseContract(),
      ]);
      if (!_fundContract || !_tokenContract || !_cliffsContract) {
        error.value = 1;
        errorText.value = 'Please switch to Arbitrum One network';
        return;
      }
      fundContract.value = _fundContract;
      tokenContract.value = _tokenContract;
      cliffsContract.value = _cliffsContract;
      lockApi = apiManager.create(LockApi, { address: cliffsContract.value });
      error.value = 0;
    };

    watch(
      () => ethUserStore.isInvalidNetwork,
      (invalid) => {
        if (invalid) {
          error.value = 1;
          errorText.value = 'Please switch to Arbitrum One network';
        } else {
          init();
        }
      }
    );

    return {
      error,
      errorText,
      isSign: computed(() => ethUserStore.account0),
      chainId: computed(() => ethUserStore.chainId),
      saleContract,
      fundContract,
      tokenContract,
      cliffsContract,
      onPressTry() {
        window.location.reload();
      }
    };
  },
});
</script>

<style scoped></style>
