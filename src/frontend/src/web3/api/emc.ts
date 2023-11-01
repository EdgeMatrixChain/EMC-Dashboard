import ABI_RWAEMC from '@/web3/abi/emc';
import { Api } from './api';

type VestingScheduleOption = {
  account: string;
  start: number;
  // cycles:number;
  cycleUnit: 0 | 1 | 2 | 3;
  amount: BigInt;
};

export class EMCApi extends Api {
  getAbi() {
    return ABI_RWAEMC;
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

  async release({ address }: { address: string }) {
    return super.call({
      method: 'release',
      data: [address],
    });
  }

  async createVestingSchedule({ account, start, cycleUnit, amount }: VestingScheduleOption) {
    return super.call({
      method: 'createVestingSchedule',
      data: [account, start, cycleUnit, amount],
    });
  }
}
