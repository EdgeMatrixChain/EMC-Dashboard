<template>
  <NDataTable :columns="columns" :data="data" :loading="loading" size="small" :pagination="false" :max-height="480"
    striped />
</template>
  
<script lang="ts">
import { defineComponent, ref, PropType, h } from 'vue';
import { NDataTable, NEllipsis, NButton } from 'naive-ui';
import { ethers } from 'ethers';
import moment from 'moment';

export type Item = {
  nodeId: string;
  apiType: number; //0 sd 2 llma
  totalCredit: number;
  totalReward: string;
  lastTaskId: number;
  stakeRatio: string;
  stakeToken: string;
  stakeTokenInPool: string;
  status: number;
  createTime: string;
  updateTime: string;
};

export default defineComponent({
  components: {
    NDataTable,
  },
  props: {
    data: { type: Array as PropType<Item[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },
  emits: ['item'],
  setup(props, ctx) {
    const ApiText = ['Stable Diffsuion', '', 'LLaMA'];
    const columns: any = ref([
      {
        title: 'Create Time', key: 'createTime', align: 'center', render(row: Item) {
          return h('span', {}, { default: () => moment(row.createTime).utc().format('MMMM DD HH:mm UTC YYYY') });
        },
      },
      {
        title: 'Api Type', key: 'apiType', align: 'center', render(row: Item) {
          return h('span', {}, { default: () => ApiText[row.apiType] });
        },
      },
      {
        title: 'Credit', key: 'totalCredit', align: 'center', render(row: Item) {
          return h('span', {}, { default: () => row.totalCredit });
        },
      },
      {
        title: 'Reward', key: 'totalReward', align: 'center', render(row: Item) {
          return h('span', {}, { default: () => row.totalReward });
        },
      },

    ]);

    return {
      columns,
    };
  },
});
</script>