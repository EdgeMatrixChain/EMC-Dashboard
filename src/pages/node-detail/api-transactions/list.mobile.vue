<template>
  <div class="list">
    <div class="list-body">
      <template v-if="loading">
        <div class="item-empty">
          <NSpin />
        </div>
      </template>
      <template v-else-if="list.length === 0">
        <div class="item-empty">
          <span>No Data</span>
        </div>
      </template>
      <template v-else>
        <template v-for="(item, index) in list" :key="item._id">
          <div class="item" :to="{ name: 'node-detail', params: { id: item._id } }">
            <div class="item-content">
              <div class="item-row">
                <div class="badge">
                  <div class="badge-label">
                    <span>Task Id</span>
                  </div>
                  <div class="badge-value">
                    <span class="text-[14px]">{{ item.taskSn }}</span>
                  </div>
                </div>
              </div>
              <div class="item-row">
                <div class="badge">
                  <div class="badge-label">
                    <span>Reward Pool</span>
                  </div>
                  <div class="badge-value">
                    <span>{{ item.projectName }}</span>
                  </div>
                </div>
                <div class="badge">
                  <div class="badge-label">
                    <span>Application</span>
                  </div>
                  <div class="badge-value">
                    <span>{{ item.application }}</span>
                  </div>
                </div>
                <div class="badge">
                  <div class="badge-label">
                    <span>Method</span>
                  </div>
                  <div class="badge-value">
                    <span>{{ item.method }}</span>
                  </div>
                </div>
                <div class="badge">
                  <div class="badge-label">
                    <span>Status</span>
                  </div>
                  <div class="badge-value">
                    <span>{{ item.statusStr }}</span>
                  </div>
                </div>
                <div class="badge">
                  <div class="badge-label">
                    <span>Create Date</span>
                  </div>
                  <div class="badge-value">
                    <span>{{ item.diffTimeStr }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
    <div class="list-footer">
      <NPagination :page="pageNo" :disabled="loading" :page-count="pageCount" @update:page="handlePageChange" size="small" :page-slot="2" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
}

.item {
  display: block;
  border-radius: 4px;
  /* background-color: #1c2025; */
}

.item:not(:last-child) {
  margin-bottom: 16px;
}

.item-content {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 16px 0;
  /* padding: 12px 16px; */
}

.item-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px 16px;
}

.badge {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 4px;
  min-width: 56px;
}

.badge-label {
  font-size: 12px;
  color: var(--text-color1);
}

.badge-value {
  font-size: 12px;
}

.badge-value-unit {
  font-size: 12px;
  color: var(--text-color2);
}

.item-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 320px;
  /* background-color: #1c2025; */
  position: relative;
}

.list-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
