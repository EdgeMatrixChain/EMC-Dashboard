<template>
  <template v-if="isLoading">
    <div class="sider-loading">
      <n-spin size="large" />
    </div>
  </template>
  <NSpace class="sider-header" vertical align="center" justify="center" :size="[4, 4]">
    <img class="sider-header-icon" />
    <div class="sider-header-name" @click="onPressLogin">User Name</div>
  </NSpace>
  <n-menu
    :value="currentMenu"
    :default-expand-all="true"
    :options="siderMenus"
    :indent="16"
    :accordion="true"
    :watch-props="['defaultExpandedKeys']"
    @update:value="handleUpdateValue"
  />
</template>
<script lang="ts">
import { ref, defineComponent, h, computed, watch } from 'vue';
import { NButton, NSpin, NSpace, NMenu, NCard, NTag, NModal, useMessage } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router';
import { useSiderStore } from '@/stores/sider';
import { useLogin } from '@/composables/use-login';

export default defineComponent({
  components: { NButton, NSpin, NSpace, NMenu, NCard, NTag, NModal },
  setup() {
    const message = useMessage();
    const siderStore = useSiderStore();
    const siderMenus = computed(() => siderStore.siderMenus);
    const currentMenu = ref('');

    const isLoading = ref(false);

    const router = useRouter();
    const route = useRoute();

    const { loginIC } = useLogin();

    watch(
      () => route.path,
      (path, oldVal) => {
        currentMenu.value = path;
      },
      { immediate: true }
    );

    return {
      currentMenu,
      siderMenus,
      isLoading,
      onPressLogin() {
        loginIC();
      },
      handleUpdateValue(key: string, item: MenuOption) {
        // console.info(key);
        // message.info('[onUpdate:value]: ' + JSON.stringify(key));
        // message.info('[onUpdate:value]: ' + JSON.stringify(item));
      },
    };
  },
});
</script>
<style scoped>
.sider-loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
}
.sider-header {
  height: 128px;
}
.sider-header-icon {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 100%;
  margin-bottom: 8px;
  content: url('@/assets/logo.png');
}
.sider-header-name {
  font-size: 16px;
  font-weight: 600;
}

@media (prefers-color-scheme: light) {
  .sider-header-icon {
    content: url('@/assets/logo.light.png');
  }
}
</style>
@/composables/use-login
