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
import { ref, h, onMounted, onUnmounted } from 'vue';
import { NDataTable, NEllipsis, NSpace, NButton, NPagination } from 'naive-ui';
import { http } from '@/tools/http';
import { ethers } from 'ethers';
import moment from 'moment';
import { Utils } from '@/tools/utils';

export type Item = {
  _id: string;
  owner: string;
  ownerFormatted: string;
  createTime: string;
  createTimeStr: string;
  amount: string;
  amountFormatted: string;
  status: number;
  statusStr: string;
  nonce: string;
};

const props = defineProps({
  nodeId: String,
  loading: Boolean,
});

const loading = ref(false);
const pageNo = ref(1);
const pageSize = ref(20);
const pageCount = ref(0);
const list = ref<Item[]>([]);
const pendingTimerConfig = { interval: 3000, stop: false };
const pendingWatches = ref<{ [id: string]: number }>({});
const columns: any = ref([
  {
    title: 'Beneficiary',
    key: 'owner',
    width: 200,
    render(row: Item) {
      return h('span', {}, { default: () => row.ownerFormatted });
    },
  },
  {
    title: 'Amount',
    key: 'amount',
    width: 200,
    render(row: Item) {
      return h(NEllipsis, { style: 'width:140px' }, { default: () => h('span', {}, { default: () => `${row.amountFormatted} EMC` }) });
    },
  },
  {
    title: 'Create Date',
    key: 'createTime',
    width: 200,
    render(row: Item) {
      return h(NEllipsis, { style: 'width:188px' }, { default: () => h('span', {}, { default: () => row.createTimeStr }) });
    },
  },
  {
    title: 'Status',
    key: 'statusStr',
    width: 200,
    render(row: Item) {
      return h(NSpace, { algin: 'center', wrapItem: false, size: [8, 0] }, { default: () => h('span', {}, { default: () => row.statusStr }) });
    },
  },
]);

const StatusText = ['Pending', 'Complete', 'Revoke'];

async function handlePendingTimer() {
  if (pendingTimerConfig.stop) return;
  const before = new Date().getTime();
  const ids = Object.keys(pendingWatches.value);
  if (ids.length > 0) {
    const resp = await http.get({
      url: '/nodebill/preclaimlog',
      data: { ids: ids.join(','), page: 1, size: 9999, nodeId: props.nodeId },
      noAutoHint: true,
    });
    const origins: any = {};
    list.value.forEach((item, index) => {
      origins[item._id] = index;
    });
    (resp.data || []).forEach((item: any) => {
      const atIndex = pendingWatches.value[item._id];
      const originIndex = origins[item._id];

      if (typeof atIndex === 'undefined' || typeof originIndex === 'undefined') return;

      if (atIndex === originIndex) {
        const originItem = list.value[atIndex];
        const status = item.status;
        const statusStr = StatusText[item.status];
        list.value.splice(atIndex, 1, { ...originItem, status, statusStr });
        if (status !== 0) {
          delete pendingWatches.value[item._id];
        }
      }
    });
  } else {
    // console.info(`pendingWatches length is 0`);
  }
  const end = new Date().getTime();
  const diff = pendingTimerConfig.interval - (end - before);
  if (diff > 0) {
    // console.info(`query claim logs wait ${diff} ms`);
    await new Promise((resolve) => setTimeout(resolve, diff));
  }
  if (!pendingTimerConfig.stop) {
    handlePendingTimer();
  }
}

async function initList() {
  list.value = [];
  pageCount.value = 0;
  updateList();
}

async function updateList() {
  loading.value = true;
  const resp = await http.get({
    url: '/nodebill/preclaimlog',
    data: {
      page: pageNo.value,
      size: pageSize.value,
      nodeId: props.nodeId,
    },
    noAutoHint: true,
  });
  loading.value = false;
  const newList: Item[] = [];
  const newPendingWatches: any = {};
  const now = new Date().getTime();
  (resp.data || []).forEach((item: any, index: number) => {
    const createTime = new Date(item.createTime).getTime();
    // const diffTime = now - createTime;
    // ${Utils.formatDate(diffTime)} ago
    const createTimeStr = `${moment(createTime).utc().format('MMMM DD HH:mm UTC YYYY')}`;
    const ownerFormatted = Utils.textOverflow(item.owner);
    const amountFormatted = ethers.formatUnits(item.amount, 18);
    const statusStr = StatusText[item.status];
    newList.push({ ...item, ownerFormatted, createTimeStr, amountFormatted, statusStr });
    if (item.status === 0) {
      newPendingWatches[item._id] = index;
    }
  });
  list.value = newList;
  pendingWatches.value = newPendingWatches;
  pageCount.value = Math.ceil(resp.total / pageSize.value);

  if (Object.keys(newPendingWatches).length > 0) {
    pendingTimerConfig.stop = false;
  } else {
    pendingTimerConfig.stop = true;
  }
  handlePendingTimer();
}

function handlePageChange(page: number) {
  pageNo.value = page;
  updateList();
}

onMounted(() => {
  initList();
});

onUnmounted(() => {
  pendingTimerConfig.stop = true;
});
</script>
