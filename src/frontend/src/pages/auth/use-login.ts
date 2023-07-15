import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';

let client: AuthClient;

type InternetIdentityLoginResponse = {
  _result: 0 | number;
  _desc?: string;
  principal?: string;
};
type InternetPlugLoginResponse = {
  _result: 0 | number;
  _desc?: string;
  principal?: string;
};
type InternetMeLoginResponse = {};

async function dfinityLogin() {
  if (!client) {
    client = await AuthClient.create();
  }
  return new Promise<InternetIdentityLoginResponse>((resolve) => {
    client.login({
      identityProvider: 'https://identity.ic0.app',
      windowOpenerFeatures: `left=${window.screen.width / 2 - 525 / 2}, ` + `top=${window.screen.height / 2 - 705 / 2},` + `toolbar=0,location=0,menubar=0,width=525,height=705`,
      onSuccess: () => {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal();
        resolve({ _result: 0, _desc: '', principal: principal.toString() });
      },
      onError: (e) => resolve({ _result: 1, _desc: e?.toString() }),
    });
  });
}

async function plugLogin() {
  return new Promise<InternetPlugLoginResponse>(async (resolve) => {
    try {
      window.ic.plug && 'Plug and play!';
      try {
        await window.ic.plug.requestConnect().then(() => {
          console.log('principalId:', window.ic.plug.principalId);
          console.log('accountId:', window.ic.plug.accountId);
        });
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      // no plug
    }
  });
}

async function internetIdentityLogin(): Promise<InternetIdentityLoginResponse> {
  if (!client) {
    client = await AuthClient.create();
  }

  let isAuthenticated = await client.isAuthenticated();

  if (isAuthenticated) {
    const identity = client.getIdentity();
    return { _result: 0, principal: identity.getPrincipal().toString() };
  }

  const resp = await dfinityLogin();
  return resp;
}

async function internetPlugLogin(): Promise<InternetPlugLoginResponse> {
  // return { _result: 0, principal: window.ic.plug.principalId };

  const resp = await plugLogin();
  return resp;
}
// async function internetMeLogin(): Promise<InternetMeLoginResponse> {}

export function useLogin() {
  return {
    internetIdentityLogin,
    internetPlugLogin,
    // internetMeLogin,
  };
}
