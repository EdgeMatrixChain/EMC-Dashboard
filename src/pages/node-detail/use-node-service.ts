import { Web3Utils } from '@/web3/utils';
import { ApiManager } from '@/web3/api';
import { StakeNodeApi } from '@/web3/api/stake-node';
import { Web3Service } from '@/web3';
import { getDefaultNetwork } from '@/web3/network';

export const useNodeService = () => {
  let stakeNodeApi: StakeNodeApi | null = null;

  function setStakeNodeApi(api: StakeNodeApi) {
    stakeNodeApi = api;
  }

  async function queryStake(nodeId: string) {
    if (!stakeNodeApi) {
      return null;
    }
    const { data: _stakeInfo } = await stakeNodeApi!.nodeInfo({ nodeId });
    const [_bindStakeAccount, _totalStaked, _currentStaked, _totalUnstaked] = _stakeInfo || [];
    const result = { bindStakeAccount: '', totalStaked: 0n, currentStaked: 0n, totalUnstaked: 0n };
    result.bindStakeAccount = _bindStakeAccount || '';
    result.totalStaked = _totalStaked || 0n;
    result.currentStaked = _currentStaked || 0n;
    result.totalUnstaked = _totalUnstaked || 0n;
    return result;
  }

  return {
    setStakeNodeApi,
    queryStake,
  };
};
