<template>
  <Background>
    <div class="page" style="margin: auto">
      <NSpace class="w-[100%] max-w-[1200px] m-auto" vertical :wrap-item="false" :size="[0, 24]">
        <div class="section">
          <NGrid class="grid" x-gap="48" y-gap="48" cols="400:2 800:2 1200:4" item-responsive>
            <NGridItem class="grid-item">
              <NodeComputer />
            </NGridItem>
            <NGridItem class="grid-item">
              <NodeValidator />
            </NGridItem>
            <NGridItem class="grid-item">
              <NodeRpc />
            </NGridItem>
            <NGridItem class="grid-item">
              <NodeRelay />
            </NGridItem>
          </NGrid>
        </div>
      </NSpace>

      <div class="node w-[100%] max-w-[1200px] m-auto p-[24px]">
        <NSpace class="node-header" align="end" justify="space-between" :wrap-item="false" :size="[0, 8]">
          <NSpace vertical :wrap-item="false" :size="[0, 8]">
            <span class="node-header-text">Node List</span>
            <NSpace align="center" :wrap-item="false" :size="[0, 8]">
              <img class="node-header-subtitle-icon" src="@/assets/icon_check.svg" />
              <span class="node-header-subtitle">Last 30 days of updates</span>
            </NSpace>
          </NSpace>

          <NSpace class="tools" align="center" :wrap-item="false" :wrap="false" :size="[16, 16]">
            <NSpace class="filter" align="center" :wrap-item="false" :wrap="false" :size="[0, 0]">
              <img class="filter-icon" src="@/assets/icon_filter.svg" />
              <div class="filter-content">
                <span class="filter-content-text">All</span>
                <img class="filter-menu-icon" src="@/assets/icon_arrow_down.svg" />
              </div>
            </NSpace>

            <div class="search w-full">
              <div class="search-icon">
                <img src="@/assets/icon_search.png" width="20" height="20" />
              </div>
              <input class="search-input" v-model="inputSearchValue" type="text" placeholder="Search IDs" @keyup.enter="onPressSearch" />
            </div>
          </NSpace>
        </NSpace>
        <div class="node-list">
          <NSpin size="small" :show="loading">
            <div class="node-list-table">
              <div class="node-list-theader">
                <div class="node-list-theader-item w-[20%]">Node ID</div>
                <div class="node-list-theader-item w-[16%] justify-center">Type</div>
                <div class="node-list-theader-item w-[16%] justify-center">CPU</div>
                <div class="node-list-theader-item w-[16%] justify-center">Memory</div>
                <div class="node-list-theader-item w-[16%] justify-center">GPU</div>
                <div class="node-list-theader-item w-[16%]">Last Updated</div>
                <!-- <div class="node-list-theader-item">Running Time</div> -->
              </div>
              <div class="node-list-body">
                <template v-for="(item, index) in list" :key="item._id">
                  <RouterLink :to="{ name: 'node-detail', params: { id: item._id } }">
                    <div class="node-list-main">
                      <div class="node-list-main-item w-[20%] text-[12px] xl:text-[14px]">{{ item.nodeIdFormat }}</div>
                      <!-- <div class="node-list-main-item text-[12px] xl:text-[14px]">{{ item.avgPower == '0' || !item.avgPower
                      ? '--' : item.avgPower }}</div> -->
                      <!-- <div class="node-list-main-item text-[12px] xl:text-[14px]">{{ `≈ ${Number(item.reward).toFixed(isDesktop ? 8 : 2)}` }}</div> -->
                      <!-- <div class="node-list-main-item text-[12px] xl:text-[14px]">{{ `${item.reward}` }}</div> -->

                      <div class="node-list-main-item text-[12px] xl:text-[14px] w-[16%] justify-center">
                        <div class="node-list-main-item-badge" :style="{ color: item.type.color, backgroundColor: item.type.bgColor }">
                          {{ item.type.name }}
                        </div>
                      </div>
                      <div class="node-list-main-item text-[12px] xl:text-[14px] w-[16%] justify-center">{{ item.cpus }}</div>
                      <div class="node-list-main-item text-[12px] xl:text-[14px] w-[16%] justify-center">{{ item.memory }}</div>
                      <div class="node-list-main-item text-[12px] xl:text-[14px] w-[16%] justify-center">{{ item.gpus }}</div>
                      <div class="node-list-main-item text-[12px] xl:text-[14px] w-[16%]">{{ item.updateTimeStr }}</div>
                      <!-- <div class="node-list-main-item text-[12px] xl:text-[14px]">{{ item.runTime }}</div> -->
                    </div>
                  </RouterLink>
                </template>
              </div>
            </div>
          </NSpin>
        </div>
      </div>
      <NSpace class="pagination" justify="center">
        <NPagination
          v-model:page="pageNo"
          :disabled="loading"
          :page-count="pageCount"
          @update:page="handlePageChange"
          size="large"
          :page-slot="isDesktop ? 10 : 6"
        />
      </NSpace>
    </div>
  </Background>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'nodes',
  beforeRouteEnter(to, from, next) {
    if (typeof to.meta !== 'object') {
      to.meta = {};
    }
    if (from.name === 'node-detail') {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
      // Utils.setLocalStorage('icp.reward.list', '');
    }
    next();
  },
});
</script>
<script lang="ts" setup>
import { ref, onActivated } from 'vue';
import { NPagination, NSpace, NGrid, NGridItem, NSpin } from 'naive-ui';
import { Utils } from '@/tools/utils';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';
import { useIsMobile, useIsTablet, useIsSmallDesktop, useIsDesktop } from '@/composables/use-screen';
import { getComputeNodes } from '@/apis';
import NodeComputer from './numeric/node-computing.vue';
import NodeValidator from './numeric/node-validate.vue';
import NodeRpc from './numeric/node-rpc.vue';
import NodeRelay from './numeric/node-relay.vue';
import Background from './bg/index.vue';
type Item = {
  _id: string;
  nodeIdFormat: string;
  avgPower: string;
  reward: string;
  updateTime: string;
  updateTimeStr: string;
  createTime: string;
  runTime: string;
  startupTime: string;
};
const pageNo = ref(1);
const pageCount = ref(1);
const list = ref<Item[]>([]);
const loading = ref(false);
const route = useRoute();
const router = useRouter();
const isSmallDesktop = useIsSmallDesktop();
const isDesktop = useIsDesktop();

