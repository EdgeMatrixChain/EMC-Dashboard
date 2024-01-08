import ABI from '@/web3/abi/stake-node';
import { Api } from './api';

export class StakeNodeApi extends Api {
  getAbi() {
    return ABI;
  }

  bindNode({ nodeId, nonce, signature }: { nodeId: string; nonce: string; signature: string }) {
    return super.call({ method: 'bindNode', data: [nodeId, nonce, signature] });
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
}
