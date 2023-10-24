import ABI_ERC20 from '@/web3/abi/erc20';
import { Api } from './api';

export class ERC20Api extends Api {
  _name: string | undefined;
  _symbol: string | undefined;
  _decimals: string | undefined;

  getAbi() {
    return ABI_ERC20;
  }

  async name(): Promise<Resp> {
    if (!this._name) {
      const { data } = await super.call({ method: 'name', data: [] });
      this._name = data;
    }
    return { _result: 0, data: this._name };
  }

  async symbol(): Promise<Resp> {
    if (!this._symbol) {
      const { data } = await super.call({ method: 'symbol', data: [] });
      this._symbol = data;
    }
    return { _result: 0, data: this._symbol };
  }

  async decimals(): Promise<Resp> {
    if (!this._decimals) {
      const { data } = await super.call({ method: 'decimals', data: [] });
      this._decimals = data;
    }
    return { _result: 0, data: this._decimals };
  }

  allowance({ account, spender }: { account: string; spender: string }) {
    return super.call({ method: 'allowance', data: [account, spender] });
  }

  balanceOf({ account }: { account: string }) {
    return super.call({ method: 'balanceOf', data: [account] });
  }

  approve({ amount, spender }: { amount: string | number | BigInt; spender: string }) {
    return super.call({ method: 'approve', data: [spender, amount] });
  }
}
