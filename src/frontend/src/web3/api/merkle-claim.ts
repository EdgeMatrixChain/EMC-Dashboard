import ABI_MERKLE_CLAIM from '@/web3/abi/merkle-claim';
import { Api } from './api';

export class MerkleClaimApi extends Api {
  getAbi() {
    return ABI_MERKLE_CLAIM;
  }
  /**
   *
   * @param index:bigint account:string,amount:bigint,merkleProof:bytes32[]
   * @returns
   */
  async claim({ index, account, amount, merkleProof }: any) {
    return super.call({ method: 'claim', data: [index, account, amount, merkleProof] });
  }
}
