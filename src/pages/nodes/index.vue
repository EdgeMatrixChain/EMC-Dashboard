<template>
  <Background>
    <div class="page relative" style="margin: auto">
      <div class="section !mb-20">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-[16px] sm:gap-[24px]">
          <div class="grid-cols-1 base-emc-card computing-card">
            <NodeComputer :size="numericSize" />
          </div>
          <div class="grid-cols-1 base-emc-card validator-card">
            <NodeValidator :size="numericSize" />
          </div>
          <div class="grid-cols-1 base-emc-card rpc-card">
            <NodeRpc :size="numericSize" />
          </div>
          <div class="grid-cols-1 base-emc-card relay-card">
            <NodeRelay :size="numericSize" />
          </div>
        </div>
      </div>
      <div class="section node base-emc-card">
        <div class="node-grid">
          <div class="node-header">
            <div class="node-header-row">
              <span class="node-title">Node List</span>
            </div>
            <div class="node-header-row">
              <img class="node-subtitle-icon" src="@/assets/icon_check.svg" />
              <span class="node-subtitle-text">Last 6 hours of updates</span>
            </div>
          </div>
          <div class="node-tools">
            <template v-if="!queries.keywords">
              <Filter v-model:value="filterOptionVal" @update:value="onFilterDropdownUpdate" />
            </template>
            <Search v-model:value="filterInputVal" :show-clear="Boolean(queries.keywords)" @search="onFilterSearch" />
          </div>
        </div>
        <template v-if="isMobile">
          <ListMobile :list="list" :page-no="pageNo" :page-count="pageCount" :loading="loading"
            @paging="handlePageChange" />
        </template>
        <template v-else>
          <ListDesktop :list="list" :page-no="pageNo" :page-count="pageCount" :loading="loading"
            @paging="handlePageChange" />
        </template>
      </div>
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
import { ref, computed, onActivated } from 'vue';
import { useThrottleFn } from '@vueuse/core';
import { Utils } from '@/tools/utils';
import { useRoute } from 'vue-router';
import moment from 'moment';
import { useIsMobile } from '@/composables/use-screen';
import { getNodes, getNodeTypes } from '@/apis';
import NodeComputer from './numeric/node-computing.vue';
import NodeValidator from './numeric/node-validate.vue';
import NodeRpc from './numeric/node-rpc.vue';
import NodeRelay from './numeric/node-relay.vue';
import Background from './bg/index.vue';
import Filter from './filter.vue';
import Search from './search.vue';
import ListDesktop from './list.desktop.vue';
import ListMobile from './list.mobile.vue';
import IconComputer from './numeric/icons/icon_computer.svg';
import IconRelay from './numeric/icons/icon_relay.svg';
import IconRPC from './numeric/icons/icon_rpc.svg';
import IconValidator from './numeric/icons/icon_validator.svg';

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
const route = useRoute();
const isMobile = useIsMobile();
const { list: nodeTypeList, map: nodeTypeMap } = getNodeTypes();

const numericSize = computed(() => (isMobile.value ? 'small' : 'large'));
const list = ref<Item[]>([]);
const queries = ref<any>({
  status: '-1',
  keywords: '',
});
const pageNo = ref(1);
const pageSize = ref(20);
const pageCount = ref(1);
const loading = ref(false);

const filterOptionVal = ref('');
const filterInputVal = ref('');

onActivated(() => {
  if (route.meta.isBack) {
    updateList();
  } else {
    initList();
  }
});

function formatNodeType(status: number) {
  let name = nodeTypeMap[status].name;
  let color = '';
  let bgColor = '';
  let icon = '';
  if (status === 11) {
    color = '#1ED6FF';
    bgColor = '#1ED6FF1A';
    icon = IconValidator;
  } else if (status === 12) {
    color = '#268AFF';
    bgColor = '#268AFF1A';
    icon = IconRPC;
  } else if (status === 13) {
    color = '#5A3FFF';
    bgColor = '#5A3FFF33';
    icon = IconRelay;
  } else {
    color = '#3DFFDC';
    bgColor = '#3DFFDC26';
    icon = IconComputer;
  }
  return { name, color, bgColor, icon };
}

const initList = useThrottleFn(async () => {
  pageNo.value = 1;
  pageCount.value = 1;
  list.value = [];
  updateList();
}, 60);

const updateList = async () => {
  loading.value = true;
  const now = new Date().getTime();
  const htbegin = now - 360 * 60000;
  const htend = now + 60 * 60000;
  const queriesValue = queries.value;
  const params: any = {};
  if (queriesValue.keywords) {
    params.keywords = queriesValue.keywords;
  } else {
    params.status = queriesValue.status === '-1' ? void 0 : queriesValue.status;
  }
  const resp = await getNodes({ page: pageNo.value, size: pageSize.value, htbegin, htend, ...params });
  loading.value = false;
  const nodeList: any[] = [];
  (resp.list || []).forEach((item: any) => {
    item.nodeIdFormat = Utils.formatAddress(item._id, 11);
    item.updateTimeStr = moment(item.heartTime).format('YYYY-MM-DD HH:mm');
    item.runTime = item.runTime === item.startupTime ? '--' : Utils.formatDate(item.runTime);
    item.type = formatNodeType(item.status);
    item.gpus = item.gpus;
    item.cpus = item.cpus;
    item.memory = item.memory;
    nodeList.push(item);
  });
  const total = resp.total || 0;
  list.value = nodeList;
  pageCount.value = Math.ceil(total / pageSize.value);
};

