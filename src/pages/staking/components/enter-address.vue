<template>
  <NModal :show="visible" :mask-closable="false" :block-scroll="false">
    <NCard
      class="w-[550px] rounded-[24px]"
      title="Enter Address"
      closable
      @close="onPressClose"
      style="background-color: #111318; padding: 12px 6px 12px 16px"
      header-style="font-size:24px;line-height:24px"
    >
      <NSpace class="w-[398px] pt-[40px] pb-[18px] mx-auto" vertical :wrap-item="false" align="center" :size="[0, 32]">
        <NSpace :wrap-item="false" align="center" :size="[0, 12]">
          <input
            class="w-full h-10 leading-10 px-[16px] rounded-[4px] text-center border-[2px] border-[#33363f] bg-[#1E2129] text-white/80 text-[14px] font-normal outline-none"
            autofocus
            v-model="inputValue"
            type="text"
          />
          <NCheckbox class="checkbox" v-model:checked="disabled" style="margin-right: 12px">
            <span style="color: #d43232"
              >I know after the staking ends, only the address owner can withdraw all EMC and other earnings. Please ensure all the information is
              correct.</span
            ></NCheckbox
          >
        </NSpace>
        <NButton class="rounded-lg text-white" :disabled="!disabled" text-color="#fff" size="large" type="primary" bordered strong @click="onPressConfrim">
          Confirm
        </NButton>
      </NSpace>
    </NCard>
  </NModal>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
import { NModal, NCheckbox, NCard, NButton, NSpace, useMessage } from 'naive-ui';
import { useETHUserStore } from '@/stores/eth-user';
import { ethers } from 'ethers';

export default defineComponent({
  name: 'icp-connect-dialog',
  components: { NModal, NCard, NCheckbox, NButton, NSpace },
  props: {
    visible: { type: Boolean, defalt: false },
    address: { type: String, defalt: '' },
  },
  emits: ['update:visible', 'update:address'],
  setup(props, ctx) {
    const inputValue = ref('');
    const disabled = ref(false);
    const useETHUser = useETHUserStore();
    const message = useMessage();

    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          inputValue.value = props.address as string;
          if (props.address === useETHUser.account0) {
            disabled.value = true;
          }
        }
      },
      { immediate: true }
    );
    watch(
      () => inputValue.value,
      (value) => {
        if (value === useETHUser.account0) {
          disabled.value = true;
        } else {
          disabled.value = false;
        }
      }
    );
    return {
      disabled,
      inputValue,
      onPressClose() {
        disabled.value = false;
        ctx.emit('update:visible', false);
      },
      onPressConfrim() {
        if (!ethers.isAddress(inputValue.value)) {
          message.warning('Please enter the valid address');
          return;
        }
        disabled.value = false;
        ctx.emit('update:address', inputValue.value);
        ctx.emit('update:visible', false);
      },
    };
  },
});
</script>

<style scoped>
.checkbox :deep(.n-checkbox-box) {
  background-color: #5a1ddd;
}
.checkbox :deep(.n-checkbox-icon .check-icon) {
  fill: #fff;
}

.checkbox :deep(.n-checkbox-box .n-checkbox-box__border) {
  border: 1px solid #5a1ddd;
}
</style>
