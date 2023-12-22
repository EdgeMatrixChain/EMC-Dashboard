import { getNetworkConfig } from './network';
import { MetaMaskSDK, SDKProvider } from '@metamask/sdk';

export class Metamask {
  sdk: MetaMaskSDK;
  provider: SDKProvider | undefined;

  constructor() {
    this.sdk = new MetaMaskSDK();
  }

  async getProvider(): Promise<SDKProvider> {
    await this.sdk.init();
    this.provider = this.sdk.getProvider();
    return this.provider;
  }

  async addNetwork(chainId: number) {
    const nc = getNetworkConfig(chainId);
    if (!nc) return { _result: 1, _desc: 'Network config not found' };
    try {
      const resp = await this.provider!.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${nc.chainId.toString(16)}`,
            chainName: nc.chainName,
            rpcUrls: nc.rpcUrls,
            nativeCurrency: { decimals: nc.decimals, name: nc.symbolName, symbol: nc.symbol },
            blockExplorerUrls: nc.blockExplorerUrls,
          },
        ],
      });
      return { _result: 0, data: resp };
    } catch (error: any) {
      return { _result: 1, _desc: `Add network error: ${error}` };
    }
  }

  async switchNetwork(chainId: number): Promise<Resp> {
    const chainIdHex = `0x${chainId.toString(16)}`;
    try {
      const resp = await this.provider!.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
      return { _result: 0, data: resp };
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        const resp = await this.addNetwork(chainId);
        if (resp._result === 0) {
          return await this.switchNetwork(chainId);
        } else {
          return resp;
        }
      } else {
        return { _result: 1, _desc: `Switch network error: ${error}` };
      }
    }
  }
}
