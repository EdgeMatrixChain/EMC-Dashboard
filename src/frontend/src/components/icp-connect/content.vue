<template>
  <NSpace class="w-full" vertical :wrap-item="false" :size="[0, 32]">
    <template v-for="item in providers">
      <NSpace class="item-border w-full overflow-hidden rounded" align="center" justify="center" :wrap-item="false">
        <NSpace class="realtive w-full h-full bg-[#13262F] cursor-pointer" align="center" justify="center" :wrap-item="false" :size="[20, 0]" :style="{ backgroundColor: bgColor }" @click="onPressConnect(item)">
          <img style="width: 44px; height: 44px; object-fit: contain" :src="item.meta.icon.dark" />
          <NSpace vertical :wrap-item="false" :size="[0, 8]">
            <NText class="text-[18px] leading-[18px] text-white">{{ item.meta.name }}</NText>
          </NSpace>
          <NSpace class="absolute top-0 right-0 py-[2px] px-4 rounded-bl bg-[#FA904F]" :wrap-item="false" align="center" justify="center" v-if="item.meta.name === 'Plug Wallet'">
            <img class="w-5 h-5" src="@/assets/icon_recommend.svg" />
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
.item-border {
  position: relative;
  height: 72px;
  background-image: linear-gradient(to right, #4142f1, #0adac3, #d356f3, #f47e63, #4142f1);
  background-size: 400%;
  animation: border 12s linear infinite;
  z-index: 1;
  box-sizing: border-box;
  border: 2px solid;
  border-color: #4248a7;
}

.item-border:hover {
  border-color: transparent;
}

@keyframes border {
  100% {
    background-position: -400% 0;
  }
}
</style>
