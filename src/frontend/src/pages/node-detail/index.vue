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
                  <span class="main-table-item-name-span">{{ item.name }}</span>
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
                  <span class="main-table-item-name-span">{{ item.name }}</span>
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
    <div class="main-header">Deployed Application——Stable diffusion</div>
    <div class="deployed-bgcolor">
      <template v-for="item in 4">
        <ModelsItem />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ModelsItem from '@/components/models-item.vue';
import iconCpu from '@/assets/icon_cpu.svg';
import iconGpu from '@/assets/icon_gpu.svg';
import iconDisk from '@/assets/icon_disk.svg';
import iconStorage from '@/assets/icon_storage.svg';
import iconPledge from '@/assets/icon_pledge.svg';

const nodeList = ref([
  { name: 'Node ID :', info: '42274b52a1...3e542e9ebc' },
  { name: 'Round :', info: '12' },
  { name: 'Total :', info: '2’881' },
  { name: 'Node type :', info: '2’881' },
  { name: 'Pledge :', info: 'Yes/No' },
]);

const infoList = ref([
  { name: 'CPU :', icon: iconCpu, info: 'AMD Ryzen Threadripper 3960X 24-Core' },
  { name: 'GPU :', icon: iconGpu, info: 'NVIDIA GeForce RTX 3080' },
  { name: 'Hard disk :', icon: iconDisk, info: 'WDC WDS500G2B0C-00PXH0' },
  { name: 'Internal storage :', icon: iconStorage, info: '256 GB ( SAMSUNG DDR4 3000MHz 32GB x 8 )' },
  { name: 'Pledge :', icon: iconPledge, info: 'Inter Wi-Fi 6 AX200 160MHz #2' },
]);
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
  justify-content: space-between;
  width: 100%;
  padding: 24px 14px 24px 10px;
  background-color: #1c2025;
  backdrop-filter: blur(60px);
  border-radius: 12px;
  border-left: 4px solid #14acff;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
