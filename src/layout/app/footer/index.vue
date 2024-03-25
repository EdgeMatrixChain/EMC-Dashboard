<template>
  <NSpace class="footer" align="center" justify="space-between" :size="[0, 16]" :wrap-item="false">
    <NSpace class="footer-cell" align="center" :wrap-item="false" :size="[0, 0]" :wrap="false">
      <img class="footer-logo" />
      <NSpace vertical :size="[0, 8]" :wrap-item="false" :wrap="false">
        <NText class="text-[14px]" depth="3">2023-2024 EMC FOUNDATION. </NText>
        <NText class="text-[12px]" depth="3">All Rights Reserved.</NText>
      </NSpace>
    </NSpace>
    <NSpace class="footer-cell" align="center" :size="[16, 0]" :wrap-item="false" :wrap="false">
      <a href="https://medium.com/@EMCProtocol" target="_blank">
        <img class="social-icon" src="@/assets/icon_medium.png" />
      </a>
      <a href="https://discord.gg/qg6QXBqB7r" target="_blank">
        <img class="social-icon" src="@/assets/icon_discord.png" />
      </a>
      <a href="https://t.me/emc_network" target="_blank">
        <img class="social-icon" src="@/assets/icon_telegram.png" />
      </a>
      <a href="https://twitter.com/EMCprotocol" target="_blank">
        <img class="social-icon" src="@/assets/icon_x.png" />
      </a>
      <a href="https://github.com/EMCProtocol-dev" target="_blank">
        <img class="social-icon" src="@/assets/icon_github.png" />
      </a>
    </NSpace>
  </NSpace>
</template>
<script lang="ts" setup>
import { NSpace, NText } from 'naive-ui';
</script>
<style scoped>
.footer {
  height: var(--footer-height);
  padding: 16px 0;
}

.footer-cell {
  position: relative;
  padding: 0 32px;
}

.footer-logo {
  width: 56px;
  object-fit: contain;
  content: url('@/assets/logo.outline.svg');
  margin-right: 40px;
}

.social-icon {
  width: 20px;
  height: 20px;
}
@media (prefers-color-scheme: light) {
  .footer-logo {
    /* content: url('@/assets/logo.light.png'); */
    content: url('@/assets/logo.outline.svg');
  }
}

@media screen and (max-width: 1280px) {
  .footer-cell {
    padding: 0 16px;
  }

  .footer-logo {
    margin-right: 16px;
    height: 40px;
    width: 40px;
  }
}
</style>
