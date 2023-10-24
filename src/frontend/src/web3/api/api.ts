import { Web3Service } from '../index';
export abstract class Api {
  contract: string = '';

  constructor() {}
  
  abstract getAbi(): any;

  init({ address }: { address: string }) {
    this.contract = address;
  }

  call({ method, data }: { method: string; data?: any[] }) {
    const w3s = Web3Service.getInstance();
    return w3s.call({ abi: this.getAbi(), contract: this.contract, method: method, data: data });
  }
}