const handlePageChange = (currentPage: number) => {
  pageNo.value = currentPage;
  updateList();
};

const onFilterDropdownUpdate = (key: any) => {
  const queriesValue = queries.value;
  // if (queriesValue.status === key) return;
  queriesValue.status = key;
  initList();
};

const onFilterSearch = () => {
  const queriesValue = queries.value;
  queriesValue.keywords = filterInputVal.value;
  initList();
};
</script>
<style scoped>

.computing-card {
  border-color: rgba(103, 95, 255, 0.5);
  border-top-image: linear-gradient(325.43deg, rgba(255, 255, 255, 0) 32.53%, rgba(103, 95, 255, 0.5) 84.84%);
  border-left-image: linear-gradient(325.43deg, rgba(255, 255, 255, 0) 32.53%, rgba(103, 95, 255, 0.5) 84.84%);
  background: linear-gradient(0deg, rgba(200, 139, 196, 0.01), rgba(200, 139, 196, 0.01)),
    linear-gradient(180deg, rgba(243, 238, 255, 0) 0%, rgba(243, 238, 255, 0.04) 100%),
    radial-gradient(158% 158% at 7.54% 14.18%, rgba(99, 77, 232, 0.2) 0%, rgba(17, 17, 21, 0.2) 39.37%);
}

.validator-card {
  border-color: rgba(152, 68, 237, 0.5);
  border-top-image: linear-gradient(325.43deg, rgba(255, 255, 255, 0) 32.53%, rgba(152, 68, 237, 0.5) 84.84%);
  border-left-image: linear-gradient(325.43deg, rgba(255, 255, 255, 0) 32.53%, rgba(152, 68, 237, 0.5) 84.84%);
  background: linear-gradient(0deg, rgba(200, 139, 196, 0.01), rgba(200, 139, 196, 0.01)),
    linear-gradient(180deg, rgba(243, 238, 255, 0) 0%, rgba(243, 238, 255, 0.04) 100%),
    radial-gradient(158% 158% at 7.54% 14.18%, rgba(152, 68, 237, 0.2) 0%, rgba(17, 17, 21, 0.2) 39.37%);
}

.rpc-card {
  border-color: rgba(84, 108, 234, 0.5);
  border-top-image: linear-gradient(325.43deg, rgba(255, 255, 255, 0) 32.53%, rgba(84, 108, 234, 0.5) 84.84%);
  border-left-image: linear-gradient(325.43deg, rgba(255, 255, 255, 0) 32.53%, rgba(84, 108, 234, 0.5) 84.84%);
  background: linear-gradient(0deg, rgba(200, 139, 196, 0.01), rgba(200, 139, 196, 0.01)),
linear-gradient(180deg, rgba(243, 238, 255, 0) 0%, rgba(243, 238, 255, 0.04) 100%),
radial-gradient(158% 158% at 7.54% 14.18%, rgba(84, 108, 234, 0.2) 0%, rgba(17, 17, 21, 0.2) 39.37%);
}

.relay-card {
  border-color: rgba(127, 200, 252, 0.5);
  border-top-image: linear-gradient(325.43deg, rgba(255, 255, 255, 0) 32.53%, rgba(127, 200, 252, 0.5) 84.84%);
  border-left-image: linear-gradient(325.43deg, rgba(255, 255, 255, 0) 32.53%, rgba(127, 200, 252, 0.5) 84.84%);
  background: linear-gradient(0deg, rgba(200, 139, 196, 0.01), rgba(200, 139, 196, 0.01)),
linear-gradient(180deg, rgba(243, 238, 255, 0) 0%, rgba(243, 238, 255, 0.04) 100%),
radial-gradient(158% 158% at 7.54% 14.18%, rgba(127, 200, 252, 0.2) 0%, rgba(17, 17, 21, 0.2) 39.37%);
}

.page {
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  padding-bottom: 100px; 
}

.section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.node {
  border-color: rgba(103, 95, 255, 0.5);
  border-top-image: linear-gradient(325.43deg, rgba(255, 255, 255, 0) 32.53%, rgba(103, 95, 255, 0.5) 84.84%);
  border-left-image: linear-gradient(325.43deg, rgba(255, 255, 255, 0) 32.53%, rgba(103, 95, 255, 0.5) 84.84%);
  background: linear-gradient(0deg, rgba(200, 139, 196, 0.01), rgba(200, 139, 196, 0.01)),
linear-gradient(180deg, rgba(243, 238, 255, 0) 0%, rgba(243, 238, 255, 0.04) 100%),
linear-gradient(0deg, #111318, #111318);
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
}

.node-grid {
  display: flex;
  flex-direction: column;
  gap: 16px 0;
}

.node-header {
  display: flex;
  flex-direction: column;
  gap: 8px 0;
}

.node-header-row {
  display: flex;
  align-items: center;
  gap: 0 8px;
}

.node-title {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  font-family: GeneralSans-Semibold;
}

.node-subtitle-icon {
  width: 14px;
  height: 14px;
}

.node-subtitle-text {
  color: #A6B6D1;
  font-size: 14px;
  font-weight: 500;
}

.node-tools {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0 16px;
}

@media (min-width: 640px) {
  .node {
    padding: 24px;
    gap: 24px 0;
  }

  .node-grid {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 0;
  }

  .node-tools {
    width: auto;
  }

  .node-title {
    font-size: 24px;
  }
}
</style>
