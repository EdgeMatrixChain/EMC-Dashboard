<template>
  <div class="page">
    <div class="main">
      <div class="node-detail">
        <div class="main-header">Node Details</div>
        <div class="main-bgcolor" style="border-left-color: #8f7df8">
          <div class="main-table">
            <template v-for="item in nodeList">
              <div class="main-table-item">
                <div class="main-table-item-name" style="flex: 0.25">
                  <span class="main-table-item-name-span">{{ item.name }} :</span>
                </div>
                <div class="main-table-item-info" style="flex: 0.75">
                  <span class="main-table-item-info-span">{{ item.info }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="node-detail">
        <div class="main-header">Node Details</div>
        <div class="main-bgcolor" style="border-left-color: #5554fe">
          <div class="main-table">
            <template v-for="(item, index) in infoList">
              <div class="main-table-item">
                <div class="main-table-item-name" style="flex: 0.35">
                  <img class="main-table-item-icon" :src="item.icon" />
                  <span class="main-table-item-name-span">{{ item.name }} :</span>
                </div>
                <div class="main-table-item-info" style="flex: 0.65">
                  <span class="main-table-item-info-span">{{ item.info }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <template v-if="modelList.length !== 0">
      <div class="main-header">Deployed Application——Stable diffusion</div>
      <div class="deployed-bgcolor">
        <template v-for="item in modelList">
          <ModelsItem class="mode-item" :item="item" />
        </template>
      </div>
    </template>
    <template v-else> </template>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Utils } from '@/tools/utils';
import { NDatePicker } from 'naive-ui';
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
};

