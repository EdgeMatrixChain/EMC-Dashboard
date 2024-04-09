<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <!-- <n-theme-editor> -->
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-dialog-provider>
            <AppWalletConnectProvider>
              <App />
            </AppWalletConnectProvider>
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
    <!-- </n-theme-editor> -->
    <n-global-style />
  </n-config-provider>
</template>

<script lang="ts" setup>
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
import AppWalletConnectProvider from './AppWalletConnectProvider';
import CustomThemeDark from './theme-dark';
import App from './App.vue';
//const theme = ref(window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : null);
const theme = darkTheme;
const lightThemeOverrides = CustomThemeDark;
const darkThemeOverrides = CustomThemeDark;
const themeOverrides = ref(window.matchMedia('(prefers-color-scheme: dark)').matches ? darkThemeOverrides : lightThemeOverrides);
</script>
