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
          <div v-for="(item, index) in footerIconList" :key="item.name"
            class="size-[48px] xs:size-[40px] relative group flex items-center justify-center cursor-pointer border border-solid border-[#FFFFFF1A] rounded-3xl">
            <div
              className="w-full h-full rounded-3xl absolute top-0 left-0 z-10 bg-iconHoverBg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
            <a :href="item.url" target="_blank">
              <img class="size-[28px] xs:size-[20px] relative z-20" :src="item.imgUrl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import iconTwitter from '@/assets/footer/icon_x.png'
import iconDiscord from '@/assets/footer/icon_discord.png'
import iconTelegram from '@/assets/footer/icon_telegram.png'
import iconMedium from '@/assets/footer/icon_medium.png'
import iconGithub from '@/assets/footer/icon_github.png'

const footerIconList = ref([
  {
    name: 'twitter',
    url: 'https://twitter.com/EMCprotocol',
    imgUrl: iconTwitter,
  },
  {
    name: 'discord',
    url: 'https://discord.gg/edgematrix',
    imgUrl: iconDiscord,
  },
  {
    name: 'telegram',
    url: 'https://t.me/emc_network',
    imgUrl: iconTelegram,
  },
  {
    name: 'medium',
    url: 'https://medium.com/@EMCProtocol',
    imgUrl: iconMedium,
  },
  {
    name: 'github',
    url: 'https://github.com/EMCProtocol-dev',
    imgUrl: iconGithub,
  },
])

</script>
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
  width: 20px;
  height: 20px;
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
    width: 28px;
    height: 28px;
  }

}
</style>
