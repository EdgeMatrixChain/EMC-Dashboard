import ABI from '@/web3/abi/stake-node';
import { Api } from './api';

export class StakeNodeApi extends Api {
  getAbi() {
    return ABI;
  }

  bindNode({ nodeId, account, nonce, signature }: { nodeId: string; account: string; nonce: string; signature: string }) {
    return super.call({ method: 'bindNode', data: [nodeId, account, nonce, signature] });
  }

  deposit({ nodeId, amount }: { nodeId: string; amount: bigint }) {
    return super.call({ method: 'deposit', data: [nodeId, amount] });
  }

  withdraw({ nodeId, account, amount }: { nodeId: string; account: string; amount: bigint }) {
    return super.call({ method: 'withdraw', data: [nodeId, account, amount] });
  }

  releaseContract() {
    return super.call({ method: 'releaseContract' });
  }

  token() {
    return super.call({ method: 'token' });
  }

  nodeInfo({ nodeId }: { nodeId: string }) {
    return super.call({ method: 'nodeInfo', data: [nodeId] });
  }

  claimWithSignature({ amount, account, nodeId, nonce, signature }: { amount: bigint; account: string; nodeId: string; nonce: string; signature: string }) {
    return super.call({ method: 'ClaimWithSignature', data: [amount, account, nodeId, nonce, signature] });
  }

  tokenInPool() {
    return super.call({ method: 'tokenInPool' });
  }
  minLimit() {
    return super.call({ method: 'minLimit' });
  }
}
