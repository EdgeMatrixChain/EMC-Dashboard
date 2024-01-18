<template>
  <div class="page">
    <!-- <div class="page-mask"></div> -->
    <div class="mask-bgcolor-left"></div>
    <div class="mask-bgcolor-center"></div>
    <NSpace vertical :wrap-item="false" :size="[0, 40]">
      <NSpace class="w-[100%] max-w-[1440px] m-auto" vertical :wrap-item="false" :size="[0, 24]">
        <div class="section">
          <NGrid class="grid" x-gap="48" y-gap="48" cols="400:1 800:2 1200:3" item-responsive>
            <NGridItem class="grid-item">
              <NumericBlocks />
            </NGridItem>
            <NGridItem class="grid-item">
              <NumericApiTxs />
            </NGridItem>
            <NGridItem class="grid-item">
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
            </NGridItem>
          </NGrid>
        </div>
      </NSpace>
      <div class="w-[100%] max-w-[1440px] m-auto">
        <WorldMap :data="mapData" />
      </div>
      <div class="section w-[100%] max-w-[1440px] m-auto">
        <div class="section-header">
          <NText class="text-[24px]" strong>EMC Network</NText>
        </div>
        <NGrid class="grid" x-gap="48" y-gap="48" cols="400:1 800:2 1200:3" item-responsive>
          <!-- <NGridItem class="grid-item">
            <NumericBlocks />
          </NGridItem>
          <NGridItem class="grid-item">
            <NumericApiTxs />
          </NGridItem>
          <NGridItem class="grid-item">
            <NumericNodeComputing />
          </NGridItem> -->
          <NGridItem class="grid-item">
            <NumericGPU />
          </NGridItem>
          <NGridItem class="grid-item">
            <NumericComputePower />
          </NGridItem>
          <NGridItem class="grid-item">
            <NumericTaskPending />
          </NGridItem>

          <!-- <NGridItem class="grid-item">
            <NumericSockets />
          </NGridItem> -->
        </NGrid>
      </div>
      <div class="section w-[100%] max-w-[1440px] m-auto">
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
          <!-- <NGridItem class="grid-item">
            <NumericTokenInflation />
          </NGridItem> -->
        </NGrid>
      </div>
      <div class="section w-[100%] max-w-[1440px] m-auto">
        <div class="section-header">
          <NText class="text-[24px]" strong>Ecosystem Rewards</NText>
        </div>
        <NGrid class="grid" x-gap="48" y-gap="48" cols="400:1 800:2 1200:3" item-responsive>
          <NGridItem class="grid-item">
            <NumericNodeReward />
          </NGridItem>
        </NGrid>
      </div>
    </NSpace>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { NSpace, NText, NGrid, NGridItem } from 'naive-ui';
import moment from 'moment';
import { Utils } from '@/tools/utils';
import { http } from '@/tools/http';
import WorldMap from '@/components/world-map/index.vue';
import { getMapNodes } from '@/apis';

import NumericValidators from './numeric/node-validate.vue';
import NumericNodeRPC from './numeric/node-rpc.vue';
import NumericNodeRelay from './numeric/node-relay.vue';
import NumericBlocks from './numeric/blocks.vue';
import NumericApiTxs from './numeric/api-txs.vue';
import NumericGPU from './numeric/gpus.vue';
import NumericTaskPending from './numeric/task-pending.vue';
import NumericNodeComputing from './numeric/node-computing.vue';
import NumericComputePower from './numeric/compute-power.vue';
import NumericSockets from './numeric/sockets.vue';

import NumericTokenSupply from './numeric/token-supply.vue';
import NumericTokenStaked from './numeric/token-staked.vue';
import NumericTokenBurned from './numeric/token-burned.vue';
import NumericTokenFDV from './numeric/token-fdv.vue';
import NumericTokenMaketCap from './numeric/token-maket-cap.vue';
import NumericTokenInflation from './numeric/token-inflation.vue';

import NumericNodeReward from './numeric/node-reward.vue';

const mapData = ref<any[]>([]);

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
  console.info(`map total nodes filter before ->`, totalBefore);
  console.info(`map total nodes ->`, total);
  mapData.value = formatList;
});
</script>

<style scoped>
.page {
  position: relative;
  padding-top: 16px;
  padding-bottom: 64px;
}
.mask-bgcolor-left {
  position: fixed;
  width: 210px;
  height: 210px;
  left: 156px;
  top: 100px;
  background-image: linear-gradient(134deg, rgba(253, 153, 42, 0.3) 13.45%, rgba(125, 81, 220, 0.3) 60.04%, rgba(37, 237, 255, 0.3) 88.4%);
  filter: blur(50px);
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
  height: 180px;
  box-sizing: border-box;
}
</style>
