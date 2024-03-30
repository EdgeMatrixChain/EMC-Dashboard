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
          <RouterLink class="item" :to="{ name: 'node-detail', params: { id: item._id } }">
            <div class="item-badge">
              <img class="item-badge-icon" :src="item.type.icon" />
              <span class="item-badge-text" :style="{ color: item.type.color }">{{ item.type.name }}</span>
            </div>
            <div class="item-content">
              <div class="item-row">
                <span class="text-[14px]">{{ item.nodeIdFormat }}</span>
              </div>
              <div class="item-row">
                <div class="badge">
                  <div class="badge-label">
                    <span>CPU</span>
                  </div>
                  <div class="badge-value">
                    <span>{{ item.cpus || '-' }}</span>
                    <span class="badge-value-unit">cors</span>
                  </div>
                </div>
                <div class="badge">
                  <div class="badge-label">
                    <span>GPU</span>
                  </div>
                  <div class="badge-value">
                    <span>{{ item.gpus || '-' }}</span>
                  </div>
                </div>
                <div class="badge">
                  <div class="badge-label">
                    <span>RAM</span>
                  </div>
                  <div class="badge-value">
                    <span>{{ item.memory || '-' }}</span>
                    <span class="badge-value-unit">GB</span>
                  </div>
                </div>
              </div>
            </div>
          </RouterLink>
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
}

.item {
  display: block;
}

.item:not(:last-child) {
  margin-bottom: 16px;
}

.item-badge {
  display: flex;
  align-items: center;
  background-color: #1c2025;
  width: 120px;
  height: 24px;
  padding: 8px 8px 0;
  gap: 0 8px;
  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0% 100%);
}

.item-badge-icon {
  width: 16px;
}
.item-badge-text {
  font-size: 12px;
}

.item-content {
  background-color: #1c2025;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8px 0;
  padding: 12px 16px;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 0 8px;
}

.badge {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 4px;
  width: 56px;
}

.badge-label {
  font-size: 12px;
  color: var(--text-color2);
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
  background-color: #1c2025;
  position: relative;
}

.list-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
