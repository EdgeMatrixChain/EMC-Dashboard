<template>
  <div class="page">
    <div class="top-bar-placeholder"></div>
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
                  <div class="main-table-item-icon" v-if="index === 0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.833 5.33325H6.16634C5.7061 5.33325 5.33301 5.70635 5.33301 6.16659V17.8333C5.33301 18.2935 5.7061 18.6666 6.16634 18.6666H17.833C18.2933 18.6666 18.6663 18.2935 18.6663 17.8333V6.16659C18.6663 5.70635 18.2933 5.33325 17.833 5.33325Z"
                        stroke="#A6B6D1"
                        stroke-linejoin="round"
                      />
                      <path d="M14.5 9.5H9.5V14.5H14.5V9.5Z" stroke="#A6B6D1" stroke-linejoin="round" />
                      <path
                        d="M8.21191 2.83325V5.33325"
                        stroke="#A6B6D1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.21191 18.6667V21.1667"
                        stroke="#A6B6D1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path d="M12 2.83325V5.33325" stroke="#A6B6D1" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12 18.6667V21.1667" stroke="#A6B6D1" stroke-linecap="round" stroke-linejoin="round" />
                      <path
                        d="M15.7881 2.83325V5.33325"
                        stroke="#A6B6D1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.7881 18.6667V21.1667"
                        stroke="#A6B6D1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.83301 8.21216H5.33301"
                        stroke="#A6B6D1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.667 8.21216H21.167"
                        stroke="#A6B6D1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path d="M2.83301 12H5.33301" stroke="#A6B6D1" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M18.667 12H21.167" stroke="#A6B6D1" stroke-linecap="round" stroke-linejoin="round" />
                      <path
                        d="M2.83301 15.7878H5.33301"
                        stroke="#A6B6D1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.667 15.7878H21.167"
                        stroke="#A6B6D1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div class="main-table-item-icon" v-else-if="index === 1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 8H12.0833" stroke="#A6B6D1" stroke-linecap="round" />
                      <path d="M5 12H12.0833" stroke="#A6B6D1" stroke-linecap="round" />
                      <path d="M5 16H12.0833" stroke="#A6B6D1" stroke-linecap="round" />
                      <path d="M19.6699 1L19.6699 23" stroke="#A6B6D1" stroke-linecap="round" />
                      <circle cx="16" cy="12" r="1.5" stroke="#A6B6D1" />
                      <path
                        d="M3 5C3 4.44772 3.44772 4 4 4H19.67V20.67H4C3.44772 20.67 3 20.2223 3 19.67V5Z"
                        stroke="#A6B6D1"
                      />
                    </svg>
                  </div>
                  <div class="main-table-item-icon" v-else-if="index === 2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20.3337 13.0833H3.66699V18.4999H20.3337V13.0833Z"
                        stroke="#A6B6D1"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16.7917 16.8333C17.367 16.8333 17.8333 16.367 17.8333 15.7917C17.8333 15.2164 17.367 14.75 16.7917 14.75C16.2164 14.75 15.75 15.2164 15.75 15.7917C15.75 16.367 16.2164 16.8333 16.7917 16.8333Z"
                        fill="#A6B6D1"
                      />
                      <path
                        d="M3.66699 13.0833L5.76631 3.08301H18.2589L20.3337 13.0833"
                        stroke="#A6B6D1"
                        stroke-linejoin="round"
                      />
                      <path d="M6.16699 15.7917H13.2503" stroke="#A6B6D1" stroke-linecap="round" />
                    </svg>
                  </div>
                  <div class="main-table-item-icon" v-else-if="index === 3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M19.4167 4H5.25C4.55965 4 4 4.55965 4 5.25V19.4167C4 20.107 4.55965 20.6667 5.25 20.6667H19.4167C20.107 20.6667 20.6667 20.107 20.6667 19.4167V5.25C20.6667 4.55965 20.107 4 19.4167 4Z"
                        stroke="#A6B6D1"
                        stroke-linejoin="round"
                      />
                      <path d="M16.4997 4V11.5H8.58301V4H16.4997Z" stroke="#A6B6D1" stroke-linejoin="round" />
                      <path d="M14.416 6.9165V8.58317" stroke="#A6B6D1" stroke-linecap="round" />
                      <path d="M7.33203 4H17.7494" stroke="#A6B6D1" stroke-linecap="round" />
                    </svg>
                  </div>
                  <div class="main-table-item-icon" v-else-if="index === 4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7.00033 16.1667H3.66699V19.5001H7.00033V16.1667Z"
                        stroke="#A6B6D1"
                        stroke-width="0.833333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18.6663 4.5H5.33301V9.5H18.6663V4.5Z"
                        stroke="#A6B6D1"
                        stroke-width="0.833333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 16.1667V9.5"
                        stroke="#A6B6D1"
                        stroke-width="0.833333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.33301 16.1666V12.8333H18.6663V16.1666"
                        stroke="#A6B6D1"
                        stroke-width="0.833333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.3333 16.1667H17V19.5001H20.3333V16.1667Z"
                        stroke="#A6B6D1"
                        stroke-width="0.833333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.6663 16.1667H10.333V19.5001H13.6663V16.1667Z"
                        stroke="#A6B6D1"
                        stroke-width="0.833333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.83301 7H8.66634"
                        stroke="#A6B6D1"
                        stroke-width="0.833333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
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

const nodeList = ref([
  { name: 'Node ID :', info: '42274b52a1...3e542e9ebc' },
  { name: 'Round :', info: '12' },
  { name: 'Total :', info: '2’881' },
  { name: 'Node type :', info: '2’881' },
  { name: 'Pledge :', info: 'Yes/No' },
]);

const infoList = ref([
  { name: 'CPU :', info: 'AMD Ryzen Threadripper 3960X 24-Core' },
  { name: 'GPU :', info: 'NVIDIA GeForce RTX 3080' },
  { name: 'Hard disk :', info: 'WDC WDS500G2B0C-00PXH0' },
  { name: 'Internal storage :', info: '256 GB ( 三星 DDR4 3000MHz 32GB x 8 )' },
  { name: 'Pledge :', info: '英特尔 Wi-Fi 6 AX200 160MHz #2' },
]);
</script>

<style scoped>
.page {
  position: relative;
  background-color: #141618;
  min-height: 100vh;
  z-index: 10;
}
.top-bar-placeholder {
  width: 100%;
  height: 84px;
  margin-bottom: 40px;
}
.main {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  overflow: hidden;
}
</style>
