import { BrowserProvider, Contract, Wallet, JsonRpcProvider, formatEther } from 'ethers';
import type { Eip1193Provider } from 'ethers';
import { Web3Utils } from '@/web3/utils';
import { getDefaultNetwork } from './network';

export type CallOption = {
  contract: string;
  abi: any;
  method: string;
  data?: any[];
};

export class Web3Service {
  public provider: BrowserProvider | undefined;
  public defaultProvider: JsonRpcProvider;
  private static instance: Web3Service | null = null;

  private constructor() {
    this.defaultProvider = new JsonRpcProvider(getDefaultNetwork().rpcUrls[0]);
  }

  public static getInstance(): Web3Service {
    if (!Web3Service.instance) {
      Web3Service.instance = new Web3Service();
    }
    return Web3Service.instance;
  }

  async setup({ provider }: { provider: Eip1193Provider }) {
    if (this.provider) {
      this.provider.removeAllListeners();
    }
    this.provider = new BrowserProvider(provider);
  }

  async getSigner() {
    if (!this.provider) {
      return null;
    }
    const [err, signer] = await Web3Utils.to(this.provider.getSigner());
    if (err) {
      return null;
    }
    return signer;
  }

  async connect() {
    const [err, accounts] = await Web3Utils.to(this.provider!.send('eth_requestAccounts', []));

    if (err) {
      return { _result: 1, _desc: `Account error: ${err}` };
    }

    if (!accounts || accounts.length === 0) {
      return { _result: 1, _desc: `Account is empty: ${err}` };
    }

    return { _result: 0, accounts };
  }

  async getChainId() {
    const payload = this.provider!.getRpcRequest({ method: 'chainId' });
    if (!payload) {
      return { _result: 1, _desc: 'Not found rpc request' };
    }
    //eth_chainId
    const [err, chainIdHex] = await Web3Utils.to(this.provider!.send(payload.method, payload.args));

    if (err) {
      return { _result: 1, _desc: `ChainId error ${err}` };
    }
    const chainId = parseInt(chainIdHex || '');

    return { _result: 0, chainId, chainIdHex };
  }

  async createSimpleWallet() {
    const privateKey = Wallet.createRandom().privateKey;
    const wallet = new Wallet(privateKey);
    const publicKey = await wallet.getAddress();
    return { privateKey, publicKey };
  }

  async estimateGas(transaction: { from: string; to: string; value: string | number | bigint | null }) {
    const provider = this.provider || this.defaultProvider;
    const [gasEstimate, feeData] = await Promise.all([provider.estimateGas(transaction), provider.getFeeData()]);
    console.log('Estimated gas:', gasEstimate.toString());

    const gasPrice = feeData.gasPrice || 0n;
    console.log('Current gas price:', gasPrice.toString());
    
    const totalGasCost = gasEstimate * gasPrice;
    console.log('Total gas cost:', formatEther(totalGasCost));
    return totalGasCost;
  }

  async call(option: CallOption): Promise<Resp> {
    const { contract, abi, method, data = [] } = option;
    const instance = new Contract(contract, abi);
    const functionFragment = instance.interface.getFunction(method);
    if (!functionFragment) {
      return { _result: 1, _desc: `Not found ${method} in abi` };
    }
    if (functionFragment.constant) {
      const provider = this.provider || this.defaultProvider;
      return this.#call(instance.connect(provider), method, data);
    } else {
      const signer = await this.getSigner();
      if (!signer) {
        return { _result: 1, _desc: `Not found signer` };
      }
      return this.#call(instance.connect(signer), method, data);
    }
  }

  async #call(contract: any, method: string, data: any[]) {
    const [err, resp] = await Web3Utils.to(contract[method].apply(contract, data));
    return { _result: err ? 1 : 0, _desc: `${err}`, data: resp };
  }
}
