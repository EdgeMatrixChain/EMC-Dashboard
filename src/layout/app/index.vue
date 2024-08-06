<template>
  <Background>
    <div class="layout">
      <div class="n-header" :style="{...headerStyle, backgroundColor: '#030003'}">
        <Header />
      </div>
      <div class="emc-top-bg fixed">
        <img class="w-[38%] h-auto emc-select-none" src="/src/assets/images/home-left.png"
          alt="">
        <img class="w-[24%] h-auto emc-select-none"
          src="/src/assets/images/home-right.png" alt="">
      </div>
      <!-- class="xl:w-[1440px]" -->
      <div class="n-body">
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
      </div>
      <div class="n-footer">
        <Footer />
      </div>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { NSpin } from 'naive-ui';
import Header from '@/layout/app/header/index.vue';
import Footer from '@/layout/app/footer/index.vue';
import Background from '@/layout/app/bg/index.vue';
import { router } from '@/routes/index';
const ready = ref(false);
const headerStyle = ref<any>({ 'background-color': '#10142200' });
const cacheRoutes = ref<string[]>([]);
const routes = router?.options?.routes || [];
const layoutRoute = routes.find((i: any) => i.name === 'layout');
layoutRoute?.children?.forEach((i: any) => {
  if (i?.meta?.keepAlive && typeof i?.name === 'string') cacheRoutes.value.push(i.name);
});

function handleScroll() {
  if (window.scrollY > 80) {
    headerStyle.value['background-color'] = '#030003';
  } else {
    headerStyle.value['background-color'] = '#10142200';
  }
}

onMounted(async () => {
  ready.value = true;
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<style scoped>
.layout {
  position: relative;
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.n-header {
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  height: var(--header-height);
  z-index: 99;
  transition: background-color 0.3s;
  min-width: 0;
}

.n-body {
  width: 100%;
  /* margin:auto to be full height for flex-direction:column!! */
  margin: auto;
  position: relative;
  overflow: clip;
  z-index: 1;
  margin-top: calc(-1 * var(--header-height));
  padding-top: var(--header-height);
  min-height: calc(100vh - var(--footer-height));
}

.n-footer {
  position: relative;
  z-index: 1;
  background: linear-gradient(148.31deg, #141318 20.4%, rgba(14, 15, 21, 0.7) 81.18%);
}

.loading {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* for tailwindcss sm: (screen.width > 640px) */
@media (min-width: 640px) {
  .layout {
    min-width: calc(var(--screen-min-width) + 32px);
  }
}
</style>
