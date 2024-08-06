<template>
  <div class="base-emc-card list-wrapper">
    <!-- <ListDesktop :list="list" :page-no="pageNo" :page-count="pageCount" :loading="loading" @paging="handlePageChange" /> -->
    <template v-if="isMobile">
      <ListMobile :list="list" :page-no="pageNo" :page-count="pageCount" :loading="loading" @paging="handlePageChange" />
    </template>
    <template v-else>
      <ListDesktop :list="list" :page-no="pageNo" :page-count="pageCount" :loading="loading" @paging="handlePageChange" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { http } from '@/tools/http';
import moment from 'moment';
import { useIsMobile } from '@/composables/use-screen';
import ListDesktop from './list.desktop.vue';
import ListMobile from './list.mobile.vue';

const props = defineProps({
  nodeId: String,
  loading: Boolean,
});

export type Item = {
  id: number;
  taskSn: string;
  application: string;
  method: string;
  status: number;
  statusStr: string;
  createTime: number;
  diffTimeStr: string;
  credit: number;
  projectName: string;
};

const isMobile = useIsMobile();
const list = ref<Item[]>([]);
const pageNo = ref(1);
const pageSize = ref(20);
const pageCount = ref(1);
const loading = ref(false);
const StatusText = ['Wait', 'Pending', 'Complete', 'Failed', 'Timeout'];
const APIs = [
  { application: 'LLM', method: 'Chat', path: '/hubapi/v1/llm/chat/completions' },
  { application: 'StableDiffsuion', method: 'TextToImage', path: null },
  { application: 'StableDiffsuion', method: 'TextToImage', path: '/hubapi/v1/txt2img' },
  { application: 'StableDiffsuion', method: 'TextToImage', path: '/sdapi/v1/txt2img' },
];

function formatApiPath(path: string, appOrigin: string) {
  const item = APIs.find((item) => path === item.path);
  if (!item) {
    const paths = path.split('/');
    return { application: appOrigin || 'Unknow', method: paths[paths.length - 1] };
  }
  return item;
}

onMounted(() => {
  initList();
});

const initList = () => {
  list.value = [];
  pageNo.value = 1;
  pageCount.value = 0;
  updateList();
};

const updateList = async () => {
  loading.value = true;
  const resp = await http.get({
    url: 'https://openapi.emchub.ai/emchub/api/client/open/queryApiList',
    data: { pageNo: pageNo.value, pageSize: pageSize.value, nodeId: props.nodeId },
    noAutoHint: true,
  });
  loading.value = false;
  const pageInfo = resp.pageInfo || { total: 0, list: [] };
  const newList: Item[] = [];
  const now = new Date().getTime();
  (pageInfo.list || []).forEach((item: any) => {
    const { application, method } = formatApiPath(item.apiPath, item.appOrigin) || { application: '', method: '' };
    const id = item.id;
    const taskSn = item.taskSn;
    const credit = item.credit;
    const status = item.status;
    const statusStr = StatusText[item.status];
    const createTime = new Date(item.createTime).getTime();
    const diffTime = now - createTime;
    //${Utils.formatDate(diffTime)} ago
    const diffTimeStr = `${moment(createTime).utc().format('MMMM DD HH:mm:ss UTC YYYY')}`;
    const projectName = item.projectName;
    newList.push({ id, taskSn, application, method, status, statusStr, createTime, diffTimeStr, credit, projectName });
  });
  list.value = newList;
  pageCount.value = Math.ceil(pageInfo.total / pageSize.value);
};

const handlePageChange = (currentPage: number) => {
  pageNo.value = currentPage;
  updateList();
};
</script>
<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px 0;
}

.list-wrapper {
  padding: 24px;
  border-color: rgba(103, 95, 255, 0.5);
  border-top-image: linear-gradient(325.43deg, rgba(255, 255, 255, 0) 32.53%, rgba(103, 95, 255, 0.5) 84.84%);
  border-left-image: linear-gradient(325.43deg, rgba(255, 255, 255, 0) 32.53%, rgba(103, 95, 255, 0.5) 84.84%);
  background: linear-gradient(0deg, rgba(200, 139, 196, 0.01), rgba(200, 139, 196, 0.01)),
linear-gradient(180deg, rgba(243, 238, 255, 0) 0%, rgba(243, 238, 255, 0.04) 100%),
linear-gradient(0deg, #111318, #111318);
}

.section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.node {
  background-color: rgba(0, 0, 0, 0.1);
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
  font-weight: 500;
  font-family: Oxanium;
}

.node-subtitle-icon {
  width: 14px;
  height: 14px;
}

.node-subtitle-text {
  color: #a0aec0;
  font-size: 12px;
  font-weight: 400;
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
