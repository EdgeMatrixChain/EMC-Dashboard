<template>
    <NDataTable :columns="columns" :data="data" :loading="loading" size="small" :pagination="false" :max-height="300"
        striped />
</template>
  
<script lang="ts">
import { defineComponent, ref, PropType, h } from 'vue';
import { NDataTable, NEllipsis, NButton } from 'naive-ui';
import { ethers } from 'ethers';
import moment from 'moment';

export type Item = {
    createdAt: number;
    account: string;
    receiver: string;
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
        const statusText = ['Pendding', 'Success', 'Timeout'];
        const columns: any = ref([
            {
                title: 'Create Time', key: 'createdAt', align: 'center', render(row: Item) {
                    return h('span', {}, { default: () => moment(row.createdAt).utc().format('MMMM DD HH:mm UTC YYYY') });
                },
            },
            {
                title: 'Receiver Address', key: 'receiver', align: 'center', render(row: Item) {
                    return h(NEllipsis, { style: 'width:100%' }, { default: () => h('span', {}, { default: () => row.receiver }) });
                },
            },
            {
                title: 'Amount', key: 'amount', align: 'center', render(row: Item) {
                    return h('span', {}, { default: () => ethers.formatUnits(row.amount, 18) });
                },
            },
            {
                title: 'Status', key: 'status', align: 'center', render(row: Item) {
                    return h('span', {}, { default: () => statusText[row.status] });
                },
            },
            {
                title: 'Action', key: 'status', align: 'center', render(row: Item) {
                    return h(NButton, { text: true, tag: 'a', type: 'primary', disabled: row.status !== 1, onClick: () => ctx.emit('item', row) }, { default: () => 'View cliffs' });
                },
            },
        ]);

        return {
            columns,
        };
    },
});
</script>