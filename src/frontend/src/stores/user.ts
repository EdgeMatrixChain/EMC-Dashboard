import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Client, Provider, createClient } from '@connect2ic/core';
import { defaultProviders, InternetIdentity, PlugWallet, AstroX, IConnector } from '@connect2ic/core/providers';
import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import type { Agent, Identity } from '@dfinity/agent';
import { createActor } from '@/web3icp/declarations';
import { principalToAccountIdentifier } from '@/web3icp/account-id';
import { _SERVICE as IDLRecycle, Result as RecycleResult, idlFactory as idlFactoryRecycle, WhitelistInfoResult as RecycleWhitelistInfoResult } from '@/web3icp/declarations/emc_dip20_recycle/emc_dip20_recycle.did';

import { _SERVICE as IDLDip20, Metadata, TxReceipt, idlFactory as idlFactoryDip20 } from '@/web3icp/declarations/emc_token_dip20/emc_token_dip20.did';

import { ethers } from 'ethers';
// export const DFINITY_HOST = 'https://boundary.ic0.app/';
export const DFINITY_HOST = 'https://icp0.io';

export const CANISTER_ID_RECYCLE = 'pvcyg-pyaaa-aaaal-qciqa-cai';
export const CANISTER_ID_DIP20 = 'aeex5-aqaaa-aaaam-abm3q-cai';

export const useUserStore = defineStore('user', () => {
  const globalProviderConfig = {
    appName: 'EMC-Dashboard',
    dev: false,
    autoConnect: false,
    host: location.origin,
    whitelist: [CANISTER_ID_DIP20, CANISTER_ID_RECYCLE],
  };

  const icpPrincipal = ref('');
  const icpAccount = ref('');

  let client: Client | null = null;
  let providerInternetIdentity = new InternetIdentity(globalProviderConfig);
  let providerPlug = new PlugWallet(globalProviderConfig);
  let providerAstroX = new AstroX(globalProviderConfig);
  let supportProviders: IConnector[] = [providerInternetIdentity, providerPlug, providerAstroX];
  let httpAgent: HttpAgent;
  let idlDip20: IDLDip20;
  let idlRecycle: IDLRecycle;

  const dip20Metadata = (() => {
    let _metadata: Metadata;
    return async (): Promise<Metadata> => {
      if (!_metadata) {
        _metadata = await idlDip20.getMetadata();
      }
      return _metadata;
    };
  })();

  return {
    providers: supportProviders,
    icpPrincipal,
    icpAccount,
    async connect(provider: Provider) {
      console.info(`connect---> ${provider.meta.id}`);
      if (client) {
        client.disconnect();
        client = null;
      }
      const providers = supportProviders.filter((item) => item.meta.id === provider.meta.id);
      client = createClient({ providers: providers, globalProviderConfig });
      // client status: initializing idle connecting connected disconnecting
      client.on('init', () => {
        console.info(`client inited`);
        // if (provider.meta.id === 'ii') { }
        client!.connect(provider.meta.id);
      });
      client.on('connect', async (e: any, fn: any) => {
        const { activeProvider, principal: _principal } = e;
        console.info(`connect`, activeProvider);
        if (activeProvider.meta.id === 'plug') {
          httpAgent = activeProvider.ic?.agent;
          if (!httpAgent) {
            console.error(`The meta.id 'plug' 'http-agent' is none.`);
            client!.disconnect();
            return;
          }
          const principal = await httpAgent.getPrincipal();
          icpPrincipal.value = principal.toString();
          icpAccount.value = principalToAccountIdentifier(principal);
        } else if (activeProvider.meta.id === 'ii') {
          const identity = activeProvider.client.getIdentity();
          httpAgent = new HttpAgent({ identity, host: DFINITY_HOST });
          const principal = identity.getPrincipal();
          icpPrincipal.value = principal.toString();
          icpAccount.value = principalToAccountIdentifier(principal);
        } else if (activeProvider.meta.id === 'astrox') {
          const identity = window.ic.astrox.identity;
          httpAgent = new HttpAgent({ identity, host: DFINITY_HOST });
          const principal = identity.getPrincipal();
          icpPrincipal.value = principal.toString();
          icpAccount.value = principalToAccountIdentifier(principal);
        }
        idlDip20 = createActor<IDLDip20>(CANISTER_ID_DIP20, idlFactoryDip20, { agent: httpAgent });
        idlRecycle = createActor<IDLRecycle>(CANISTER_ID_RECYCLE, idlFactoryRecycle, { agent: httpAgent });
        console.info(client!.status);
      });

      client.on('disconnect', (e: any) => {
        console.info('disconnect');
        client = null;
        icpPrincipal.value = '';
        icpAccount.value = '';
      });

      // console.info(`status ---> `, client.status);
      // client.connect(provider.meta.id);
    },
    async disconnect() {
      // TODO: should be awaited but never finishes, tell Plug to fix
      client!.disconnect();
      client = null;
      icpPrincipal.value = '';
      icpAccount.value = '';
    },

    dip20Metadata,
    async dip20Approve({ principal: _principal, amount: _amount }: { principal?: string; amount: string }) {
      const { decimals } = await dip20Metadata();
      const amount = ethers.parseUnits(_amount, decimals);
      const principal = Principal.from(_principal || CANISTER_ID_RECYCLE);
      const resp: TxReceipt = await idlDip20.approve(principal, amount);
      if ('Err' in resp) {
        const error = Object.keys(resp.Err).map((err) => err);
        return { _result: 1, _desc: error };
      }
      return { _result: 0 };
    },
    async getWhiteListInfo({ principal: _principal }: { principal?: string }) {
      const principal = Principal.from(_principal);
      const resp: [] | [RecycleWhitelistInfoResult] = await idlRecycle.get_user_whitelist(principal);
      // if (!resp[0]) {
      //   return { _result: 1, _desc: `Not found \'${_principal}\' in whitelist` };
      // }
      /* {owner: Principal;used: bigint; quota: bigint;} */
      // const data = {
      //   owner: resp[0]?.owner.toString(),
      //   used: ethers.formatUnits(resp[0].used , 8),
      //   quota: ethers.formatUnits(resp[0].quota , 8),
      // };
      return { _result: 0, data: resp[0] }; // undefined | RecycleWhitelistInfoResult
    },
    /**
     *
     * @param param0 {account:ethernet account}
     * @returns
     */
    async deposit({ account, isWhiteList }: { account: string; isWhiteList: boolean }) {
      console.info('before', idlRecycle);
      const resp: RecycleResult = await idlRecycle[isWhiteList ? 'whitelist_deposit' : 'deposit'](account);
      if ('Err' in resp) {
        const error = Object.keys(resp.Err).map((err) => err);
        return { _result: 1, _desc: error };
      }
      return { _result: 0 };
    },
  };
});
