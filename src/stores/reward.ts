import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Http } from '@/tools/http';
import { Utils } from '@/tools/utils';
let rewardPromise: any = null;

const _fetchRewardNodes = async () => {
  const getLocal = Utils.getLocalStorage('icp.reward.list');
  let localList: any[] = getLocal?.list;
  if (localList && Date.now() - getLocal?.timestamp < 300 * 1000) {
    return Promise.resolve(localList);
  } else {
    const http = Http.getInstance();
    const resp = await http.get({
      url: '/noderewardtoday',
    });
    const list = resp.data || [];
    const timestamp = Date.now();
    Utils.setLocalStorage('icp.reward.list', {
      list: list,
      timestamp: timestamp,
    });
    return list;
  }
};

const fetchRewardNodes = () => {
  if (rewardPromise) {
    return rewardPromise;
  }
  rewardPromise = _fetchRewardNodes().then((rewards: any[]) => {
    const newReward: Array<any[]> = [];
    rewards.forEach((item: any, index: number) => {
      item.reward = item.reward / Math.pow(10, 8);
      if (index % 10 === 0) {
        newReward.push([]);
      }
      const list = newReward[newReward.length - 1];
      list.push(item);
    });
    return { total: rewards.length, groupList: newReward };
  });
  return rewardPromise;
};

const caches: { [page: string]: any } = {};

export const useRewardStore = defineStore('reward', () => {
  const rewardData = ref<Array<any[]>>([]);

  const http = Http.getInstance();

  async function getNodeRewardList(page: number, size: number) {
    if (caches[page]) return caches[page];
    const { total, groupList } = await fetchRewardNodes();
    const currList = groupList[page] || [];
    const resp = await http.get({
      url: '/nodelistsnapshot',
      params: { nodeids: currList.map((item: any) => item.nodeID).join(','), page: 1, size: 10 },
    });
    const nodeList = resp.data || [];
    const nodeMap: { [k: string]: any } = {};
    nodeList.forEach((item: any) => {
      nodeMap[item._id] = item;
    });
    const list = currList.map((item: any) => ({
      ...item,
      ...(nodeMap[item.nodeID] || {}),
      _id: item.nodeID,
      reward: '-', //test
    }));

    caches[page] = { total, list };
    return caches[page];
  }
  /**
   * update data
   */
  async function update() {
    const resp = await http.get({ url: '/noderewardtoday' });
    const reward = resp.data || [];
    const newReward: Array<any[]> = [];
    let group: any = [];
    reward.forEach((item: any) => {
      item.reward = item.reward / Math.pow(10, 8);
      group.push(item);
      if (group.length === 10) {
        newReward.push(group);
        group = [];
      }
    });
    if (group.length > 0) {
      newReward.push(group);
    }
    rewardData.value = newReward;

    return newReward;
  }

  return {
    rewardData,
    getNodeRewardList,
    update,
  };
});
