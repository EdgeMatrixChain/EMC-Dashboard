<template>
  <NSpace class="w-full h-full pt-12" vertical :wrap-item="false" align="center" :size="[0, 0]">
    <NText class="text-xl mb-10 leading-5 font-bold text-white">Transfer history</NText>
    <img class="w-6 h-6 absolute top-7 left-9 cursor-pointer" src="@/assets/icon_back.svg" @click="onPressBack" />
    <template v-if="false">
      <NSpace class="w-full px-4 py-5 border-t border-dashed border-gray-500" :wrap-item="false" :size="[0, 20]">
        <NSpace class="w-full" justify="space-between" align="center">
          <NText depth="3">{{ '2023.10.23 10:35' }}</NText>
          <NText depth="3">{{ '2300.13 EMC' }}</NText>
        </NSpace>
      </NSpace>
    </template>
    <template v-else>
      <NSpace class="w-full h-full" :wrap-item="false" align="center" justify="center">
        <img class="w-[208px] h-[208px] -mt-[108px]" src="@/assets/img_history_none.svg" />
      </NSpace>
    </template>
  </NSpace>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { NSpace, NText, useMessage } from 'naive-ui';
import { Principal } from '@dfinity/principal';

export default defineComponent({
  name: 'History',
  components: { NSpace, NText },
  props: {
    visible: { type: Boolean, default: false },
  },
  emits: ['cancel'],
  setup(props, context) {
    const userStore = useUserStore();

    const init = async () => {
      const resp = await userStore.getOrders();
    };

    watch(
      () => props.visible,
      (val) => {
        if (val) {
          init();
        }
      },
      { immediate: true }
    );
    return {
      onPressBack() {
        context.emit('cancel');
      },
    };
  },
});
</script>
<style scoped></style>
