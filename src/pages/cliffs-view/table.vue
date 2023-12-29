<template>
    <NDataTable :columns="columns" :data="data" :loading="loading" size="small" :pagination="false" :max-height="300"
        striped />
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
                title: 'Start Time', key: 'start', align: 'center', render(row: Item) {
                    return h('span', {}, { default: () => moment(row.start * 1000).utc().format('YYYY-MM-DD') });
                },
            },
            {
                title: 'Duration Unit', key: 'cycleUnit', align: 'center', render(row: Item) {
                    return h('span', {}, { default: () => cycleUnitMap[row.cycleUnit].label });
                },
            },
            {
                title: 'Duration', key: 'cycles', align: 'center', render(row: Item) {
                    return h('span', {}, { default: () => row.cycles });
                },
            },
            {
                title: 'Total Amount', key: 'amount', align: 'center', render(row: Item) {
                    return h('span', {}, { default: () => ethers.formatUnits(row.amount, 18) });
                },
            },
            {
                title: 'Released Amount', key: 'released', align: 'center', render(row: Item) {
                    return h('span', {}, { default: () => ethers.formatUnits(row.released, 18) });
                },
            },
        ]);

        return {
            columns,
        };
    },
});
</script>