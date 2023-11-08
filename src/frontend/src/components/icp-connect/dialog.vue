<template>
  <NModal :show="visible" :mask-closable="false">
    <NCard title="Connect" style="width: 100%; max-width: 600px">
      <template #header-extra>
        <NButton quaternary circle @click="onPressClose">
          <template #icon>
            <NIcon><IconClose /></NIcon>
          </template>
        </NButton>
      </template>
      <Content />
    </NCard>
  </NModal>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { NModal, NCard, NButton, NIcon } from 'naive-ui';
import { CopyOutline as IconClose } from '@vicons/ionicons5';
import Content from './content.vue';
export default defineComponent({
  name: 'icp-connect-dialog',
  components: { NModal, NCard, NButton, NIcon, Content, IconClose },
  props: {
    visible: { type: Boolean },
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
