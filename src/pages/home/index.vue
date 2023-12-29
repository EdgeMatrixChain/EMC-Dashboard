<template>
  <div class="page max-w-[1440px]" style="margin:auto;">
    <!-- <div class="page-mask"></div> -->
    <div class="mask-bgcolor-left"></div>
    <div class="mask-bgcolor-center"></div>
    <NGrid class="card-body mb-14" x-gap="96" y-gap="48" cols=" 300:1 800:2 1392:3" item-responsive>
      <template v-for="(item, index) in dataInfo">
        <NGridItem class="card-body-item">
          <template v-if="item.data !== ''">
            <NSpace class="card-item-info" vertical justify="space-between">
              <div class="card-item-title">
                <span>{{ item.name }}</span>
              </div>
              <div class="card-item-data">
                <span style="color: #fff; font-size: 36px">{{ item.data }}</span>
                <span style="color: #6f6376; font-size: 20px">&nbsp;{{ item.unit }}</span>
              </div>
              <div class="card-item-footer">
                <span>{{ item.tips }}</span>
              </div>
            </NSpace>
            <img :src="item.icon" width="160" height="156" style="position: absolute; bottom: 0; right: 0" />
          </template>
          <template v-else>
            <NSpin size="small" />
          </template>
        </NGridItem>
      </template>
    </NGrid>
    <div class="map-body">
      <WorldMap :data="mapData" />
    </div>
    <NGrid class="data-body" x-gap="56" y-gap="48" cols="300:1 1392:2">
      <NGridItem class="node-list">
        <div class="node-list-header">
          <span class="node-list-header-span">Node list</span>
        </div>
        <div class="node-list-subtitle">
          <img class="node-list-subtitle-icon" src="@/assets/icon_check.svg" />
          <span class="node-list-subtitle-span">Last updated node</span>
        </div>
        <div class="node-list-table">
          <div class="node-list-theader">
            <div class="node-list-theader-item">Node ID</div>
            <div class="node-list-theader-item">EMC Reward</div>
          </div>
          <div class="node-list-body">
            <template v-if="!nodeList">
              <NSpin size="small" />
            </template>
            <template v-else>
              <template v-for="(item, index) in nodeList" :key="item.nodeID">
                <RouterLink :to="{ name: 'node-detail', params: { id: item.nodeID } }">
                  <div class="node-list-main">
                    <div class="node-list-main-item">{{ isDesktop ? item.nodeIDFormtted : item.nodeIDShort }}</div>
                    <div class="node-list-main-item">{{ item.reward }}</div>
                  </div>
                </RouterLink>
              </template>
            </template>
          </div>
        </div>
      </NGridItem>
      <NGridItem class="node-list">
        <div class="node-list-header">
          <span class="node-list-header-span">Node list</span>
        </div>
        <div class="node-list-subtitle">
          <img class="node-list-subtitle-icon" src="@/assets/icon_check.svg" />
          <span class="node-list-subtitle-span">Last updated node</span>
        </div>
        <div class="node-list-table">
          <div class="node-list-theader">
            <div class="node-list-theader-item">Node ID</div>
            <div class="node-list-theader-item">EMC Reward</div>
          </div>
          <div class="node-list-body">
            <template v-if="!nodeList1">
              <NSpin size="small" />
            </template>
            <template v-else>
              <template v-for="(item, index) in nodeList1" :key="item.nodeID">
                <RouterLink :to="{ name: 'node-detail', params: { id: item.nodeID } }">
                  <div class="node-list-main">
                    <div class="node-list-main-item">{{ isDesktop ? item.nodeIDFormtted : item.nodeIDShort }}</div>
                    <div class="node-list-main-item">{{ item.reward }}</div>
                  </div>
                </RouterLink>
              </template>
            </template>
          </div>
        </div>
      </NGridItem>
    </NGrid>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { NSpin, NSpace, NGrid, NGridItem } from 'naive-ui';
import { useIsSmallDesktop, useIsDesktop } from '@/composables/use-screen';
import moment from 'moment';
import { Utils } from '@/tools/utils';
import { Http } from '@/tools/http';
import WorldMap from '@/components/world-map/index.vue';
import { useRewardStore } from '@/stores/reward';
import iconBlocks from '@/assets/icon_data_blocks.png';
import iconTransactions from '@/assets/icon_data_transactions.png';
import iconTotalNodes from '@/assets/icon_data_total_nodes.png';
import iconPocNodes from '@/assets/icon_data_poc_nodes.png';
import iconAvgpower from '@/assets/icon_data_total_avgpower.png';
import iconStaked from '@/assets/icon_data_staked.png';

type NodeListItem = {
  nodeID: string;
  nodeIDFormtted: string;
  nodeIDShort: string;
  reward: string;
};

type DataInfoItem = {
  name: string;
  data: string;
  icon: any;
  unit: string;
  tips: string;
};

