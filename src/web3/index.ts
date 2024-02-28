import { BrowserProvider, Contract, Wallet, JsonRpcProvider, formatEther, ContractTransactionResponse } from 'ethers';
import type { Eip1193Provider } from 'ethers';
import { Web3Utils } from '@/web3/utils';
import { getDefaultNetwork, getNetworkConfig } from './network';

export type CallOption = {
  contract: string;
  abi: any;
  method: string;
  data?: any[];
};

export class Web3Service {
  public provider: BrowserProvider | null;
  public defaultProvider: JsonRpcProvider;
  private static instance: Web3Service | null = null;

  private constructor() {
    this.provider = null;
    this.defaultProvider = new JsonRpcProvider(getDefaultNetwork().rpcUrls[0]);
  }

  public static getInstance(): Web3Service {
    if (!Web3Service.instance) {
      Web3Service.instance = new Web3Service();
    }
    return Web3Service.instance;
  }

  async setProvider(provider: Eip1193Provider | null) {
    if (this.provider) {
      this.provider.removeAllListeners();
    }
    if (provider) {
      this.provider = new BrowserProvider(provider);
    } else {
      this.provider = null;
    }
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

  /**
   * Unused
   * @returns
   */
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

  async addToken(config: { type?: 'ERC20' | 'ERC721' | 'ERC1155'; address: string; symbol: string; decimals: number; image?: string;}) {
    const { type, address, symbol, decimals, image } = config;
    if (!this.provider) {
      return { _result: 2, _desc: 'Please connect wallet first' };
    }
    if (!address || !symbol || !decimals) return { _result: 2, _desc: 'Config [address | symbol | decimals] is empty' };
    const tokenConfig = {
      type: type || 'ERC20',
      options: {
        address,
        symbol,
        decimals,
        image,
      },
    };
    const [err, resp] = await Web3Utils.to(this.provider!.send('wallet_watchAsset', tokenConfig));
    if (err) {
      return { _result: 1, _desc: `Add token error: ${err}`, err };
    }
    return { _result: 0, data: resp };
  }

  async addNetwork(chainId: number) {
    const nc = getNetworkConfig(chainId);
    if (!nc) return { _result: 1, _desc: 'Network config not found' };
    const chainConfig = {
      chainId: `0x${nc.chainId.toString(16)}`,
      chainName: nc.chainName,
      rpcUrls: nc.rpcUrls,
      nativeCurrency: { decimals: nc.decimals, name: nc.symbolName, symbol: nc.symbol },
      blockExplorerUrls: nc.blockExplorerUrls,
    };
    const [err, resp] = await Web3Utils.to(this.provider!.send('wallet_addEthereumChain', [chainConfig]));
    if (err) {
      return { _result: 1, _desc: `Add network error: ${err}` };
    }
    return { _result: 0, data: resp };
  }

  async switchNetwork(chainId: number): Promise<Resp> {
    const chainIdHex = `0x${chainId.toString(16)}`;
    if (!this.provider) {
      return { _result: 1, _desc: `Switch network error: Not found provider` };
    }
    const [err, resp] = await Web3Utils.to(this.provider.send('wallet_switchEthereumChain', [{ chainId: chainIdHex }]));
    if (!err) {
      return { _result: 0, data: resp };
    }
    const error = err.error;
    if (error?.code === 4902) {
      const resp = await this.addNetwork(chainId);
      if (resp._result === 0) {
        return this.switchNetwork(chainId);
      } else {
        return resp;
      }
    } else if (error?.code === -32002) {
      return { _result: 1, _desc: `Already request for 'switch network', please close first.` };
    }

    return { _result: 1, _desc: `Switch network error: ${error}` };
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

  async signMessage(message: string) {
    const signer = await this.getSigner();
    if (!signer) {
      return { _result: 1, _desc: `Not found signer` };
    }
    const [err, signature] = await Web3Utils.to(signer.signMessage(message));
    if (err) {
      return { _result: 1, _desc: `Sign message failed`, err: { ...err } };
    }
    return { _result: 0, data: { signature } };
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
    if (err) {
      return { _result: 1, _desc: `${err}`, data: resp, err: { ...err } };
    } else {
      return { _result: 0, _desc: '', data: resp };
    }
  }
}


export const w3s = Web3Service.getInstance();