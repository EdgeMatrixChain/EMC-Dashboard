import { http } from '@/tools/http';
import moment from 'moment';
type Location = { latitude: number; longitude: number };
function haversineDistance({ latitude: lat1, longitude: lon1 }: Location, { latitude: lat2, longitude: lon2 }: Location) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
export async function getMapNodes() {
  const now = new Date().getTime();

  const resp = await http.get({
    url: '/stats/nodemap',
    data: { htbegin: now - 360 * 60000, htend: now + 60 * 60000 },
  });
  const list = resp.data || [];
  const cityMap: { [k: string]: any } = {};
  const summary = { total: 0 };
  list.forEach((item: any) => {
    if (!item.latitude || !item.longitude || item.nodes === 0) return;
    const entries = Object.entries(cityMap);
    const index = entries.findIndex(([k, v]) => {
      return haversineDistance(v, item) < 400;
    });

    let cityName = item.city;

    if (index === -1) {
      cityMap[cityName] = { ...item, nodes: 0 };
    } else {
      cityName = entries[index][0];
    }

    cityMap[cityName].nodes += item.nodes;
    summary.total += item.nodes;
  });
  console.info(cityMap);
  return { summary, list: Object.entries(cityMap).map(([k, v]) => v) };
}

type NodesOption = {
  page: number;
  size: number;
  htbegin?: number;
  htend?: number;
  status?: string; //0,1:computing 11:validator 12:rpc 13:relay
  keywords?: string; //nodeid
};

export async function getNodes({ page, size, htbegin, htend, status, keywords }: NodesOption) {
  const resp = await http.get({
    url: '/node/list',
    data: { page, size, htbegin, htend, keywords, status, sort: encodeURIComponent(JSON.stringify({ status: -1, createTime: -1 })) },
  });
  return { total: resp.total || 0, list: resp.data || [] };
}

export async function getComputeNodes({ page, size }: NodesOption) {
  const now = new Date().getTime();
  const resp = await http.get({
    url: '/node/list',
    data: {
      page: page,
      size: size,
      htbegin: now - 360 * 60000,
      htend: now + 60 * 60000,
      status: '0,1',
    },
  });
  return { total: resp.total || 0, list: resp.data || [] };
}

export async function getTotalHardwares() {
  const now = new Date().getTime();
  const resp = await http.get({
    url: '/stats/nodecpus',
    data: {
      htbegin: now - 360 * 60000,
      htend: now + 60 * 60000,
    },
  });
  return resp.data || { cpu: 0, gpu: 0, memory: 0 };
}

export async function getValidateNodes({ page, size }: NodesOption) {
  const now = new Date().getTime();
  const resp = await http.get({
    url: '/node/list',
    data: {
      page: page,
      size: size,
      htbegin: now - 360 * 60000,
      htend: now + 60 * 60000,
      status: 11,
    },
  });
  return { total: resp.total || 0, list: resp.data || [] };
}

export async function getRelayNodes({ page, size }: NodesOption) {
  const now = new Date().getTime();
  const resp = await http.get({
    url: '/node/list',
    data: {
      page: page,
      size: size,
      htbegin: now - 360 * 60000,
      htend: now + 60 * 60000,
      status: 13,
    },
  });
  return { total: resp.total || 0, list: resp.data || [] };
}

export async function getRPCNodes({ page, size }: NodesOption) {
  const now = new Date().getTime();
  const resp = await http.get({
    url: '/node/list',
    data: {
      page: page,
      size: size,
      htbegin: now - 360 * 60000,
      htend: now + 60 * 60000,
      status: 12,
    },
  });
  return { total: resp.total || 0, list: resp.data || [] };
}

export async function getNodeRewards() {
  const resp = await http.get({
    url: '/stats/noderewards',
  });
  return { data: resp.data || 0 };
}

export async function getDexData(chainName?: string) {
  let tokenAddress = '';
  if (chainName === 'solana') {
    tokenAddress = 'GY6DSyw4hAtDuyasBnCb4HrrZGooV1WfiSjrrZuTEfCn';
  } else {
    tokenAddress = '0xDFB8BE6F8c87f74295A87de951974362CedCFA30';
  }
  const resp = await http.get({
    url: `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`,
    noAutoHint: true,
  });
  const pairs = resp.pairs || [];
  const data = pairs[0] || { priceUsd: '0.0', fdv: 0, priceNative: '0.0' };
  const priceUsd = Number(data.priceNative) || 0;
  const fdv = data.fdv || 0;
  return { priceUsd, fdv };
}

export async function queryNodeOwner(nodeId: string, principal: string) {
  const resp = await http.get({
    url: '/nodesign/query',
    data: { nodeId, principal },
    noAutoHint: true,
  });
  const signInfo = resp.data || {};
  return {
    principal: signInfo.principal || '',
  };
}

export async function queryReward(nodeId: string, projectId?: number) {
  const resp = await http.get({
    url: '/nodebill/summary',
    data: { nodeId, projectId },
    noAutoHint: true,
  });
  const data = resp.data || {};
  const totalReward = BigInt(data.billTotal || 0);
  const totalClaim = BigInt(data.claimedTotal || 0);
  return {
    currentReward: totalReward - totalClaim,
    totalReward: totalReward,
    claimedReward: totalClaim,
  };
}

export async function getDAN({ daybegin, dayend }: { daybegin: string; dayend: string }) {
  const resp = await http.get({
    url: '/stats/dan',
    data: { daybegin, dayend },
  });
  return resp.data || [];
}

export const getNodeTypes = (function () {
  let list = [
    { name: 'Computing', value: 0 },
    { name: 'Computing', value: 1 },
    { name: 'Validation', value: 11 },
    { name: 'RPC', value: 12 },
    { name: 'Relay', value: 13 },
  ];
  let map: any = null;
  return () => {
    if (!map) {
      map = {};
      list.forEach((item) => {
        map[item.value] = item;
      });
    }
    return { list, map };
  };
})();
