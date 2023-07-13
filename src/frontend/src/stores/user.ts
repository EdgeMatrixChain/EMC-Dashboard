import { ref, h } from 'vue';
import { defineStore } from 'pinia';
import { NTag } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { RouterLink } from 'vue-router';
import Utils from '@/tools/utils';
import { sendTelegram } from '@/tools/send';

// import { createActor } from '@/tools/actor';
// import { idlFactory } from '@/dids/xb3xh-uaaaa-aaaam-abi3a-cai.did';

import { HttpAgent, Identity } from '@dfinity/agent';
import type { Agent } from '@dfinity/agent';
export const useUserStore = defineStore('user', () => {
  return {
    loginIC() {},
    async test() {
      const agent: Agent = new HttpAgent({
        host: 'https://boundary.ic0.app/',
      });
      // const rootKey = await agent.fetchRootKey();
      // console.info(rootKey);
      const actor = createActor('xb3xh-uaaaa-aaaam-abi3a-cai', idlFactory, { agent });
      const resp = await actor.greet('hello vue');
      return resp;
    },
  };
});
