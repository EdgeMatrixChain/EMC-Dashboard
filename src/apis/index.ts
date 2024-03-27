import { http } from '@/tools/http';
import moment from 'moment';

export async function getMapNodes() {
  const now = new Date().getTime();
  const resp = await http.get({
    url: '/stats/nodemap',
    data: {
      htbegin: now - 360 * 60000,
      htend: now + 60 * 60000,
    },
  });
  const list = resp.data || [];
  return list;
}

type NodesOption = {
  page: number;
  size: number;
  htbegin: number;
  htend: number;
  status?: string; //0,1:computing 11:validator 12:rpc 13:relay
  keywords?: string; //nodeid
};

export async function getNodes({ page, size, htbegin, htend, status, keywords }: NodesOption) {
  const resp = await http.get({
    url: '/node/list',
    data: { page, size, htbegin, htend, keywords, status, sort: encodeURIComponent(JSON.stringify({ createTime: -1 })) },
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

export async function getDexData() {
  const resp = await http.get({
    url: 'https://api.dexscreener.com/latest/dex/tokens/0xDFB8BE6F8c87f74295A87de951974362CedCFA30',
    noAutoHint: true,
  });
  const pairs = resp.pairs || [];
  const data = pairs[0] || { priceUsd: '0.0', fdv: 0 };
  const priceUsd = Number(data.priceUsd) || 0;
  const fdv = data.fdv || 0;
  return { priceUsd, fdv };
}

export async function queryNodeOwner(nodeId: string) {
  const resp = await http.get({
    url: '/nodesign/query',
    data: { nodeId },
    noAutoHint: true,
  });
  const signInfo = resp.data || {};
  return {
    principal: signInfo.principal || '',
  };
}

export async function queryReward(nodeId: string) {
  const resp = await http.get({
    url: '/nodebill/summarynew',
    data: { nodeId: nodeId },
    noAutoHint: true,
  });
  const data = resp.data || {};
  const totalReward = data.billTotal || 0;
  const totalClaim = data.claimedTotal || 0;
  return {
    currentReward: BigInt(totalReward) - BigInt(totalClaim),
    totalReward: totalReward,
  };
}

export async function getDAN() {
  const begin = moment().subtract(15, 'day').utc().format('YYYY-MM-DD');
  const end = moment().utc().format('YYYY-MM-DD');
  const resp = await http.get({
    url: '/stats/dan',
    data: { begin, end },
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
