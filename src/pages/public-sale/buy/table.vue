<template>
  <NDataTable :columns="columns" :data="data" :loading="loading" size="small" :pagination="false" :max-height="300" striped />
</template>

<script lang="ts">
import { defineComponent, ref, PropType, h } from 'vue';
import { NDataTable, NEllipsis, NButton, NSpace, NText } from 'naive-ui';
import { ethers } from 'ethers';
import moment from 'moment';

export type Item = {
  createdAt: number;
  account: string;
  receiver: string;
  amount: bigint;
  expireTime: number;
  expireTimeStr: string;
  status: number;
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
    const statusText = ['Pendding', 'Success', 'Timeout'];
    const columns: any = ref([
      {
        title: 'Create Time',
        key: 'createdAt',
        align: 'center',
        render(row: Item) {
          return h('span', {}, { default: () => moment(row.createdAt).utc().format('MMMM DD HH:mm UTC YYYY') });
        },
      },
      {
        title: 'Receiver Address',
        key: 'receiver',
        align: 'center',
        render(row: Item) {
          return h(NEllipsis, { style: 'width:100%' }, { default: () => h('span', {}, { default: () => row.receiver }) });
        },
      },
      {
        title: 'Amount',
        key: 'amount',
        align: 'center',
        render(row: Item) {
          return h('span', {}, { default: () => ethers.formatUnits(row.amount, 18) });
        },
      },
      {
        title: 'Status',
        key: 'status',
        align: 'center',
        render(row: Item) {
          if (row.status === 0) {
            return h(
              NSpace,
              { vertical: true, wrapItem: false, size: [0, 0] },
              {
                default: () => [
                  h('span', {}, { default: () => statusText[row.status] }),
                  h(NText, { class: 'text-[12px]', depth: 3 }, { default: () => `Remain ${row.expireTimeStr}` }),
                ],
              }
            );
          } else {
            return h('span', {}, { default: () => statusText[row.status] });
          }
        },
      },
      {
        title: 'Action',
        key: 'status',
        align: 'center',
        render(row: Item) {
          return h(
            NButton,
            { text: true, tag: 'a', type: 'primary', disabled: row.status !== 1, onClick: () => ctx.emit('item', row) },
            { default: () => 'View locks' }
          );
        },
      },
    ]);

    return {
      columns,
    };
  },
});
</script>
