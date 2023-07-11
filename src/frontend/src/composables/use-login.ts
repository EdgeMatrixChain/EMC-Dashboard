import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';

let client: AuthClient;

export function useLogin() {
  return {
    async loginIC() {
      if (!client) {
        client = await AuthClient.create();
      }
      
      let isAuthenticated = await client.isAuthenticated();
      let principal: Principal | undefined;
      //5ssih-b3y2b-ceh4g-plxk6-ggvjw-xguiz-hqzh5-gfz7k-hkosw-seqke-kqe
      if (isAuthenticated) {
        const identity = client.getIdentity();
        principal = identity.getPrincipal();
      } else {
        const resp = await new Promise<{ _result: number; _desc: string | undefined; principal?: Principal }>(
          (resolve) => {
            client.login({
              identityProvider: 'https://identity.ic0.app',
              onSuccess: () => {
                const identity = client.getIdentity();
                const principal = identity.getPrincipal();
                resolve({ _result: 0, _desc: '', principal });
              },
              onError: (e) => resolve({ _result: 1, _desc: e?.toString() }),
              windowOpenerFeatures:
                `left=${window.screen.width / 2 - 525 / 2}, ` +
                `top=${window.screen.height / 2 - 705 / 2},` +
                `toolbar=0,location=0,menubar=0,width=525,height=705`,
            });
          }
        );
        if (resp?.principal) {
          principal = resp.principal;
        }
      }
      console.info(principal?.toString());
    },
  };
}
