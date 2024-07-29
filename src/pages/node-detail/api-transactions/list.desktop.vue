<template>
  <div class="list">
    <div class="m-table">
      <div class="m-table-header">
        <div class="m-table-header-item w-[20%]">Task Id</div>
        <div class="m-table-header-item w-[20%] justify-center">Reward Pool</div>
        <div class="m-table-header-item w-[15%] justify-center">Application</div>
        <div class="m-table-header-item w-[15%] justify-center">Method</div>
        <div class="m-table-header-item w-[15%] justify-center">Create Date</div>
        <div class="m-table-header-item w-[15%] justify-center">Status</div>
      </div>
      <div class="m-table-body">
        <template v-if="loading">
          <div class="m-table-row-empty">
            <NSpin />
          </div>
        </template>
        <template v-else-if="list.length === 0">
          <div class="m-table-row-empty">
            <span>No Data</span>
          </div>
        </template>
        <template v-else>
          <template v-for="(item, index) in list" :key="item._id">
            <div class="m-table-row">
              <div class="m-table-row-item text-[12px] xl:text-[14px] w-[20%]">{{ item.taskSn }}</div>
              <div class="m-table-row-item text-[12px] xl:text-[14px] w-[20%] justify-center">{{ item.projectName }}</div>
              <div class="m-table-row-item text-[12px] xl:text-[14px] w-[15%] justify-center">{{ item.application || '-' }}</div>
              <div class="m-table-row-item text-[12px] xl:text-[14px] w-[15%] justify-center">{{ item.method || '-' }}</div>
              <div class="m-table-row-item text-[12px] xl:text-[14px] w-[15%] justify-center">{{ item.diffTimeStr || '-' }}</div>
              <div class="m-table-row-item text-[12px] xl:text-[14px] w-[15%] justify-center">{{ item.statusStr }}</div>
            </div>
          </template>
        </template>
      </div>
    </div>
    <div class="list-footer">
      <NPagination :page="pageNo" :disabled="loading" :page-count="pageCount" @update:page="handlePageChange" size="large" :page-slot="10" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import { RouterLink } from 'vue-router';
import { NSpin, NPagination } from 'naive-ui';
const props = defineProps({
  list: { type: Array as PropType<any[]>, default: () => [] },
  pageNo: { type: Number },
  pageCount: { type: Number },
  loading: { type: Boolean },
});

const emits = defineEmits(['paging']);

function handlePageChange(val: any) {
  emits('paging', val);
}
</script>

<style scoped>
.list {
  width: 100%;
  min-width: 1080px;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
}
.m-table {
  width: 100%;
}
.m-table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  background-color: #1c2025;
  margin-bottom: 2px;
}

.m-table-header-item {
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  color: #a0aec0;
}

.m-table-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  width: 100%;
  height: 56px;
  background-color: #1c2025;
}

.m-table-row:not(:last-child) {
  margin-bottom: 2px;
}

.m-table-row-item {
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  cursor: pointer;
}

.m-table-row-item-badge {
  display: inline-block;
  border-radius: 1000px;
  height: 32px;
  padding: 0 12px;
  width: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.m-table-row-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 560px;
  background-color: #1c2025;
  position: relative;
}

.list-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
