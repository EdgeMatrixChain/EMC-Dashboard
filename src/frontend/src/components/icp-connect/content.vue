<template>
  <NSpace vertical :wrap-item="false" :size="[0, 28]">
    <template v-for="item in providers">
      <NSpace class="wallet-border" align="center" justify="center" :wrap-item="false">
        <NSpace class="wallet-content w-full h-full cursor-pointer" align="center" justify="center" :wrap-item="false" :size="[20, 0]" :style="{ backgroundColor: bgColor }" @click="onPressConnect(item)">
          <img style="width: 48px; height: 48px; object-fit: contain" :src="item.meta.icon.dark" />
          <NSpace vertical :wrap-item="false" :size="[0, 8]">
            <NText class="text-[18px] leading-[18px] text-white">{{ item.meta.name }}</NText>
          </NSpace>
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

<style scoped>
.wallet-border {
  position: relative;
  height: 72px;
  border-radius: 8px;
  background-image: linear-gradient(to right, #4142f1, #0adac3, #d356f3, #f47e63, #4142f1);
  background-size: 400%;
  animation: border 12s linear infinite;
  z-index: 1;
  box-sizing: border-box;
}
.wallet-content {
  border-radius: 6px;
  padding: 10px;
}

.wallet-border:hover {
  padding: 2px;
}

@keyframes border {
  100% {
    background-position: -400% 0;
  }
}
</style>
