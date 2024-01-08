<template>
  <NModal :show="visible" :block-scroll="false" :mask-closable="false">
    <NCard style="max-width: 640px;">
      <NSpace vertical :wrap-item="false" :size="[0, 16]">
        <NAlert :title="title" type="success">
          <NText>{{ message }}</NText>
        </NAlert>
        <NButton @click="onPressClose">Close</NButton>
      </NSpace>
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
  name: 'check-out-success',
  components: { NModal, NCard, NText, NInput, NSpace, NButton, NAlert, NIcon, NSpin, NSkeleton, IconClose },
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: '' },
    message: { type: String, default: '' },
  },
  emits: ['update:visible', 'success',],
  setup(props, ctx) {
    return {
      onPressClose() {
        ctx.emit('update:visible', false);
      },
    }
  }
});
</script>
  
<style scoped></style>
  