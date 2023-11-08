import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Client, Provider, createClient } from '@connect2ic/core';
import { defaultProviders } from '@connect2ic/core/providers';
import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import type { Agent, Identity } from '@dfinity/agent';
import { createActor } from '@/web3icp/declarations';
import { principalToAccountIdentifier } from '@/web3icp/account-id';
import {
  _SERVICE as IDLRecycle,
  Result as RecycleResult,
  idlFactory as idlFactoryRecycle,
} from '@/web3icp/declarations/emc_dip20_recycle/emc_dip20_recycle.did';

import {
  _SERVICE as IDLDip20,
  Metadata,
  TxReceipt,
  idlFactory as idlFactoryDip20,
} from '@/web3icp/declarations/emc_token_dip20/emc_token_dip20.did';

import { ethers } from 'ethers';
//host: "https://icp0.io"
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

  let httpAgent: HttpAgent;
  let idlDip20: IDLDip20;
  let idlRecycle: IDLRecycle;
  const client: Client = createClient({
    providers: defaultProviders as (config: any) => Array<Provider>,
    globalProviderConfig,
  });

  client.on('init', async (e: any, fn: any) => {
    client.disconnect();
  });
  client.on('connect', async (e: any, fn: any) => {
    const { activeProvider, principal: _principal } = e;
    console.info(activeProvider);
    if (activeProvider.meta.id === 'plug') {
      httpAgent = activeProvider.ic?.agent;
      if (!httpAgent) {
        client.disconnect();
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
    }
    idlDip20 = createActor<IDLDip20>(CANISTER_ID_DIP20, idlFactoryDip20, { agent: httpAgent });
    idlRecycle = createActor<IDLRecycle>(CANISTER_ID_RECYCLE, idlFactoryRecycle, { agent: httpAgent });
  });

  client.on('disconnect', (e: any) => {
    console.info('disconnect');
    icpPrincipal.value = '';
  });

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
    providers: client.providers,
    icpPrincipal,
    icpAccount,
    connect(provider: Provider) {
      client.connect(provider.meta.id);
    },
    disconnect() {
      client.disconnect();
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
    /**
     *
     * @param param0 {account:ethernet account}
     * @returns
     */
    async deposit({ account }: { account: string }) {
      console.info('before', idlRecycle);
      const resp: RecycleResult = await idlRecycle.deposit(account);
      if ('Err' in resp) {
        const error = Object.keys(resp.Err).map((err) => err);
        return { _result: 1, _desc: error };
      }
      return { _result: 0 };
    },
  };
});
