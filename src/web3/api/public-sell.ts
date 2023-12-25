import ABI from '@/web3/abi/public-sell';
import { Api } from './api';

export class PublicSellApi extends Api {
  getAbi() {
    return ABI;
  }

  async onWhitelistMode() {
    return super.call({ method: 'onWhitelistMode' });
  }

  async tokensOnSale() {
    return super.call({ method: 'tokensOnSale' });
  }

  async releaseContract() {
    return super.call({ method: 'releaseContract' });
  }

  /**
   *
   * @returns usdt(fund) token address
   */
  async fundToken() {
    return super.call({ method: 'fundToken' });
  }

  /**
   *
   * @returns emc token address
   */
  async token() {
    return super.call({ method: 'token' });
  }

  async tokenPrice() {
    return super.call({ method: 'tokenPrice' });
  }

  async buyTokens({ account, amount }: { account: string; amount: bigint }) {
    return super.call({
      method: 'buyTokens',
      data: [amount, account],
    });
  }

  async buyTokensWithSignature({ account, amount, signature }: { account: string; amount: bigint; signature: string }) {
    return super.call({
      method: 'buyTokensWithSignature',
      data: [amount, account, signature],
    });
  }
}
