<template>
  <n-config-provider :theme="theme">
    <!-- <n-theme-editor> </n-theme-editor> -->
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <App />
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
    <n-global-style />
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NGlobalStyle,
  NThemeEditor,
  darkTheme,
} from 'naive-ui';

// import { useRouter, useRoute } from 'vue-router';
// import { initRouter, siteSetup } from './store'
import App from './App.vue';
export default defineComponent({
  name: 'AppSetup',
  components: {
    NConfigProvider,
    NLoadingBarProvider,
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
    NGlobalStyle,
    NThemeEditor,
    App,
  },
  setup() {
    const theme = ref(window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : null);

    const lightThemeOverrides = {
      common: {
        // primaryColor: '#000000',
      },
    };
    
    const darkThemeOverrides = {
      common: {
        // primaryColor: '#FFFF00',
      },
    };

    return { theme, lightThemeOverrides, darkThemeOverrides };
  },
});
</script>
