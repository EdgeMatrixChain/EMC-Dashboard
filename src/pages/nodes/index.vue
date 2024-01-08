<template>
  <div class="page max-w-[1440px]" style="margin:auto;">
    <div class="mask-bgcolor-left"></div>
    <div class="page-node">
      <div class="page-search w-full max-w-[960px]">
        <div class="page-search-icon">
          <img src="@/assets/icon_search.png" width="20" height="20" />
        </div>
        <input class="page-search-input" v-model="inputSearchValue" type="text" placeholder="Search IDs"
          @keyup.enter="onPressSearch" />
      </div>
      <div class="node-list">
        <div class="node-list-header">
          <span class="node-list-header-span">Node list</span>
        </div>
        <div class="node-list-subtitle">
          <img class="node-list-subtitle-icon" src="@/assets/icon_check.svg" />
          <span class="node-list-subtitle-span">Last 30days updated node</span>
        </div>
        <NSpin size="small" :show="loading">
          <div class="node-list-table">
            <div class="node-list-theader">
              <div class="node-list-theader-item min-w-[80px]">Node ID</div>
              <!-- <div class="node-list-theader-item">Avg E-Power</div> -->
              <!-- <div class="node-list-theader-item">Today Reward</div> -->
              <div class="node-list-theader-item hidden xl:block">Last Update</div>
              <div class="node-list-theader-item hidden xl:block">Run Time</div>
            </div>
            <div class="node-list-body">
              <template v-for="(item, index) in list" :key="item._id">
                <RouterLink :to="{ name: 'node-detail', params: { id: item._id } }">
                  <div class="node-list-main">
                    <div class="node-list-main-item min-w-[80px] text-[12px] xl:text-[14px]">{{ item.nodeIdFormat }}</div>
                    <!-- <div class="node-list-main-item text-[12px] xl:text-[14px]">{{ item.avgPower == '0' || !item.avgPower
                      ? '--' : item.avgPower }}</div> -->
                    <!-- <div class="node-list-main-item text-[12px] xl:text-[14px]">{{ `≈ ${Number(item.reward).toFixed(isDesktop ? 8 : 2)}` }}</div> -->
                    <!-- <div class="node-list-main-item text-[12px] xl:text-[14px]">{{ `${item.reward}` }}</div> -->
                    <template v-if="isSmallDesktop || isDesktop">
                      <div class="node-list-main-item text-[12px] xl:text-[14px]">{{ item.updateTimeStr }}</div>
                      <div class="node-list-main-item text-[12px] xl:text-[14px]">{{ item.runTime }}</div>
                    </template>
                  </div>
                </RouterLink>
              </template>

            </div>
          </div>
        </NSpin>
      </div>
    </div>
    <NSpace class="pagination" justify="center">
      <NPagination v-model:page="pageNo" :disabled="loading" :page-count="pageCount" @update:page="handlePageChange"
        size="large" :page-slot="isDesktop ? 10 : 6" />
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
import { useIsMobile, useIsTablet, useIsSmallDesktop, useIsDesktop } from '@/composables/use-screen';
import { Http } from '@/tools/http';

type Item = {
  _id: string;
  nodeIdFormat: string;
  avgPower: string;
  reward: string;
  updateTime: string;
  updateTimeStr: string;
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
      // Utils.setLocalStorage('icp.reward.list', '');
    }
    next();
  },
  setup() {
    const pageNo = ref(1);
    const pageCount = ref(1);
    const list = ref<Item[]>([]);
    const loading = ref(false);
    const route = useRoute();
    const router = useRouter();
    const http = Http.getInstance();
    const isSmallDesktop = useIsSmallDesktop();
    const isDesktop = useIsDesktop();

    const inputSearchValue = ref('');
    onActivated(() => {
      if (route.meta.isBack) {
        init();
      } else {
        pageNo.value = 1;
        pageCount.value = 1;
        list.value = [];
        init();
      }
    });

    // const allData: any = [];
    const init = async () => {
      loading.value = true;
      const resp = await http.get({
        url: '/nodelistsnapshot',
        data: {
          page: pageNo.value,
          size: 10,
          updatetimebegin: new Date().getTime() - 30 * 86400000,
          updatetimeend: new Date().getTime()
        },
      });
      loading.value = false;
      const nodeList: any[] = [];
      (resp.data || []).forEach((item: any) => {
        item.nodeIdFormat = Utils.formatAddress(item._id, 11);
        item.updateTimeStr = moment(item.updateTime).format('YYYY-MM-DD hh:mm');
        item.runTime = item.runTime === item.startupTime ? '--' : Utils.formatDate(item.runTime);
        nodeList.push(item);
      });
      const total = resp.total || 0;
      list.value = nodeList;
      pageCount.value = Math.ceil(total / 10);
    };

    const handlePageChange = (currentPage: number) => {
      pageNo.value = currentPage;
      init();
    };

    const onPressSearch = async () => {
      router.push({ name: 'node-detail', params: { id: inputSearchValue.value } });
    };

    return {
      isSmallDesktop,
      isDesktop,
      pageNo,
      pageCount,
      list,
      loading,
      inputSearchValue,
      onPressSearch,
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
  margin: 40px 0 24px;
  min-height: 682px;
}

.page-search {
  display: flex;
  align-items: center;
  display: flex;
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
  color: #fff;
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
  font-weight: 400;
  line-height: 56px;
  cursor: pointer;
}

.pagination {
  text-align: center;
}
</style>