export default defineComponent({
  components: {
    NSpace,
    NSpin,
    NGrid,
    NGridItem,
    WorldMap
  },
  setup() {
    const http = Http.getInstance();
    const isSmallDesktop = useIsSmallDesktop();
    const isDesktop = useIsDesktop();
    const mapData = ref<any[]>([]);
    const nodeList = ref<NodeListItem[] | null>();
    const nodeList1 = ref<NodeListItem[] | null>();

    const dataInfo = ref<DataInfoItem[]>([
      { name: 'Blocks', icon: iconBlocks, unit: 'Blocks', data: '', tips: '' },
      { name: 'Transactions', icon: iconTransactions, unit: 'TXs', data: '', tips: '' },
      { name: 'Total Nodes', icon: iconTotalNodes, unit: 'Nodes', data: '', tips: '' },
      // { name: 'POC Nodes', icon: iconPocNodes, unit: 'Nodes', data: '', tips: '' },
      // { name: 'Total Power', icon: iconAvgpower, unit: 'E', data: '', tips: '' },
      // { name: 'Total Staked', icon: iconStaked, unit: 'EMC', data: '', tips: '' },
    ]);

    const formatData = (data: number) => {
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    };

    const useReward = useRewardStore();

    onMounted(async () => {
      http.get({ url: '/blocks' }).then((resp: any) => {
        const data = resp.data || 0;
        dataInfo.value[0].data = formatData(data);
      });
      http.get({ url: '/dip20transactions' }).then((resp: any) => {
        const data = resp.data || 0;
        dataInfo.value[1].data = formatData(data);
      });
      // http.get({ url: '/nodes' }).then((resp: any) => {
      //   const data = resp.data || { total: 0, poctotal: 0 };
      //   dataInfo.value[2].data = formatData(data.total || 0);
      //   dataInfo.value[3].data = formatData(data.poctotal || 0);
      //   dataInfo.value[3].tips = 'Start form ' + moment(Date.now()).format('dddd MMMM DD 00.00 UTC YYYY');
      // });
      // http.get({ url: '/nodestatsnapshot' }).then((resp: any) => {
      //   const data = resp.data || { totalAvgPower: 0, totalStaked: 0 };
      //   dataInfo.value[4].data = formatData(Utils.toFixed(data.totalAvgPower, 2));
      //   dataInfo.value[4].tips = 'Active Nodes In Past 30 min';
      //   dataInfo.value[5].data = formatData(data.totalStaked);
      // });

      http.get({ url: '/ipmap' }).then((resp: any) => {
        const list = resp.data || [];
        dataInfo.value[2].data = formatData(list.reduce((a:number, b:any) => a + b.nodes, 0));
        mapData.value = [];
        list.forEach((item: any) => {
          if (!item.latitude || !item.longitude || item.nodes === 0) return;
          mapData.value.push({
            name: item.nodes,
            value: [item.longitude, item.latitude],
            symbolSize: item.nodes * 10 > 60 ? 60 : item.nodes * 10,
          });
        });
      });

      useReward.getNodeRewardList(0, 10).then((resp) => {
        const { total, list } = resp || { list: [] };
        list.forEach((item: any) => {
          item.nodeIDFormtted = Utils.formatAddress(item.nodeID, 11);
          item.nodeIDShort = Utils.formatAddress(item.nodeID, 4);
        });
        nodeList.value = list;
      });
      useReward.getNodeRewardList(1, 10).then((resp) => {
        const { total, list } = resp || { list: [] };
        list.forEach((item: any) => {
          item.nodeIDFormtted = Utils.formatAddress(item.nodeID, 11);
          item.nodeIDShort = Utils.formatAddress(item.nodeID, 4);
        });
        nodeList1.value = list;
      });

    });

    return {
      isSmallDesktop,
      isDesktop,
      mapData,
      nodeList,
      nodeList1,
      dataInfo,
    };
  },
});
</script>

<style scoped>
.page {
  position: relative;
}

.mask-bgcolor-left {
  position: fixed;
  width: 210px;
  height: 210px;
  left: 156px;
  top: 100px;
  background: linear-gradient(130.04deg, rgba(253, 153, 42, 0.3) 13.45%, rgba(125, 81, 220, 0.3) 60.04%, rgba(37, 237, 255, 0.3) 88.4%);
  filter: blur(50px);
}

.mask-bgcolor-center {
  position: fixed;
  width: 210px;
  height: 210px;
  left: calc(50% - 210px / 2);
  top: 460px;
  background: linear-gradient(130deg, rgba(253, 153, 42, 0.38) 0%, rgba(125, 81, 220, 0.38) 51.86%, rgba(37, 237, 255, 0.38) 83.43%);
  filter: blur(50px);
}

