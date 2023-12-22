<template>
  <NModal :show="visible" :mask-closable="false" :block-scroll="false">
    <div class="p-4 bg-[#ffffff30] rounded-xl w-[512px]" style="-webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px)">
      <NCard style="width: 100%; border-radius: 6px; overflow: hidden; padding: 36px 24px" content-style="padding:0">
        <NButton class="absolute top-5 right-5" size="tiny" quaternary circle @click="onPressClose">
          <template #icon>
            <NIcon size="26"><IconClose /></NIcon>
          </template>
        </NButton>
        <NSpace vertical align="center" :wrap-item="false" :size="[0, 16]">
          <NText class="text-[28px] leading-[28px] text-white">Connect wallet</NText>
          <NText class="text-[#C1C1C1] mb-3">Select a wallet you want to connect to EMC</NText>
          <NSpace class="w-full" align="center" justify="center" :wrap-item="false">
            <Content />
          </NSpace>
        </NSpace>
      </NCard>
    </div>
  </NModal>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { NModal, NCard, NButton, NIcon, NSpace, NText } from 'naive-ui';
import { CloseCircleOutline as IconClose } from '@vicons/ionicons5';
import Content from './content.vue';
export default defineComponent({
  name: 'icp-connect-dialog',
  components: { NModal, NCard, NButton, NIcon, NSpace, NText, Content, IconClose },
  props: {
    visible: { type: Boolean },
    chainName: { type: String },
  },
  emits: ['update:visible'],
  setup(props, ctx) {
    return {
      onPressClose() {
        ctx.emit('update:visible', false);
      },
    };
  },
});
</script>

<style scoped></style>
