<template>
  <div class="w-full flex-wrap flex gap-y-7 xl:gap-y-8">
    <template v-for="item in providers">
      <NSpace class="item-border h-[56px] xl:h-[72px] w-full overflow-hidden rounded" align="center" justify="center" :wrap-item="false">
        <NSpace class="realtive w-full h-full bg-[#13262F] cursor-pointer" align="center" justify="center" :wrap-item="false" :size="[20, 0]" :style="{ backgroundColor: bgColor }" @click="onPressConnect(item)">
          <img class="w-9 h-9 xl:w-11 xl:h-11" style="object-fit: contain" :src="item.meta.icon.dark" />
          <NSpace vertical :wrap-item="false" :size="[0, 8]">
            <NText class="xl:text-[18px] xl:leading-[18px] text-white">{{ item.meta.name }}</NText>
          </NSpace>
          <NSpace class="absolute top-0 right-0 py-[2px] px-4 rounded-bl bg-[#FA904F]" :wrap-item="false" align="center" justify="center" v-if="item.meta.name === 'Plug Wallet'">
            <img class="w-5 h-5" src="@/assets/icon_recommend.svg" />
          </NSpace>
        </NSpace>
      </NSpace>
    </template>
  </div>
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
  background-image: linear-gradient(to right, #4142f1, #0adac3, #d356f3, #f47e63, #4142f1);
  background-size: 400%;
  animation: border 12s linear infinite;
  z-index: 1;
  box-sizing: border-box;
  border: 2px solid;
  border-color: #282250;
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