export default defineComponent({
  components: {
    ModelsItem,
    NDatePicker,
  },
  setup() {
    const router = useRouter();
    const useReward = useRewardStore();

    const nodeList = ref([
      { name: 'Node ID', info: '--' },
      { name: 'Startup Time', info: '--' },
      { name: 'Run Time', info: '--' },
      { name: 'Reward', info: '--' },
      { name: 'AvgPower', info: '--' },
    ]);

    const infoList = ref([
      { name: 'CPU', icon: iconCpu, info: '--' },
      { name: 'GPU', icon: iconGpu, info: '--' },
      { name: 'IP Address', icon: iconIP, info: '--' },
      { name: 'Memory', icon: iconMemory, info: '--' },
      { name: 'Model Name', icon: iconModel, info: '--' },
    ]);

    const modelList = ref<ModelItem[]>([]);
    const nodeId = ref(router.currentRoute.value.params.id);
    onMounted(() => {
      axios
        .get('https://api.edgematrix.pro/api/v1/nodesdmodels', {
          params: { nodeid: nodeId.value },
        })
        .then((resp) => {
          const data = resp.data;
          if (data._result !== 0 || data.data === '') return;
          const dataList = JSON.parse(data.data);
          if (dataList && dataList.detail !== 'Not Found') {
            modelList.value = dataList;
          }
        });

      axios
        .get('https://api.edgematrix.pro/api/v1/nodeinfosnapshot', {
          params: { nodeid: nodeId.value },
        })
        .then((resp) => {
          const data = resp.data;
          if (data._result !== 0) return;
          const dataInfo = data?.data;
          if (Object.keys(dataInfo).length !== 0) {
            dataInfoFunction(dataInfo);
          } else {
            axios
              .get('https://api.edgematrix.pro/api/v1/nodeinfo', {
                params: { nodeid: nodeId.value },
              })
              .then((resp) => {
                const data = resp.data;
                if (data._result !== 0) return;
                dataInfoFunction(dataInfo);
              });
          }
        });
      // ---------
      const dataInfoFunction = (data: any) => {
        nodeList.value.findIndex((item) => {
          if (item.name === 'Node ID') {
            item.info = Utils.formatAddress(data._id);
          } else if (item.name === 'Startup Time') {
            item.info = moment(data.startupTime).format('YYYY-MM-DD HH:MM');
          } else if (item.name === 'Run Time') {
            if (data.startupTime === data.runTime) return;
            const time = data.runTime / 1000;
            let beforeTime = '';
            if (time / 86400 > 1) {
              beforeTime = Math.trunc(time / 86400) + ' days';
            } else if (time / 3600 > 1) {
              beforeTime = Math.trunc(time / 3600) + ' hours';
            } else if (time / 60 > 1) {
              beforeTime = Math.trunc(time / 60) + ' min';
            } else if (time > 1) {
              beforeTime = Math.trunc(time) + ' sec';
            } else {
              return 'less than 1 second';
            }
            item.info = beforeTime;
          } else if (item.name === 'Reward') {
            reward();
          } else if (item.name === 'AvgPower') {
            item.info = data.avgPower;
          }
        });
        infoList.value.findIndex((item) => {
          if (item.name === 'CPU') {
            if (data.cpuInfo) {
              item.info = JSON.parse(data.cpuInfo).ModelName;
            }
          } else if (item.name === 'IP Address') {
            if (Object.keys(data.ipInfo).length === 0) return;

            item.info = data.ipInfo.ipAddr;
          } else if (item.name === 'GPU') {
            item.info = '--';
          } else if (item.name === 'Memory') {
            if (!data.memoryInfo) return;
            const formatMemory = JSON.parse(data.memoryInfo);
            item.info = Math.round(formatMemory.total / Math.pow(1024, 3)) + 'GB ' + ' Useage ' + Number(formatMemory.used_percent).toFixed(2) + '%';
          } else if (item.name === 'Model Name') {
            setTimeout(() => {
              if (modelList.value.length === 0 || !data.appSpec) return;
              const findObject = modelList.value.find((item) => item.hash === data.appSpec);
              if (findObject) {
                item.info = findObject.model_name;
              } else {
                item.info = '--';
              }
            }, 1000);
          }
        });
      };
    });

    const reward = async () => {
      const { total: total, list: list } = await useReward.getNodeRewardList(0, 10);
      const localList = Utils.getLocalStorage('icp.reward.list') || [];
      if (localList.length === 0) return;

      const reward = localList.find((item: any) => item.nodeID === nodeId.value);
      if (!reward) return;

      if (reward.reward !== '0') {
        nodeList.value[3].info = '≈ ' + reward.reward / Math.pow(10, 8) + ' EMC';
      } else {
        nodeList.value[3].info = reward.reward;
      }
    };
    // watch(
    //   () => useReward.rewardData,
    //   (val) => {
    //     const rewardList = val || [];
    //     if (rewardList.length === 0) return;
    //     rewardList.forEach((item1: any) => {
    //       const reward = item1.find((item: any) => item.nodeID === nodeId.value);
    //       if (!reward) return;
    //       if (reward.reward !== '0') {
    //         nodeList.value[3].info = '≈ ' + reward.reward + ' EMC';
    //       } else {
    //         nodeList.value[3].info = reward.reward;
    //       }
    //     });
    //   }
    // );

    return {
      Utils,
      nodeId,
      nodeList,
      infoList,
      modelList,
    };
  },
});
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  margin-bottom: 40px;
}
.main-header {
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: #fff;
  text-shadow: 0px 2px 8px #762db6;
}
.node-detail {
  width: calc(50% - 56px);
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
  width: 0;
}
.main-table-item-icon {
  width: 24px;
  height: 24px;
  margin-right: 16px;
}

.main-table-item-name-span {
  color: #a6b6d1;
  font-size: 18px;
  font-weight: 400;
  line-height: 62px;
}

.main-table-item-info-span {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 62px;
}

.deployed-bgcolor {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px 16px 0px 10px;
  background-color: #1c2025;
  backdrop-filter: blur(60px);
  border-radius: 12px;
  border-left: 4px solid #14acff;
  box-sizing: border-box;
  overflow: hidden;
}

.mode-item {
  margin-right: 50px;
  margin-bottom: 36px;
  border: 1px solid #464646;
  background-color: #191d22;
}
.mode-item:nth-child(4n) {
  margin-right: 0px;
}
</style>
