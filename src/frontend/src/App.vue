<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useLoadingBar, useMessage, NSpin } from 'naive-ui';
import { router } from '@/routes/index';

import { Utils } from '@/tools/utils';
import axios from 'axios';

export default defineComponent({
  name: 'app',
  components: { NSpin },
  setup() {
    const ready = ref(false);
    const loadingBar = useLoadingBar();
    const message = useMessage();

    const cacheRoutes = ref<string[]>([]);
    const routes = router?.options?.routes || [];

    routes.forEach((i: any) => {
      if (i?.meta?.keepAlive && typeof i?.name === 'string') cacheRoutes.value.push(i.name);
    });

    console.info(`cache routes: ${cacheRoutes.value.join(', ')}`);

    onMounted(() => {
      window.$message = message;
      window.$loadingBar = loadingBar;
      ready.value = true;
      return new Promise((resolve, reject) => {
        // axios.get('https://api.edgematrix.pro/api/v1/noderewardtoday').then((resp) => {
        //   const data = resp.data;
        //   if (data._result !== 0) return;
        //   const reward = data.data;

        //   const newReward = [];
        //   let group: any = [];
        //   reward.forEach((item: any) => {
        //     group.push(item);
        //     if (group.length === 10) {
        //       newReward.push(group);
        //       group = [];
        //     }
        //   });
        //   if (group.length > 0) {
        //     newReward.push(group);
        //   }

        //   const timestamp = Date.now();
        //   const rewardData = {
        //     reward: newReward,
        //     timestamp: timestamp,
        //   };
        //   Utils.setLocalStorage('rewardData', rewardData);
        //   resolve(reward);
        // });
      });
    });

    return {
      ready,
      cacheRoutes,
    };
  },
});
</script>
<style scoped>
.loading {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.n-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 84px;
  z-index: 99;
}
</style>
