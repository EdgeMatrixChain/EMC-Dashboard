<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-cell">
        <img class="footer-logo" />
        <div class="footer-text">
          <span class="footer-text-1">2023-2024 EMC FOUNDATION. </span>
          <span class="footer-text-2">All Rights Reserved.</span>
        </div>
      </div>
      <div class="footer-cell" align="center" :size="[16, 0]" :wrap-item="false" :wrap="false">
        <div class="footer-socials">
          <a href="https://medium.com/@EMCProtocol" target="_blank">
            <img class="social-icon" src="@/assets/icon_medium.png" />
          </a>
          <a href="https://discord.gg/edgematrix" target="_blank">
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
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped>
.footer {
  background-color: #101422b3;
  height: var(--footer-height);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
  box-sizing: border-box;
  min-width: 0;
  max-width: 100%;
  margin: auto;
  gap: 24px;
  height: var(--footer-height);
}

.footer-logo {
  width: 56px;
  object-fit: contain;
  content: url('@/assets/logo.outline.png');
}

.footer-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  gap: 16px 0;
}

.footer-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
}

.footer-socials {
  display: flex;
  align-items: center;
  gap: 0 8px;
}

.footer-text-1 {
  font-size: 14px;
}
.footer-text-2 {
  font-size: 14px;
}

.social-icon {
  width: 20px;
  height: 20px;
}

@media (min-width: 640px) {
  .footer-content {
    min-width: var(--screen-min-width);
    max-width: var(--screen-max-width);
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .footer-logo {
    width: 80px;
    margin-right: 40px;
  }

  .footer-cell {
    flex-direction: row;
    align-items: center;
    gap: 0;
  }

  .footer-text {
    align-items: flex-start;
  }

  .social-icon {
    width: 28px;
    height: 28px;
  }
}
</style>