.card-body-item {
  position: relative;
  width: 100%;
  /* width: calc(((100% - 92px * 2) / 3)); */
  height: 180px;
  border-radius: 10px;
  border: 1px solid #676767;
  background: linear-gradient(180deg, #292929 0%, #121212 64.06%, #000 100%);
  overflow: hidden;
  box-sizing: border-box;
}

/* .card-body-item:nth-child(3n) {
  margin-right: 0;
} */
.card-item-info {
  position: absolute;
  padding: 32px 24px 16px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.card-item-title {
  font-size: 16px;
  font-weight: 300;
  line-height: 16px;
  background: linear-gradient(to bottom, rgba(252, 88, 179, 1), rgba(254, 174, 104, 1));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.card-item-data {
  height: 36px;
  line-height: 36px;
  /* margin: 16px 0 12px; */
}

.card-item-footer {
  color: #f2d6ff;
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
}

.card-body-item-bg-small {
  position: absolute;
  right: -39px;
  bottom: -45px;
  width: 114px;
  height: 114px;
  border-radius: 50%;
  background: linear-gradient(185deg, rgba(253, 116, 155, 0.2) 0%, rgba(40, 26, 200, 0.2) 100%);
  opacity: 0.2;
  z-index: 2;
}

.card-body-item-bg-big {
  position: absolute;
  right: -48px;
  bottom: -44px;
  width: 176px;
  height: 176px;
  border-radius: 50%;
  background: linear-gradient(185deg, rgba(253, 116, 155, 0.2) 0%, rgba(40, 26, 200, 0.2) 100%);
  opacity: 0.2;
  z-index: 1;
}

.map-body {
  margin-bottom: 64px;
}

.nft-body {
  margin-bottom: 64px;
  position: relative;
}

.nft-body-header {
  margin-bottom: 48px;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
}

.nft-body-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nft-card {
  width: 300px;
  height: 400px;
  padding: 10px 10px 20px;
  border-radius: 15px;
  background-color: #201e43;
}

.nft-card-cover {
  width: 100%;
  margin-bottom: 30px;
  border-radius: 15px;
  object-fit: cover;
  aspect-ratio: 10 / 9.14;
}

.nft-card-title {
  padding: 0 10px;
  margin-bottom: 24px;
  color: #ecebf6;
  font-size: 18px;
  font-weight: 500;
  line-height: 18px;
}

.nft-card-footer {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nft-card-footer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nft-card-footer-item-property {
  margin-bottom: 14px;
  color: #999;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
}

.nft-card-footer-item-value {
  color: #f5f5f5;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}

.data-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 64px;
}

.node-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.node-list-header-button {
  position: relative;
  height: 30px;
  padding: 0px 16px;
  border-radius: 4px;
  background: linear-gradient(90deg, #3e30ec 0%, #c01fc3 100%);
}

.node-list-header-button:hover {
  background: #131128;
  cursor: pointer;
}

.node-list-header-button-span {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
}

.node-list-header-button-tips {
  display: none;
  position: absolute;
  top: -8px;
  right: 120px;
  width: 232px;
  height: 50px;
  padding: 0 10px;
  border-radius: 2px;
  background: #d1d1d1;
  color: #333;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.node-list {
  /* flex: 0.475; */
  /* width: 880px; */
  /* width: 0; */
  min-height: 456px;
  padding: 24px 20px 0;
  border-radius: 15px;
  background: linear-gradient(169deg, #201e43 0%, rgba(32, 30, 67, 0.6) 100%);
  backdrop-filter: blur(60px);
  box-sizing: border-box;
}

.node-list-header-span {
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  line-height: 18px;
}

.node-list-subtitle {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.node-list-subtitle-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}

.node-list-subtitle-span {
  color: #a0aec0;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}

.node-list-theader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}

.node-list-theader-item {
  width: 100%;
  color: #a0aec0;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
}

.node-list-body {
  overflow-y: auto;
  height: 336px;
}

.node-list-body::-webkit-scrollbar {
  display: none;
}

.node-list-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  border-top: 1px solid #56577a;
  box-sizing: border-box;
}

.node-list-main-item {
  width: 100%;
  line-height: 56px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
}

.transactions {
  width: 456px;
  height: 456px;
  padding: 24px 20px 0;
  border-radius: 15px;
  background: linear-gradient(175deg, #201e43 0%, rgba(32, 30, 67, 0.6) 100%);
  backdrop-filter: blur(60px);
  overflow-y: auto;
  box-sizing: border-box;
}

.transactions::-webkit-scrollbar {
  display: none;
}

.transactions-header {
  line-height: 30px;
  margin-bottom: 32px;
}

.transactions-header-span {
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  line-height: 18px;
}

.transactions-theader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}

.transactions-theader-item {
  width: 100%;
  color: #a0aec0;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
}

.transactions-body {
  overflow-y: auto;
  height: 336px;
}

.transactions-body::-webkit-scrollbar {
  display: none;
}

.transactions-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  border-top: 1px solid #56577a;
  box-sizing: border-box;
}

.transactions-main-item {
  width: 100%;
  line-height: 56px;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
}

.models-body {
  padding: 0 16px;
}

.models-body-header {
  margin-bottom: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.models-body-header-span {
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
}

.models-body-header-explore {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  border-radius: 4px;
  background: linear-gradient(270deg, #c020c4 0%, #3e30ec 100%);
}

.models-body-header-explore-span {
  margin-right: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}

.models-body-header-explore-icon {
  width: 20px;
  height: 20px;
}

.models-body-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
