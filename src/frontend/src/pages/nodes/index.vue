<template>
  <div class="page">
    <!-- <ScreenMask> </ScreenMask> -->
    <div class="node-list">
      <div class="node-list-header">
        <span class="node-list-header-span">Node list</span>
      </div>
      <div class="node-list-subtitle">
        <img class="node-list-subtitle-icon" src="@/assets/icon_check.svg" />
        <span class="node-list-subtitle-span">Last updated node</span>
      </div>
      <div class="node-list-table">
        <div class="node-list-theader">
          <div class="node-list-theader-item">Node ID</div>
          <div class="node-list-theader-item">Threshold value</div>
          <div class="node-list-theader-item">Model tag</div>
        </div>
        <div class="node-list-body">
          <template v-for="(item, index) in 10">
            <RouterLink :to="{ name: 'node-detail', params: { id: index } }">
              <div class="node-list-main">
                <div class="node-list-main-item">5614c96583...d9c9919547</div>
                <div class="node-list-main-item">3’503’924’809 E</div>
                <div class="node-list-main-item">LOAR/CHECKPOINT/WILDCARDS...</div>
              </div>
            </RouterLink>
          </template>
        </div>
      </div>
    </div>
    <NPagination v-model:page="page" :page-count="100" @update:page="handlePageChange"></NPagination>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NPagination } from 'naive-ui';
const page = ref(1);

const handlePageChange = (page: number) => {
  console.log('当前页码：' + page);
};
</script>

<style scoped>
.node-list {
  width: 100%;
  padding: 24px 24px 4px;
  border-radius: 15px;
  background-color: #1c2025;
  backdrop-filter: blur(60px);
}
.node-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.node-list-header-span {
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  line-height: 18px;
}

.node-list-subtitle {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.node-list-subtitle-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}
.node-list-subtitle-span {
  color: #a0aec0;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}

.node-list-theader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
}

.node-list-theader-item {
  width: 100%;
  color: #a0aec0;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
}

.node-list-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  border-top: 1px solid #56577a;
}
.node-list-main-item {
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 56px;
  cursor: pointer;
}
</style>
