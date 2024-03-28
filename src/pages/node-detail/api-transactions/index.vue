<template>
  <div>
    <NDataTable :columns="columns" :data="list" :loading="loading" size="small" :pagination="false" striped>
      <template #empty>
        <span>No Data</span>
      </template>
    </NDataTable>
    <NSpace class="mt-[16px]" justify="end" :wrap-item="false">
      <NPagination v-model:page="pageNo" :disabled="loading" :page-count="pageCount" @update:page="handlePageChange" size="large" />
    </NSpace>
  </div>
</template>

<script lang="ts" setup>
import { ref, h, onMounted } from 'vue';
import { NDataTable, NEllipsis, NSpace, NPagination } from 'naive-ui';
import { http } from '@/tools/http';
import { Utils } from '@/tools/utils';
import moment from 'moment';

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
};

const props = defineProps({
  nodeId: String,
  loading: Boolean,
});

defineEmits(['item']);

const loading = ref(false);
const pageNo = ref(1);
const pageSize = ref(20);
const pageCount = ref(0);
const list = ref<Item[]>([]);

const columns: any = ref([
  {
    title: 'Task Id',
    key: 'taskSn',
    render(row: Item) {
      return h(NEllipsis, { style: 'width:160px' }, { default: () => h('span', {}, { default: () => row.taskSn }) });
    },
  },
  {
    title: 'Application',
    key: 'application',
    render(row: Item) {
      return h(NEllipsis, { style: 'width:140px' }, { default: () => h('span', {}, { default: () => row.application }) });
    },
  },
  {
    title: 'Method',
    key: 'method',
    render(row: Item) {
      return h(NEllipsis, { style: 'width:140px' }, { default: () => h('span', {}, { default: () => row.method }) });
    },
  },
  {
    title: 'Create Date', //Age
    key: 'diffTimeStr',
    render(row: Item) {
      return h(NEllipsis, { style: 'width:188px' }, { default: () => h('span', {}, { default: () => row.diffTimeStr }) });
    },
  },
  {
    title: 'Status',
    key: 'statusStr',
    render(row: Item) {
      return h(NEllipsis, { style: 'width:140px' }, { default: () => h('span', {}, { default: () => row.statusStr }) });
    },
  },
  {
    title: 'Credit',
    key: 'credit',
    render(row: Item) {
      return h(NEllipsis, { style: 'width:140px' }, { default: () => h('span', {}, { default: () => row.credit }) });
    },
  },
]);

const StatusText = ['Wait', 'Pending', 'Complete', 'Failed'];
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

async function initList() {
  list.value = [];
  pageCount.value = 0;
  updateList();
}

async function updateList() {
  loading.value = true;
  const resp = await http.get({
    url: 'https://openapi.emchub.ai/emchub/api/client/open/queryApiList',
    data: {
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      nodeId: props.nodeId,
    },
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
    const diffTimeStr = `${moment(createTime).utc().format('MMMM DD HH:mm UTC YYYY')}`;
    newList.push({ id, taskSn, application, method, status, statusStr, createTime, diffTimeStr, credit });
  });
  list.value = newList;
  pageCount.value = Math.ceil(pageInfo.total / pageSize.value);
}

function handlePageChange(page: number) {
  pageNo.value = page;
  updateList();
}

onMounted(() => {
  initList();
});
</script>
