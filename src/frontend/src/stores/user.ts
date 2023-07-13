import { ref, h } from 'vue';
import { defineStore } from 'pinia';
import { NTag } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router';
import Utils from '@/tools/utils';
import { sendTelegram } from '@/tools/send';

export const useUserStore = defineStore('user', () => {
  return {
    loginIC() {},
    async test() {},
  };
});
