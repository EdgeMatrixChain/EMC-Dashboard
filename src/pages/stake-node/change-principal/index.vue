<template>
  <NModal :show="visible" :block-scroll="false" :mask-closable="false">
    <NCard title="Change principal" style="max-width: 640px;">
      <template #header-extra>
        <NButton strong secondary circle :disabled="isLoading" @click.stop.prevent="onPressClose">
          <template #icon>
            <IconClose />
          </template>
        </NButton>
      </template>
      <NSpace vertical :wrap-item="false" :size="[0, 16]" style="min-height:240px;">
        <NAlert title="Warning" type="warning">
          Make sure that the wallet address you entered is working!
        </NAlert>
        <NSpace vertical :wrap-item="false" :size="[0, 4]">
          <NSpace :wrap-item="false" justify="space-between">
            <NText depth="3" strong style="font-size: 16px">Principal</NText>
          </NSpace>
          <NInput v-model:value="inputAddress" placeholder=" " size="large"
            style="border-radius: 8px; background: #f5f5f5; height: 56px; line-height: 56px">
          </NInput>
        </NSpace>
        <NButton type="primary" strong size="large" round :loading="isLoading" @click="onPressSubmit"
          style="background-color:var(--n-color);width:100%;">Submit
        </NButton>
      </NSpace>
    </NCard>
  </NModal>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NModal, NCard, NText, NInput, NSpace, NButton, NAlert, NIcon, useMessage } from 'naive-ui';
import { Close as IconClose } from '@vicons/ionicons5';
import { ethers } from 'ethers';
import { Web3Service } from '@/web3';
import { useETHUserStore } from '@/stores/eth-user';
import { Http } from '@/tools/http';
export default defineComponent({
  name: 'change-register-address',
  components: { NModal, NCard, NText, NInput, NSpace, NButton, NAlert, NIcon, IconClose },
  props: {
    visible: { type: Boolean, default: false },
    nodeId: { type: String, default: false },
  },
  emits: ['update:visible', 'success',],
  setup(props, ctx) {
    const message = useMessage();
    const ethUserStore = useETHUserStore();
    const w3s = Web3Service.getInstance();
    const http = Http.getInstance();

    const inputAddress = ref('');
    const isLoading = ref(false);
    const handlerSubmit = async (principal: string) => {
      const nodeId = props.nodeId;
      const signatureRaw = `Change principal to ${principal}`;
      const resp1 = await w3s.signMessage(signatureRaw);
      if (resp1._result !== 0) {
        return resp1;
      }
      const signature = resp1.data!.signature;
      return http.postJSON({
        url: '/nodesign/update',
        data: { principal, nodeId, signatureRaw, signature },
        noAutoHint: true,
      });
    }
    return {
      inputAddress,
      isLoading,
      onPressClose() {
        ctx.emit('update:visible', false);
      },
      async onPressSubmit() {
        const principal = inputAddress.value;
        if (!ethers.isAddress(principal)) {
          message.warning('Invalid wallet address');
          return;
        }
        isLoading.value = true;
        const resp = await handlerSubmit(principal);
        isLoading.value = false;
        if (resp._result !== 0) {
          message.warning(resp._desc);
          return;
        }
        ctx.emit('success');
      },
    };
  },
});
</script>
  
<style scoped></style>
  