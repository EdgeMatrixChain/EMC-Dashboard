<template>
  <div class="page">
    <div class="mask-bgcolor-left"></div>
    <div class="page-node">
      <div class="page-search">
        <div class="page-search-icon">
          <img src="@/assets/icon_search.png" width="20" height="20" />
        </div>
        <input class="page-search-input" v-model="searchValue" type="text" placeholder="Search IDs" @keyup.enter="onPressSearch" />
      </div>

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
            <div class="node-list-theader-item">Avg E-Power</div>
            <div class="node-list-theader-item">Today Reward</div>
            <div class="node-list-theader-item">Last Update</div>
            <div class="node-list-theader-item">Run Time</div>
          </div>
          <div class="node-list-body">
            <template v-if="nodeInfoList.length !== 0">
              <template v-for="(item, index) in nodeInfoList" :key="item._id">
                <RouterLink :to="{ name: 'node-detail', params: { id: item._id } }">
                  <div class="node-list-main">
                    <div class="node-list-main-item">{{ Utils.formatAddress(item._id) }}</div>
                    <div class="node-list-main-item">{{ item.avgPower == '0' || !item.avgPower ? '--' : item.avgPower }}</div>
                    <div class="node-list-main-item">≈ {{ item.reward }}</div>
                    <div class="node-list-main-item">{{ moment(item.updateTime).format('YYYY-MM-DD hh:mm') }}</div>

                    <div class="node-list-main-item">{{ item.runTime === item.startupTime ? '--' : Utils.formatDate(item.runTime) }}</div>
                  </div>
                </RouterLink>
              </template>
            </template>
            <template v-else>
              <NSpin size="small" />
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
import { defineComponent, ref, computed, onMounted, watch, onActivated, ComputedRef } from 'vue';
import { NPagination, NSpace, NButton, NSpin } from 'naive-ui';
import axios from 'axios';
import { Utils } from '@/tools/utils';
import { useRoute, useRouter } from 'vue-router';
import { useRewardStore } from '@/stores/reward';
import moment from 'moment';

type NodeListItem = {
  _id: string;
  avgPower: string;
  reward: string;
  updateTime: string;
  createTime: string;
  runTime: string;
  startupTime: string;
};

export default defineComponent({
  name: 'nodes',
  components: { NPagination, NSpace, NButton, NSpin },
  beforeRouteEnter(to, from, next) {
    if (typeof to.meta !== 'object') {
      to.meta = {};
    }
    if (from.name === 'node-detail') {
      to.meta.isBack = true;
    } else {
      to.meta.isBack = false;
    }
    next();
  },
  setup() {
    const page = ref(1);
    const pageCount = ref(1);
    const nodeInfoList = ref<NodeListItem[]>([]);
    const route = useRoute();
    const router = useRouter();
    const useReward = useRewardStore() || [];
    const rewardData = ref<any[]>([]);
    const searchValue = ref('');
    onActivated(() => {
      if (route.meta.isBack) {
        init(page.value);
      } else {
        page.value = 1;
        pageCount.value = 1;
        nodeInfoList.value = [];
        init(page.value);
      }
    });

    const init = async (index: number) => {
      const { total, list } = await useReward.getNodeRewardList(index, 10);
      console.log(list);

      nodeInfoList.value = list;
      pageCount.value = Math.floor(total / 10);
    };

    const handlePageChange = (currentPage: number) => {
      init(currentPage);
    };
    const onPressSearch = () => {
      console.log(1);
      router.push({ name: 'node-detail', params: { id: searchValue.value } });
    };

    return {
      Utils,
      moment,
      page,
      pageCount,
      rewardData,
      init,
      nodeInfoList,
      handlePageChange,
      searchValue,
      onPressSearch,
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

.page-search {
  display: flex;
  align-items: center;
  display: flex;
  width: 960px;
  height: 48px;
  margin: 32px auto;
  padding: 0 14px;
  border-radius: 16px;
  border: 1px solid #705989;
  background: linear-gradient(70deg, rgba(255, 255, 255, 0) 0.01%, rgba(255, 255, 255, 0.08) 100%);
  backdrop-filter: blur(21px);
}
.page-search-input {
  margin-left: 8px;
  width: 100%;
  height: 100%;
  line-height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
}
.node-list {
  width: 100%;
  height: 100%;
  min-height: 680px;
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
  font-size: 14px;
  font-weight: 400;
  line-height: 56px;
  cursor: pointer;
}

.pagination {
  text-align: center;
}
</style>
