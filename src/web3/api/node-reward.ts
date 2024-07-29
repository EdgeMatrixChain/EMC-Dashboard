import ABI from '@/web3/abi/node-reward';
import { Api } from './api';

type ClaimWithSignatureOption = {
  amount: bigint;
  account: string;
  nodeId: string;
  nonce: string;
  sign1: string;
  sign2: string;
  sign3: string;
};
export class NodeRewardApi extends Api {
  getAbi() {
    return ABI;
  }

  claimWithSignature({ amount, account, nodeId, nonce, sign1, sign2, sign3 }: ClaimWithSignatureOption) {
    return super.call({ method: 'ClaimWithSignature', data: [amount, account, nodeId, nonce, sign1, sign2, sign3] });
  }
}
