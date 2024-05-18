<template>
  <div class="page">
    <div class="body">
      <div class="section">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-[16px] sm:gap-[24px]">
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
      <div class="section">
        <TokenomicsAll />
      </div>
      <div class="section">
        <TokenomicsArb />
      </div>
      <div class="section">
        <TokenomicsSol />
      </div>
      <!-- tokens -->
      <div class="section">
        <div class="token-container">
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
        <NodeReward />
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
  background-color: rgba(24, 24, 28, 0.4);
}

.section {
  width: 100%;
  margin: auto;
}

.token-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 32px 0;
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
  background-image: linear-gradient(180deg, rgba(127, 58, 185, 0) 0%, #391a53 50%, rgba(127, 58, 185, 0) 80%);
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
