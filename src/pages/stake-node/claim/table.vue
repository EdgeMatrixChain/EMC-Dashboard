<template>
  <NDataTable :columns="columns" :data="data" :loading="loading" size="small" :pagination="false" :max-height="480"
    striped />
</template>
  
<script lang="ts">
import { defineComponent, ref, PropType, h } from 'vue';
import { NDataTable, NEllipsis, NButton } from 'naive-ui';
import { ethers } from 'ethers';

export type Item = {
  _id: string;
  account: string;
  amount: bigint;
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
    const StatusText = ['Wait', 'Pendding', 'Complete'];
    const columns: any = ref([
      {
        title: 'Amount', key: 'amount', align: 'center', render(row: Item) {
          return h('span', {}, { default: () => ethers.formatUnits(row.amount, 18) });
        },
      },
      {
        title: 'Status', key: 'status', align: 'center', render(row: Item) {
          return h('span', {}, { default: () => StatusText[row.status] });
        },
      },
      {
        title: 'Action', key: 'status', align: 'center', render(row: Item) {
          return h(NButton, { text: true, tag: 'a', type: 'primary', disabled: row.status !== 2, onClick: () => ctx.emit('item', row) }, { default: () => 'Claim' });
        },
      },
    ]);

    return {
      columns,
    };
  },
});
</script>