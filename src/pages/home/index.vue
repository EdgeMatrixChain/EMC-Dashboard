<template>
  <Background>
    <div class="page">
      <Header class="header" :style="headerStyle" />

      <NSpace vertical :wrap-item="false" :size="[0, 40]">
        <NSpace class="w-[100%] max-w-[1200px] m-auto" vertical :wrap-item="false" :size="[0, 24]">
          <div class="section">
            <NGrid class="grid" x-gap="48" y-gap="48" cols="400:2 800:2 1200:4" item-responsive>
              <NGridItem class="grid-item">
                <NumericBlocks />
              </NGridItem>
              <NGridItem class="grid-item">
                <NumericApiTxs />
              </NGridItem>
              <NGridItem class="grid-item">
                <NumericTaskPending />
              </NGridItem>
              <NGridItem class="grid-item">
                <NumericCredits />
              </NGridItem>

              <NGridItem class="grid-item">
                <NumericNodeComputing />
              </NGridItem>
              <NGridItem class="grid-item">
                <NumericGPU />
              </NGridItem>
              <NGridItem class="grid-item">
                <NumericCPU />
              </NGridItem>
              <NGridItem class="grid-item">
                <NumericMemory />
              </NGridItem>

              <!-- <NGridItem class="grid-item">
              <NumericNodeComputing />
            </NGridItem>
            <NGridItem class="grid-item">
              <NumericValidators />
            </NGridItem>
            <NGridItem class="grid-item">
              <NumericNodeRPC />
            </NGridItem>
            <NGridItem class="grid-item">
              <NumericNodeRelay />
            </NGridItem> -->
            </NGrid>
          </div>
        </NSpace>
        <div class="w-[100%] max-w-[1200px] m-auto">
          <WorldMap :data="mapData" />
        </div>
        <div class="w-[100%] max-w-[1200px] m-auto">
          <NSpace :wrap="false" :wrap-item="false" :size="[0, 0]">
            <div class="w-[420px]">
              <TokenDistribution />
            </div>
            <div class="divider-h w-[48px]"></div>
            <div class="flex-1 w-[0px]">
              <Tokenomics />
            </div>
          </NSpace>
        </div>
        <div class="w-[100%] max-w-[1200px] m-auto">
          <Dan />
        </div>
        <div class="w-[100%] max-w-[1200px] m-auto">
          <NodeReward />
        </div>

        <!-- <div class="section w-[100%] max-w-[1200px] m-auto">
          <div class="section-header">
            <NText class="text-[24px]" strong>EMC Tokenomics</NText>
          </div>
          <NGrid class="grid" x-gap="48" y-gap="48" cols="400:1 800:2 1200:3" item-responsive>
            <NGridItem class="grid-item">
              <NumericTokenSupply />
            </NGridItem>
            <NGridItem class="grid-item">
              <NumericTokenStaked />
            </NGridItem>
            <NGridItem class="grid-item">
              <NumericTokenBurned />
            </NGridItem>
            <NGridItem class="grid-item">
              <NumericTokenFDV />
            </NGridItem>
            <NGridItem class="grid-item">
              <NumericTokenMaketCap />
            </NGridItem>
            <NGridItem class="grid-item">
            <NumericTokenInflation />
          </NGridItem> 
          </NGrid>
        </div> -->
        <!-- <div class="section w-[100%] max-w-[1200px] m-auto">
          <div class="section-header">
            <NText class="text-[24px]" strong>Ecosystem Rewards</NText>
          </div>
          <NGrid class="grid" x-gap="48" y-gap="48" cols="400:1 800:2 1200:3" item-responsive>
            <NGridItem class="grid-item">
              <NumericNodeReward />
            </NGridItem>
          </NGrid>
        </div> -->
      </NSpace>
      <Footer class="footer" />
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { NSpace, NText, NGrid, NGridItem } from 'naive-ui';
import Header from '@/layout/app/header/index.vue';
import Footer from '@/layout/app/footer/index.vue';
import Background from './bg/index.vue';
import WorldMap from './world-map/index.vue';
import TokenDistribution from './token-distribution/index.vue';
import Tokenomics from './tokenomics/index.vue';
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

import NumericValidators from './numeric/node-validate.vue';
import NumericNodeRPC from './numeric/node-rpc.vue';
import NumericNodeRelay from './numeric/node-relay.vue';

import NumericSockets from './numeric/sockets.vue';

import NumericTokenSupply from './numeric/token-supply.vue';
import NumericTokenStaked from './numeric/token-staked.vue';
import NumericTokenBurned from './numeric/token-burned.vue';
import NumericTokenFDV from './numeric/token-fdv.vue';
import NumericTokenMaketCap from './numeric/token-maket-cap.vue';
import NumericTokenInflation from './numeric/token-inflation.vue';

import NumericNodeReward from './numeric/node-reward.vue';

const mapData = ref<any[]>([]);
const headerStyle = ref<any>({ 'background-color': 'rgba(24, 24, 28, 0.4)' });
function handleScroll() {
  // rgba(24, 24, 28) 与 bg-color1 一致
  if (window.scrollY > 80) {
    headerStyle.value['background-color'] = 'rgba(24, 24, 28, 1)';
  } else {
    headerStyle.value['background-color'] = 'rgba(24, 24, 28, 0.4)';
  }
}

onMounted(async () => {
  const list = await getMapNodes();
  const formatList: any[] = [];
  let totalBefore = 0;
  let total = 0;
  list.forEach((item: any) => {
    totalBefore += item.nodes;
    if (!item.latitude || !item.longitude || item.nodes === 0) return;
    total += item.nodes;
    formatList.push({
      name: item.nodes,
      value: [item.longitude, item.latitude],
      symbolSize: item.nodes * 10 > 60 ? 60 : item.nodes * 10,
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
.bg {
  position: relative;
}

.page {
  position: relative;
  padding-top: calc(var(--header-height) + 16px);
  z-index: 1;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: calc(var(--footer-height) + 48px);
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  transition: background-color 0.3s;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  transition: background-color 0.3s;
  background-color: rgba(24, 24, 28, 0.4);
}

.mask-bgcolor-center {
  position: fixed;
  width: 210px;
  height: 210px;
  left: calc(50% - 210px / 2);
  top: 460px;
  background-image: linear-gradient(130deg, rgba(253, 153, 42, 0.38) 0%, rgba(125, 81, 220, 0.38) 51.86%, rgba(37, 237, 255, 0.38) 83.43%);
  filter: blur(50px);
}

.section {
  display: flex;
  flex-direction: column;
  gap: 16px 0;
}
.section-header {
}

.grid-item {
  position: relative;
  box-sizing: border-box;
}
.divider-h {
  position: relative;
}

.divider-h::after {
  content: '';
  display: block;
  height: 100%;
  width: 1px;
  left: 50%;
  top: 48px;
  bottom: 0;
  position: absolute;
  background-image: linear-gradient(180deg, rgba(127, 58, 185, 0) 0%, #391a53 50%, rgba(127, 58, 185, 0) 99%);
}
</style>
