<template>
  <NSpin :show="show">
    <NLayout content-style="padding-top: 84px;">
      <NLayoutHeader class="n-header bg-[#ffffff20] xl:bg-[#18181c]">
        <Header @isLoading="isLoading" />
      </NLayoutHeader>

      <NLayoutContent class="xl:w-[1440px]" style="margin: auto" content-style="margin:auto;padding: 24px;min-height:calc(100vh - 84px)">
        <template v-if="ready">
          <router-view v-slot="{ Component, route }">
            <transition name="slide-fade">
              <keep-alive :include="cacheRoutes">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </transition>
          </router-view>
        </template>
        <template v-else>
          <div class="loading">
            <n-spin size="large" />
          </div>
        </template>
      </NLayoutContent>
    </NLayout>
  </NSpin>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { NLayout, NLayoutHeader, NLayoutContent, NSpin } from 'naive-ui';
import Header from '@/layout/app/header.vue';
import { router } from '@/routes/index';

export default defineComponent({
  name: 'layout',
  components: { NLayout, NLayoutHeader, NLayoutContent, Header, NSpin },
  setup() {
    const ready = ref(false);
    const cacheRoutes = ref<string[]>([]);
    const routes = router?.options?.routes || [];
    const layoutRoute = routes.find((i: any) => i.name === 'layout');

    const show = ref(false);
    layoutRoute?.children?.forEach((i: any) => {
      if (i?.meta?.keepAlive && typeof i?.name === 'string') cacheRoutes.value.push(i.name);
    });
    console.info(`cache routes: ${cacheRoutes.value.join(', ')}`);

    onMounted(async () => {
      ready.value = true;
    });

    const isLoading = (val: boolean) => {
      show.value = val;
    };

    return {
      ready,
      cacheRoutes,
      show,
      isLoading,
    };
  },
});
</script>
<style scoped>
.loading {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.n-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 84px;
  z-index: 99;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
}
</style>
