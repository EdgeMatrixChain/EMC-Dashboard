<template>
  <div class="page">
    <NGrid class="main pt-4 mb-10" x-gap="96" y-gap="48" cols="1 1200:2 " item-responsive>
      <NGridItem class="node-detail">
        <div class="main-header">Node Details</div>
        <div class="main-bgcolor" style="border-left-color: #8f7df8">
          <div class="main-table">
            <template v-for="item in nodeList">
              <div class="main-table-item">
                <div class="main-table-item-name min-w-[128px] xl:min-w-[200px]">
                  <span class="main-table-item-name-span">{{ item.name }} :</span>
                </div>
                <div class="main-table-item-info">
                  <NEllipsis class="main-table-item-info-span text-[12px] xl:text-[16px]" style="max-width: 400px"> {{ item.info }} </NEllipsis>
                </div>
              </div>
            </template>
          </div>
        </div>
      </NGridItem>
      <NGridItem class="node-detail">
        <div class="main-header">Node Details</div>
        <div class="main-bgcolor" style="border-left-color: #5554fe">
          <div class="main-table">
            <template v-for="(item, index) in infoList">
              <div class="main-table-item">
                <div class="main-table-item-name min-w-[128px] xl:min-w-[200px]">
                  <img class="main-table-item-icon" :src="item.icon" />
                  <span class="main-table-item-name-span text-[12px] xl:text-[18px]">{{ item.name }} :</span>
                </div>
                <div class="main-table-item-info">
                  <NEllipsis class="main-table-item-info-span text-[12px] xl:text-[16px]" style="max-width: 400px"> {{ item.info }} </NEllipsis>
                </div>
              </div>
            </template>
          </div>
        </div>
      </NGridItem>
    </NGrid>
    <div class="main-header">Deployed Application——Stable diffusion</div>
    <NSpin :show="isLoading">
      <template v-if="modelList.length !== 0">
        <div class="deployed-bgcolor">
          <NGrid x-gap="24" y-gap="24" cols="1356:4 1037:3 718:2 399:1" item-responsive>
            <template v-for="item in modelList">
              <NGridItem>
                <ModelsItem class="mode-item" :item="item" />
              </NGridItem>
            </template>
          </NGrid>
        </div>
      </template>
      <template v-else>
        <div class="deployed-bgcolor">
          <div class="deployed-no-data">No model</div>
        </div>
      </template>
    </NSpin>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Utils } from '@/tools/utils';
import { NDatePicker, NEllipsis, NGrid, NGridItem, NSpin } from 'naive-ui';
import { useRewardStore } from '@/stores/reward';
import moment from 'moment';
import axios from 'axios';

import ModelsItem from '@/components/models-item.vue';

import iconCpu from '@/assets/icon_cpu.svg';
import iconGpu from '@/assets/icon_gpu.svg';
import iconIP from '@/assets/icon_ip.png';
import iconMemory from '@/assets/icon_memory.png';
import iconModel from '@/assets/icon_model.png';

type ModelItem = {
  hash: string;
  model_name: string;
  model_sn: string;
  config: string;
  filename: string;
  sha256: string;
  title: string;
  cover: string;
};

