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
import { ref, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Utils } from '@/tools/utils';

import axios from 'axios';
import ModelsItem from '@/components/models-item.vue';
import iconCpu from '@/assets/icon_cpu.svg';
import iconGpu from '@/assets/icon_gpu.svg';
import iconDisk from '@/assets/icon_disk.svg';
import iconStorage from '@/assets/icon_storage.svg';
import iconPledge from '@/assets/icon_pledge.svg';

export default defineComponent({
  components: {
    ModelsItem,
  },
  setup() {
    const router = useRouter();
    const nodeInfo = ref({});
    const nodeList = ref([
      { name: 'Node ID', info: '' },
      { name: 'Round', info: '' },
      { name: 'Total', info: '' },
      { name: 'Node type', info: '' },
      { name: 'Pledge', info: '' },
    ]);

    const infoList = ref([
      { name: 'CPU', icon: iconCpu, info: '' },
      { name: 'GPU', icon: iconGpu, info: '' },
      { name: 'Hard disk', icon: iconDisk, info: '' },
      { name: 'Internal storage', icon: iconStorage, info: '' },
      { name: 'Pledge', icon: iconPledge, info: '' },
    ]);

    const modelList = ref([]);
    onMounted(() => {
      const nodeId: string = <string>router.currentRoute.value.params.id;

      axios
        .get('https://api.edgematrix.pro/api/v1/nodeinfo', {
          params: { nodeid: nodeId },
        })
        .then((resp) => {
          const data = resp.data;
          if (data._result !== 0) return;
          const dataInfo = data?.data;
          if (Object.keys(dataInfo).length !== 0) {
            nodeList.value.findIndex((item) => {
              if (item.name === 'Node ID') {
                item.info = Utils.formatAddress(dataInfo._id);
              } else {
                item.info = '--';
              }
            });
            infoList.value.findIndex((item) => {
              if (item.name === 'CPU') {
                if (dataInfo.cpuInfo) {
                  item.info = JSON.parse(dataInfo.cpuInfo).ModelName;
                }
              } else {
                item.info = '--';
              }
            });
          } else {
            nodeList.value.findIndex((item) => {
              if (item.name === 'Node ID') {
                item.info = Utils.formatAddress(nodeId);
              } else {
                item.info = '--';
              }
            });
            infoList.value.findIndex((item) => {
              item.info = '--';
            });
          }
        });
      // -
      axios
        .get('https://api.edgematrix.pro/api/v1/nodesdmodels', {
          params: { nodeid: nodeId },
        })
        .then((resp) => {
          const data = resp.data;
          if (data._result !== 0) return;
          if (data.data) {
            modelList.value = JSON.parse(data.data);
          }
        });
    });

    return {
      Utils,
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
  margin-right: 54px;
  margin-bottom: 36px;
}
.mode-item:nth-child(4n) {
  margin-right: 0px;
}
</style>
