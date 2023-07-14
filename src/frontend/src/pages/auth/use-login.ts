import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';

let client: AuthClient;

type InternetIdentityLoginResponse = {
  _result: 0 | number;
  _desc?: string;
  principal?: string;
};

async function dfinityLogin() {
  if (!client) {
    client = await AuthClient.create();
  }
  return new Promise<InternetIdentityLoginResponse>((resolve) => {
    client.login({
      identityProvider: 'https://identity.ic0.app',
      windowOpenerFeatures:
        `left=${window.screen.width / 2 - 525 / 2}, ` +
        `top=${window.screen.height / 2 - 705 / 2},` +
        `toolbar=0,location=0,menubar=0,width=525,height=705`,
      onSuccess: () => {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal();
        resolve({ _result: 0, _desc: '', principal: principal.toString() });
      },
      onError: (e) => resolve({ _result: 1, _desc: e?.toString() }),
    });
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

export function useLogin() {
  return {
    internetIdentityLogin,
  };
}
