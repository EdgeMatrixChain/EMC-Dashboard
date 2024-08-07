<template>
  <div class="list">
    <div class="m-table">
      <div class="m-table-header">
        <div class="m-table-header-item w-[25%]">Node ID</div>
        <div class="m-table-header-item w-[15%] justify-center">Type</div>
        <div class="m-table-header-item w-[15%] justify-center">CPU</div>
        <div class="m-table-header-item w-[15%] justify-center">GPU</div>
        <div class="m-table-header-item w-[15%] justify-center">RAM</div>
        <div class="m-table-header-item w-[15%] justify-center">Last Updated</div>
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
            <RouterLink class="m-table-row" :to="{ name: 'node-detail', params: { id: item._id } }">
              <div class="m-table-row-item w-[25%] text-[12px] xl:text-[14px]">{{ item.nodeIdFormat }}</div>
              <div class="m-table-row-item text-[12px] xl:text-[14px] w-[15%] justify-center">
                <div class="m-table-row-item-badge" :style="{ color: item.type.color, backgroundColor: item.type.bgColor }">{{ item.type.name }}</div>
              </div>
              <div class="m-table-row-item text-[12px] xl:text-[14px] w-[15%] justify-center">{{ item.cpus || '-' }}</div>
              <div class="m-table-row-item text-[12px] xl:text-[14px] w-[15%] justify-center">{{ item.gpus || '-' }}</div>
              <div class="m-table-row-item text-[12px] xl:text-[14px] w-[15%] justify-center">{{ item.memory || '-' }}</div>
              <div class="m-table-row-item text-[12px] xl:text-[14px] w-[15%] justify-center">{{ item.updateTimeStr }}</div>
            </RouterLink>
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
  /* margin-bottom: 2px; */
  border-bottom: 1px solid #2D343F;
}

.m-table-header-item {
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  font-weight: 500;
  color: #898B95;
}

.m-table-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  width: 100%;
  height: 56px;
  border-bottom: 1px solid #2D343F;
}

/* .m-table-row:last-child {
  border-bottom: none;
} */

/* .m-table-row:not(:last-child) {
  margin-bottom: 2px;
} */

.m-table-row-item {
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  font-family: GeneralSans-Semibold;
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
