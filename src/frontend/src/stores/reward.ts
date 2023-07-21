import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Http } from '@/tools/http';

export const useRewardStore = defineStore('reward', () => {
  const rewardData = ref<Array<any[]>>([]);

  const http = Http.getInstance();
  /**
   * update data
   */
  async function update() {
    const resp = await http.get({ url: 'https://api.edgematrix.pro/api/v1/noderewardtoday' });
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
    update,
  };
});
