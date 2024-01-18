import ABI from '@/web3/abi/public-sale';
import { Api } from './api';

export class PublicSaleApi extends Api {
  getAbi() {
    return ABI;
  }
  beneficiary() {
    return super.call({ method: 'beneficiary' });
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

  tokenPrice() {
    return super.call({ method: 'tokenPrice' });
  }

  buyTokens({ account, amount }: { account: string; amount: bigint }) {
    return super.call({
      method: 'buyTokens',
      data: [amount, account],
    });
  }

  buyTokensWithSignature({
    account,
    nonce,
    amount,
    signature,
    expireTime,
  }: {
    account: string;
    nonce: string;
    amount: bigint;
    signature: string;
    expireTime: number;
  }) {
    console.info([amount, account, signature]);
    return super.call({
      method: 'buyTokensWithSignature',
      data: [amount, nonce, expireTime, account, signature],
    });
  }

  claimFund({ amount }: { amount: bigint }) {
    return super.call({
      method: 'claimFund',
      data: [amount],
    });
  }
}
