import { http } from '@/tools/http';
import { w3s } from '@/web3';
import { getDefaultNetwork } from '@/web3/network';
import { ApiManager } from '@/web3/api';
import { StakeNodeApi } from '@/web3/api/stake-node';

export const preNodeBind = async (params: { account: string; chainId: number; nodeId: string }) => {
  const nodeId = params.nodeId;
  const account = params.account;
  const chainId = params.chainId;
  const signatureRaw = `Node bind ${account} to ${nodeId}`;
  const resp1 = await w3s.signMessage(signatureRaw);
  if (resp1._result !== 0) {
    if (resp1.err && resp1.err.code === 'ACTION_REJECTED') {
      return { _result: 2, _desc: 'Message signature cancel' };
    }
    return resp1;
  }
  if (!resp1.data) {
    return { _result: 1, _desc: 'Message signature failed' };
  }
  const signature = resp1.data.signature;
  return http.postJSON({
    url: '/nodestake/bindsign',
    data: { nodeId, chainId, signatureRaw, signature },
    noAutoHint: true,
  });
};

export const nodeBind = async (params: { account: string; chainId: number; nodeId: string }) => {
  const networkConfig = getDefaultNetwork();
  const apiManager = ApiManager.getInstance();
  const conractAddress = networkConfig.smarts.nodeStake.contract;
  const stakeNodeApi = apiManager.create(StakeNodeApi, { address: conractAddress });

  const nodeId = params.nodeId;
  const account = params.account;
  const resp = await preNodeBind(params);
  if (resp._result !== 0 && resp._result !== 11) {
    return resp;
  }
  const data = resp.data || {};
  const nonce = data.nonce;
  const signature = data.signature;
  const bindResp = await stakeNodeApi.bindNode({ nodeId, account, nonce, signature });
  if (bindResp._result !== 0) {
    if (bindResp.err && bindResp.err.code === 'ACTION_REJECTED') {
      return { _result: 3, _desc: 'Bind cancel' };
    } else {
      return { _result: 2, _desc: 'Bind failed' };
    }
  }
  await bindResp.data.wait();
  return bindResp;
};
