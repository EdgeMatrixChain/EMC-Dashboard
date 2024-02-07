<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
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
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NGlobalStyle,
  NThemeEditor,
  darkTheme,
  NConfigProvider,
} from 'naive-ui';

// import { useRouter, useRoute } from 'vue-router';
// import { initRouter, siteSetup } from './store'
import App from './App.vue';
import CustomThemeDark from './theme-dark';

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
    //const theme = ref(window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : null);
    const theme = darkTheme;
    const lightThemeOverrides = CustomThemeDark;
    const darkThemeOverrides = CustomThemeDark;
    const themeOverrides = ref(window.matchMedia('(prefers-color-scheme: dark)').matches ? darkThemeOverrides : lightThemeOverrides);

    return { theme, themeOverrides };
  },
});
</script>
