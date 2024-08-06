<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-cell">
        <img class="footer-logo" />
        <div class="footer-text">
          2023-2024 EMC FOUNDATION. All Rights Reserved.
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
  background-color: linear-gradient(148.85deg, #141318 22%, rgba(14, 15, 21, 0.7) 82%);
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
  width: 164px;
  height: auto;
  content: url('@/assets/logo.png');
}

.footer-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  gap: 24px 0;
}

.footer-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
  color: #898B95;
  font-weight: 400;
}

.footer-socials {
  display: flex;
  align-items: center;
  gap: 0 20px;
}

.social-icon {
  width: 40px;
  height: 40px;
}

@media (min-width: 640px) {

  .footer-logo {
    width: 200px;
  }

  .footer-content {
    min-width: var(--screen-min-width);
    max-width: var(--screen-max-width);
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .footer-cell {
    align-items: flex-start;
    gap: 34px 0;
  }

  .footer-text {
    align-items: flex-start;
  }

  .footer-socials {
    display: flex;
    align-items: center;
    gap: 0 24px;
  }

  .social-icon {
    width: 48px;
    height: 48px;
  }

}
</style>