export default defineComponent({
  components: {
    ModelsItem,
    NDatePicker,
    NEllipsis,
    NGrid,
    NGridItem,
    NSpin,
  },
  setup() {
    const router = useRouter();
    const useReward = useRewardStore();

    const nodeId: string = router.currentRoute.value.params.id as string;

    const modelList = ref<ModelItem[]>([]);
    const nodeList = ref([
      { name: 'Node ID', key: 'nodeId', info: '--' },
      { name: 'Startup Time', key: 'startTime', info: '--' },
      { name: 'Run Time', key: 'runTime', info: '--' },
      { name: 'Reward', key: 'reward', info: '--' },
      { name: 'AvgPower', key: 'avgPower', info: '--' },
    ]);
    const infoList = ref([
      { name: 'CPU', key: 'cpu', icon: iconCpu, info: '--' },
      { name: 'Mac Address', key: 'mac', icon: iconGpu, info: '--' },
      { name: 'IP Address', key: 'ip', icon: iconIP, info: '--' },
      { name: 'Memory', key: 'memory', icon: iconMemory, info: '--' },
      { name: 'Model Name', key: 'modelName', icon: iconModel, info: '--' },
    ]);

    const isLoading = ref(false);

    onMounted(() => {
      init(nodeId);
    });

    const init = async (nodeId: string) => {
      const resp = await axios.get('https://api.edgematrix.pro/api/v1/nodeinfosnapshot', {
        params: { nodeid: nodeId },
      });
      if (resp.data._result !== 0) return;
      const nodeinfosnapshot = resp.data.data;
      if (Object.keys(nodeinfosnapshot).length !== 0) {
        dataInfoFunction(nodeinfosnapshot, nodeId);
        return;
      }

      const resp1 = await axios.get('https://api.edgematrix.pro/api/v1/nodeinfo', {
        params: { nodeid: nodeId },
      });
      if (resp1.data._result !== 0) return;
      dataInfoFunction(resp1.data.data, nodeId);
    };

    const dataInfoFunction = (data: any, nodeId: string) => {
      nodeList.value.forEach((item) => {
        if (item.key === 'nodeId') {
          if (!data._id) return;
          item.info = Utils.formatAddress(data._id);
        } else if (item.key === 'startTime') {
          if (!data.startupTime) return;
          item.info = moment(data.startupTime).format('YYYY-MM-DD hh:mm');
        } else if (item.key === 'runTime') {
          if (data.startupTime === data.runTime) return;
          item.info = Utils.formatDate(data.runTime);
        } else if (item.key === 'reward') {
          reward(nodeId);
        } else if (item.key === 'avgPower') {
          if (!data.avgPower) return;
          item.info = data.avgPower;
        }
      });

      infoList.value.forEach(async (item) => {
        if (item.key === 'cpu') {
          if (data.cpuInfo) {
            item.info = JSON.parse(data.cpuInfo).ModelName;
          }
        } else if (item.key === 'mac') {
          if (!data.macAddr) return;
          item.info = data.macAddr;
        } else if (item.key === 'ip') {
          if (!data.ipInfo) return;
          if (Object.keys(data.ipInfo).length === 0) return;
          item.info = data.ipInfo.ipAddr;
        } else if (item.key === 'memory') {
          if (!data.memoryInfo) return;
          const formatMemory = JSON.parse(data.memoryInfo);
          item.info = Math.round(formatMemory.total / Math.pow(1024, 3)) + 'GB ' + ' Useage ' + Number(formatMemory.used_percent).toFixed(2) + '%';
        } else if (item.key === 'modelName') {
          isLoading.value = true;
          const resp = await axios.get('https://api.edgematrix.pro/api/v1/nodesdmodels', {
            params: { nodeid: nodeId },
          });
          const modelsData = resp.data;
          if (modelsData._result !== 0 || modelsData.data === '') return;
          const models = JSON.parse(modelsData.data);
          isLoading.value = false;

          if (typeof models !== 'object' || !models.length) {
            modelList.value = [];
          } else {
            const comparator = (a: any, b: any) => {
              const aSha256 = Boolean(a.sha256);
              const bSha256 = Boolean(b.sha256);

              if (aSha256 && !bSha256) {
                return -1;
              } else if (!aSha256 && bSha256) {
                return 1;
              } else {
                return 0;
              }
            };
            models.sort(comparator);
            modelList.value = [...models];
          }

          const resp1 = await axios.get('https://client.emchub.ai/emchub/api/client/modelInfo/queryList', {
            params: { pageNo: 1, pageSize: 99 },
          });
          const modelAllList = resp1.data.pageInfo?.list;

          modelList.value.forEach((modelItem: ModelItem) => {
            if (!modelItem.sha256) return;
            const resp = modelAllList.find((modelItemAllItems: any) => modelItem.sha256 === modelItemAllItems.modelVersions[0].hashCodeSha256);
            // console.log(resp);
            if (!resp) return;
            const previewPicturesUrl = JSON.parse(resp.modelVersions[0].previewPicturesUrl)[0] || [];
            modelItem.cover = previewPicturesUrl.url;
            modelItem.model_name = resp.modelName;
            modelItem.model_sn = resp.modelSn;
            item.info = modelItem.model_name;
          });
          // console.log(modelList.value);
        }
      });
    };

    const reward = async (nodeId: string) => {
      const { total: total, list: list } = await useReward.getNodeRewardList(0, 10);
      const localList = Utils.getLocalStorage('icp.reward.list')?.list || [];
      if (localList.length === 0) return;
      const reward = localList.find((item: any) => item.nodeID === nodeId);
      if (!reward) return;
      if (reward.reward !== '0') {
        nodeList.value[3].info = '≈ ' + reward.reward / Math.pow(10, 8) + ' EMC';
      } else {
        nodeList.value[3].info = reward.reward;
      }
    };

    return {
      isLoading,
      nodeList,
      infoList,
      modelList,
    };
  },
});
</script>

<style scoped>
.page {
  width: 100%;
}
.main-header {
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #fff;
  text-shadow: 0px 2px 8px #762db6;
}
.node-detail {
  width: 100%;
  /* width: calc(50% - 56px); */
}
.main-bgcolor {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  border-left-style: solid;
  border-left-width: 4px;
  overflow: hidden;
}
.main-table {
  width: 100%;
  height: 100%;
  background-color: #1c2025;
  backdrop-filter: blur(60px);
}

.main-table-item {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 24px;
  border-bottom: 1px solid #2d343f;
}

.main-table-item:nth-last-child(1) {
  border-bottom: none;
}

.main-table-item-name {
  display: flex;
  align-items: center;
  /* width: 0; */
}
.main-table-item-icon {
  width: 24px;
  height: 24px;
  margin-right: 16px;
}

.main-table-item-name-span {
  color: #a6b6d1;
  font-weight: 400;
  line-height: 62px;
}

.main-table-item-info-span {
  color: #fff;
  font-weight: 400;
  line-height: 62px;
}

.deployed-bgcolor {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding: 16px;
  background-color: #1c2025;
  backdrop-filter: blur(60px);
  border-radius: 12px;
  border-left: 4px solid #14acff;
  box-sizing: border-box;
  overflow: hidden;
}
.deployed-no-data {
  width: 100%;
  min-height: 400px;
  line-height: 400px;
  text-align: center;
  font-size: 24px;
}

.mode-item {
  border: 1px solid #464646;
  background-color: #191d22;
}
</style>
