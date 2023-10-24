import config from './config';

const map: any = {};

export function getNetworkConfig(chainId: any) {
  if (Object.keys(map).length === 0) {
    config.forEach((item) => {
      map[item.chainId] = item;
    });
  }
  return map[chainId] || {};
}

export const list = config;

export const getDefaultNetwork = () => config[0];

const supports = [421613];
export const supportList = supports.map((chainId) => getNetworkConfig(chainId));
