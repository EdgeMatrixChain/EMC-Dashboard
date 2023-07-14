<template>
  <div class="page">
    <div class="mask-bgcolor-left"></div>
    <div class="page-node">
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
            <div class="node-list-theader-item">E Power</div>
            <div class="node-list-theader-item">Model Tag</div>
          </div>
          <div class="node-list-body">
            <template v-for="(item, index) in paginatedData" :key="index">
              <RouterLink :to="{ name: 'node-detail', params: { id: index } }">
                <div class="node-list-main">
                  <div class="node-list-main-item">{{ item.id }}</div>
                  <!-- <div class="node-list-main-item">{{ item.power }}</div>
                <div class="node-list-main-item">{{ item.model }}</div> -->
                </div>
              </RouterLink>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!--v-model:page-size="pageSize" show-size-picker :page-sizes="[10]" -->
    <NSpace class="pagination" justify="center">
      <NPagination v-model:page="page" :page-count="pageCount" @update:page="handlePageChange" size="large" />
    </NSpace>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { NPagination, NSpace, NButton } from 'naive-ui';

export default defineComponent({
  name: 'nodes',
  components: { NPagination, NSpace, NButton },

  setup() {
    const page = ref(1);
    const pageSize: number = 10;
    const tableData = ref([
      // 100条数据
      { id: '1' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
      { id: '21' },
    ]);

    const totalDataCount = computed(() => tableData.value.length);
    const pageCount = computed(() => Math.ceil(totalDataCount.value / pageSize));
    const paginatedData = computed(() => {
      const startIndex = (page.value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return tableData.value.slice(startIndex, endIndex);
    });

    const handlePageChange = (currentPage: number) => {};

    return {
      page,
      pageCount,
      paginatedData,
      handlePageChange,
    };
  },
});
</script>

<style scoped>
.mask-bgcolor-left {
  position: fixed;
  width: 210px;
  height: 210px;
  left: 156px;
  top: 100px;
  background: linear-gradient(130.04deg, rgba(253, 153, 42, 0.3) 13.45%, rgba(125, 81, 220, 0.3) 60.04%, rgba(37, 237, 255, 0.3) 88.4%);
  filter: blur(50px);
}

.page-node {
  margin: 40px 0 36px;
  min-height: 682px;
}
.node-list {
  width: 100%;
  height: 100%;
  padding: 24px 24px 4px;
  border-radius: 15px;
  background-color: #1c2025;
  backdrop-filter: blur(60px);
  box-sizing: border-box;
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

.pagination {
  text-align: center;
}

.page /deep/ .n-pagination-item--active {
}
</style>