const inputSearchValue = ref('');
onActivated(() => {
  if (route.meta.isBack) {
    init();
  } else {
    pageNo.value = 1;
    pageCount.value = 1;
    list.value = [];
    init();
  }
});

function formatNodeType(status: number) {
  if (status === 11) {
    return { name: 'Validate', color: '#6EA6BF', bgColor: '#2F454A' };
  } else if (status === 12) {
    return { name: 'RPC', color: '#74BF6E', bgColor: '#2F4A3D' };
  } else if (status === 13) {
    return { name: 'Relay', color: '#BF946E', bgColor: '#4A462F' };
  } else {
    return { name: 'Computing', color: '#A16EBF', bgColor: '#402F4A' };
  }
}

const init = async () => {
  loading.value = true;
  const resp = await getComputeNodes({ page: pageNo.value, size: 10 });
  loading.value = false;
  const nodeList: any[] = [];
  (resp.list || []).forEach((item: any) => {
    item.nodeIdFormat = Utils.formatAddress(item._id, 11);
    item.updateTimeStr = moment(item.updateTime).format('YYYY-MM-DD hh:mm');
    item.runTime = item.runTime === item.startupTime ? '--' : Utils.formatDate(item.runTime);
    item.type = formatNodeType(item.status);
    item.gpus = item.gpus;
    item.cpus = item.cpus;
    item.memory = item.memory;
    nodeList.push(item);
  });
  const total = resp.total || 0;
  list.value = nodeList;
  pageCount.value = Math.ceil(total / 10);
};

const handlePageChange = (currentPage: number) => {
  pageNo.value = currentPage;
  init();
};

const onPressSearch = async () => {
  router.push({ name: 'node-detail', params: { id: inputSearchValue.value } });
};
</script>
<style scoped>
.page {
  position: relative;
  padding-top: 48px;
  z-index: 1;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: calc(var(--footer-height) + 48px);
}

.tools {
  /* border-bottom: solid 1px #6b5d9e; */
}

.filter {
  background-color: #1c2025;
  padding: 0 12px;
  border-radius: 4px;
}

.filter-icon {
  margin-right: 8px;
  width: 16px;
  height: 16px;
}
.filter-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100px;
}
.filter-content-text {
  color: #ffffff;
}

.filter-content-icon {
  margin-left: 8px;
  width: 16px;
  height: 16px;
}

.search {
  display: flex;
  align-items: center;
  display: flex;
  height: 40px;
  padding: 0 12px;
  background-color: #1c2025;
  border-radius: 4px;
  /* border: 1px solid #6b5d9e; */
  /* background: linear-gradient(70deg, rgba(255, 255, 255, 0) 0.01%, rgba(255, 255, 255, 0.08) 100%); */
  /* backdrop-filter: blur(21px); */
}

.search-input {
  margin-left: 12px;
  width: 100%;
  height: 100%;
  line-height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: #fff;
}

.node {
  margin-top: 24px;
  min-height: 682px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.node-header {
  margin-bottom: 16px;
}

.node-header-text {
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  font-family: Oxanium;
}
.node-header-subtitle-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}

.node-header-subtitle {
  color: #a0aec0;
  font-size: 12px;
  font-weight: 400;
}

.node-list {
  min-height: 560px;
  border-radius: 4px;
  box-sizing: border-box;
}

.node-list-theader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  background-color: #1c2025;
  margin-bottom: 2px;
}

.node-list-theader-item {
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  color: #a0aec0;
}

.node-list-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  background-color: #1c2025;
  margin-bottom: 2px;
}

.node-list-main-item {
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  cursor: pointer;
}

.node-list-main-item-badge {
  display: inline-block;
  border-radius: 1000px;
  height: 32px;
  padding: 0 12px;
  width: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination {
  text-align: center;
}
</style>
