<template>
  <div class="page home-page relative">
    <div v-show="$route.name === 'home'" class="home-bg xs:hidden">
      <div class="home-bg-overlay"></div>
    </div>
    <!-- <div class="emc-top-bg absolute top-0 left-0">
        <img class="w-[38%] h-auto emc-select-none" src="/src/assets/images/home-left.png"
          alt="">
        <img class="w-[24%] h-auto emc-select-none"
          src="/src/assets/images/home-right.png" alt="">
      </div> -->
    <div class="body">
      <div class="section">
        <div
          class="grid grid-cols-2 sm:mt-[80px] sm:mb-[60px] sm:grid-cols-4 gap-[16px] sm:gap-x-[24px] sm:gap-y-[60px]">
          <div class="grid-cols-1">
            <NumericBlocks :size="numericSize" />
          </div>
          <div class="grid-cols-1">
            <NumericApiTxs :size="numericSize" />
          </div>
          <div class="grid-cols-1">
            <NumericTaskPending :size="numericSize" />
          </div>
          <div class="grid-cols-1">
            <NumericCredits :size="numericSize" />
          </div>
          <div class="grid-cols-1">
            <NumericNodeComputing :size="numericSize" />
          </div>
          <div class="grid-cols-1">
            <NumericGPU :size="numericSize" />
          </div>
          <div class="grid-cols-1">
            <NumericCPU :size="numericSize" />
          </div>
          <div class="grid-cols-1">
            <NumericMemory :size="numericSize" />
          </div>
        </div>
      </div>
      <div class="section">
        <WorldMap :data="mapData" />
      </div>
      <div class="section ">
        <div class="sm:mt-[60px] xs:!mt-[20px]">
          <TokenomicsAll />
        </div>
      </div>
      <div class="section">
        <TokenomicsArb class="mt-[20px]" />
      </div>
      <div class="section">
        <TokenomicsSol class="mt-[20px]" />
      </div>
      <!-- tokens -->
      <div class="section">
        <div class="token-container mt-[20px]">
          <div class="token-pie-container">
            <TokenDistribution />
          </div>
          <div class="token-container-divider"></div>
          <div class="token-numeric-container">
            <Dan />
          </div>
        </div>
      </div>
      <div class="section">
        <NodeReward class="mt-[20px] xs:mb-[60px] sm:mb-[80px]" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useIsMobile } from '@/composables/use-screen';
import WorldMap from './world-map/index.vue';
import TokenDistribution from './token-distribution/index.vue';
import TokenomicsAll from './tokenomics-all/index.vue';
import TokenomicsArb from './tokenomics-arb/index.vue';
import TokenomicsSol from './tokenomics-sol/index.vue';
import Dan from './dan/index.vue';
import NodeReward from './node-reward/index.vue';
import { getMapNodes } from '@/apis';

import NumericBlocks from './numeric/blocks.vue';
import NumericApiTxs from './numeric/api-txs.vue';
import NumericTaskPending from './numeric/task-pending.vue';
import NumericCredits from './numeric/credits.vue';

import NumericNodeComputing from './numeric/node-computing.vue';
import NumericGPU from './numeric/gpus.vue';
import NumericCPU from './numeric/cpus.vue';
import NumericMemory from './numeric/memories.vue';

const isMobile = useIsMobile();
const numericSize = computed(() => (isMobile.value ? 'small' : 'large'));
const mapData = ref<any[]>([]);

const headerStyle = ref<any>({ 'background-color': 'rgba(24, 24, 28, 0.4)' });
function handleScroll() {
  if (window.scrollY > 80) {
    headerStyle.value['background-color'] = 'rgba(24, 24, 28, 1)';
  } else {
    headerStyle.value['background-color'] = 'rgba(24, 24, 28, 0.4)';
  }
}
function calculateRadius(nodeCount: number, maxRadius: number) {
  const base = 100;
  const radius = (maxRadius * Math.log(nodeCount + 1)) / Math.log(nodeCount + base);
  return parseFloat(Math.min(radius, maxRadius).toFixed(2));
}

onMounted(async () => {
  const { list, summary } = await getMapNodes();
  const formatList: any[] = [];

  list.forEach((item: any) => {
    const size = calculateRadius(item.nodes, 100);
    formatList.push({
      name: item.nodes,
      value: [item.longitude, item.latitude],
      symbolSize: size,
    });
  });

  mapData.value = formatList;
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.home-bg {
  /* display: block; */
  position: absolute;
  z-index: -2;
  left: 50%;
  /* top: var(--header-height); */
  top: 0;
  width: 664px;
  height: 664px;
  transform: translateX(-50%);
  background-image: url(/src/assets/images/home.gif);
  background-size: 100%;
  opacity: 0.7;
  /* background-color: #030003; */
}

.home-bg-overlay {
  position: absolute;
  width: 80vw;
  height: 200px;
  border-radius: 100%;
  left: 50%;
  top: 220px;
  transform: translate(-50%, 0);
  background-image: linear-gradient(180deg, rgba(255, 174, 223, 0.3744) 12.31%, rgba(19, 0, 94, 0.1924) 64.89%);
  filter: blur(80px);
  opacity: 0.4;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  transition: background-color 0.3s;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 32px 0;
}

.footer {
  width: 100%;
  z-index: 1;
  background-color: linear-gradient(148.85deg, #141318 22%, rgba(14, 15, 21, 0.7) 82%);
}

.section {
  width: 100%;
  margin: auto;
}

.token-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 60px 0;
}

.token-pie-container {
  width: 100%;
  box-sizing: border-box;
}

.token-numeric-container {
  width: 100%;
  box-sizing: border-box;
}

.token-container-divider {
  position: relative;
  width: 48px;
  display: none;
}

.token-container-divider::after {
  content: '';
  display: block;
  height: 100%;
  width: 1px;
  left: 50%;
  top: 48px;
  bottom: 0;
  position: absolute;
  /* background-image: linear-gradient(180deg, rgba(127, 58, 185, 0) 0%, #391a53 50%, rgba(127, 58, 185, 0) 80%); */
}

@media (min-width: 640px) {
  .body {
    gap: 40px 0;
  }

  .section {
    max-width: var(--screen-max-width);
    min-width: var(--screen-min-width);
  }

  .token-container {
    flex-direction: row;
    gap: 0;
  }

  .token-container-divider {
    display: block;
  }

  .token-pie-container {
    width: 420px;
  }

  .token-numeric-container {
    flex: 1;
    width: 0;
  }
}
</style>
