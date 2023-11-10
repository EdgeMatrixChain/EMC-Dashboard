<template>
  <NSpace vertical :wrap-item="false" :size="[0, 20]">
    <template v-for="item in providers">
      <NSpace class="cursor-pointer" align="center" justify="center" :wrap-item="false" :size="[20, 0]" :style="{ padding: ' 12px', borderRadius: '8px', backgroundColor: bgColor }" @click="onPressConnect(item)">
        <img style="width: 48px; height: 48px; object-fit: contain" :src="item.meta.icon.dark" />
        <NSpace vertical :wrap-item="false" :size="[0, 8]">
          <NText class="text-[18px] leading-[18px] text-white">{{ item.meta.name }}</NText>
        </NSpace>
      </NSpace>
    </template>
  </NSpace>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import { NSpace, NText } from 'naive-ui';
export default defineComponent({
  name: 'icp-connect',
  components: { NSpace, NText },
  props: {
    bgColor: { type: String, default: '' },
  },
  emits: ['success'],

  setup(props, context) {
    const { providers, connect } = useUserStore();

    return {
      providers,
      onPressConnect(provider: any) {
        connect(provider);
      },
    };
  },
});
</script>

<style scoped></style>
