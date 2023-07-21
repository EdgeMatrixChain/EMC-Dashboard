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
            <div class="node-list-theader-item">EMC Reward</div>
          </div>
          <div class="node-list-body">
            <template v-if="nodeInfoList.length !== 0">
              <template v-for="(item, index) in nodeInfoList" :key="item._id">
                <RouterLink :to="{ name: 'node-detail', params: { id: item._id } }">
                  <div class="node-list-main">
                    <div class="node-list-main-item">{{ Utils.formatAddress(item._id) }}</div>
                    <div class="node-list-main-item">{{ item.avgPower }}</div>
                    <div class="node-list-main-item">≈ {{ item.reward }}</div>
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
import { useRoute } from 'vue-router';
import { useRewardStore } from '@/stores/reward';

type NodeListItem = {
  _id: string;
  avgPower: string;
  reward: string;
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
    const useReward = useRewardStore() || [];
    const rewardData = ref<any[]>([]);
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

    // watch(
    //   () => useReward.rewardData,
    //   (val) => {
    //     rewardData.value = val || [];
    //     init(1);
    //   }
    // );

    const init = async (index: number) => {
      const { total, list } = await useReward.getNodeRewardList(index, 10);
      nodeInfoList.value = list;
      pageCount.value = total;
      // const rewardList = rewardData.value || [];

      // if (rewardList.length > 0) {
      //   const nodeIDs = rewardList[index || 1].map((item: any) => item.nodeID);
      //   const strNodeIDs = nodeIDs.join(',');
      //   axios
      //     .get('https://api.edgematrix.pro/api/v1/nodelistsnapshot', {
      //       params: {
      //         nodeids: strNodeIDs,
      //         page: 1,
      //         size: 10,
      //       },
      //     })
      //     .then((resp) => {
      //       const data = resp.data;
      //       if (data._result !== 0) return;
      //       const nodeList = data.data;

      //       const updatedNodeList = nodeList.map((item1: { _id: string }) => {
      //         const matchingItem = rewardList[index || 1].find((item2: { nodeID: string }) => item2.nodeID === item1._id);

      //         return matchingItem ? { ...item1, reward: matchingItem.reward } : item1;
      //       });
      //       nodeInfoList.value = updatedNodeList;
      //       pageCount.value = rewardList.length - 1;
      //     });
      // }
    };

    const handlePageChange = (currentPage: number) => {
      init(currentPage);
    };

    return {
      Utils,
      page,
      pageCount,
      rewardData,
      init,
      nodeInfoList,
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
  background: linear-gradient(
    130.04deg,
    rgba(253, 153, 42, 0.3) 13.45%,
    rgba(125, 81, 220, 0.3) 60.04%,
    rgba(37, 237, 255, 0.3) 88.4%
  );
  filter: blur(50px);
}

.page-node {
  margin: 40px 0 36px;
  min-height: 682px;
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
