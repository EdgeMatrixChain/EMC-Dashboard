<template>
  <NDataTable :columns="columns" :data="data" :loading="loading" size="small" :pagination="false" :max-height="560" striped />
</template>

<script lang="ts">
import { defineComponent, ref, PropType, h } from 'vue';
import { NDataTable, NEllipsis } from 'naive-ui';
import { ethers } from 'ethers';
import moment from 'moment';
import { map as cycleUnitMap } from '@/pages/cliffs-team/cycle-unit';

export type Item = {
  account: string;
  start: number;
  cycleUnit: number;
  cycles: number;
  amount: bigint;
  released: bigint;
};

export default defineComponent({
  components: {
    NDataTable,
  },
  props: {
    data: { type: Array as PropType<Item[]>, default: () => [] },
    loading: { type: Boolean, default: false },
  },
  setup(props) {
    const columns: any = ref([
      // {
      //     title: 'Account', key: 'account', align: 'center', render(row: Item) {
      //         return h(NEllipsis, { style: 'width:100%' }, { default: () => h('span', {}, { default: () => row.account }) });
      //     },
      // },
      {
        title: 'Release Time (UTC)',
        key: 'start',
        align: 'center',
        minWidth: 120,
        render(row: Item) {
          return h(
            'span',
            {},
            {
              default: () => {
                // const begin = moment(row.start * 1000)
                //   .utc()
                //   .format('YYYY-MM-DD');
                const end = moment(row.start * 1000)
                  .add(row.cycles * cycleUnitMap[row.cycleUnit].days, 'days')
                  .utc()
                  .format('YYYY-MM-DD HH:mm');
                return `${end}`;
              },
            }
          );
        },
      },
      {
        title: 'Locked',
        key: 'amount',
        align: 'center',
        minWidth: 72,
        render(row: Item) {
          return h('span', {}, { default: () => `${ethers.formatUnits(row.amount, 18)} EMC` });
        },
      },
      {
        title: 'Claimed',
        key: 'released',
        align: 'center',
        minWidth: 72,
        render(row: Item) {
          return h('span', {}, { default: () => `${ethers.formatUnits(row.released, 18)} EMC` });
        },
      },
    ]);

    return {
      columns,
    };
  },
});
</script>
