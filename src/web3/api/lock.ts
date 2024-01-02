import ABI from '@/web3/abi/lock';
import { Api } from './api';

type StakeOption = {
  account: string;
  start: bigint;
  cycles: bigint;
  cycleUnit: 0 | 1 | 2 | 3;
  amount: bigint;
};

export class LockApi extends Api {
  getAbi() {
    return ABI;
  }

  getLockedAmount({ account }: any) {
    return super.call({ method: 'getLockedAmount', data: [account] });
  }

  getAmount({ account }: any) {
    return super.call({ method: 'getAmount', data: [account] });
  }

  getReleasableAmount({ account }: any) {
    return super.call({ method: 'getReleasableAmount', data: [account] });
  }

  token() {
    return super.call({ method: 'token' });
  }

  release({ account }: { account: string }) {
    return super.call({
      method: 'release',
      data: [account],
    });
  }

  createVestingSchedule({ account, start, cycles, cycleUnit, amount }: StakeOption) {
    return super.call({
      method: 'createVestingSchedule',
      data: [account, start, cycles, cycleUnit, amount],
    });
  }

  getVestingSchedule({ account }: { account: string }) {
    return super.call({
      method: 'getVestingSchedule',
      data: [account],
    });
  }
}
