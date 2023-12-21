import ABI from '@/web3/abi/stake-lock';
import { Api } from './api';

type StakeOption = {
  account: string;
  start: bigint;
  cycles: bigint;
  cycleUnit: 0 | 1 | 2 | 3;
  amount: bigint;
};

export class StakeLockApi extends Api {
  getAbi() {
    return ABI;
  }

  async getLockedAmount({ account }: any) {
    return super.call({ method: 'getLockedAmount', data: [account] });
  }

  async getReleasableAmount({ account }: any) {
    return super.call({ method: 'getReleasableAmount', data: [account] });
  }

  async token() {
    return super.call({ method: 'token' });
  }

  async release({ account }: { account: string }) {
    return super.call({
      method: 'release',
      data: [account],
    });
  }

  async createVestingSchedule({ account, start, cycles, cycleUnit, amount }: StakeOption) {
    return super.call({
      method: 'createVestingSchedule',
      data: [account, start, cycles, cycleUnit, amount],
    });
  }
}
