import { Api } from './api';
import { ERC20Api } from './erc20';
import { EMCApi } from './emc';

export class ApiManager {
  private apis: { [k: string]: ERC20Api | EMCApi | any };

  private static instance: ApiManager | null = null;

  private constructor() {
    this.apis = {};
  }

  public static getInstance(): ApiManager {
    if (!ApiManager.instance) {
      ApiManager.instance = new ApiManager();
    }
    return ApiManager.instance;
  }

  create<T extends Api>(ApiClass: new () => T, { address }: { address: string }): T {
    if (!this.apis[address]) {
      const api = new ApiClass();
      api.init({ address });
      this.apis[address] = api;
    }
    return this.apis[address];
  }
}
