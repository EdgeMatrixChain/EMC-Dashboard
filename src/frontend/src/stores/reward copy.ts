import { defineStore } from 'pinia';
import { Http } from '@/tools/http';
import { Utils } from '@/tools/utils';
let rewardPromise: any = null;

const _fetchRewardNodes = async () => {
  const getReward = Utils.getLocalStorage('icp.reward.list');
  let localList: any = getReward?.list;
  // if (Date.now() - getReward?.timestamp > 1) {
  if (localList) return Promise.resolve(localList);
  const http = Http.getInstance();
  const resp = await http.get({
    url: 'https://api.edgematrix.pro/api/v1/noderewardtoday',
  });
  const list = resp.data || [];
  const timestamp = Date.now();
  Utils.setLocalStorage('icp.reward.list', {
    list: list,
    timestamp: timestamp,
  });
  return list;
  // } else {
  //   return localList;
  // }
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
    }));

    caches[page] = { total, list };
    return caches[page];
  }

  return {
    getNodeRewardList,
  };
});
