<template>
  <NSpace vertical :wrap-item="false" :size="[0, 16]">
    <template v-for="item in providers">
      <NSpace
        align="center"
        :wrap-item="false"
        :size="[16, 0]"
        style="border: solid 1px var(--n-border-color); padding: 16px"
        @click="onPressConnect(item)"
      >
        <img style="width: 48px; height: 48px; object-fit: contain" :src="item.meta.icon.dark" />
        <NSpace vertical :wrap-item="false" :size="[0, 8]">
          <NText style="font-size: 16px">{{ item.meta.name }}</NText>
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
