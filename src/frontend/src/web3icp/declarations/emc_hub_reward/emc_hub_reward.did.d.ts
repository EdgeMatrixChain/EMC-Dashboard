import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export declare const idlFactory: IDL.InterfaceFactory;

export type EmcHubReceipt =
  | { Ok: bigint }
  | {
      Error:
        | { SentRewardAlready: null }
        | { InsufficientBalance: null }
        | { RewardEnded: null }
        | { TransferFailed: null };
    };
export interface RewardRecord {
  emcReceiver: Principal;
  emcComment: string;
  emcTxnID: bigint;
  emcHubID: string;
  emcAmount: bigint;
}
export interface _SERVICE {
  balanceOf: ActorMethod<[Principal], bigint>;
  getEmcHubOperator: ActorMethod<[], Principal>;
  getNextRewardAmount: ActorMethod<[], bigint>;
  getOwner: ActorMethod<[], Principal>;
  getRewardCount: ActorMethod<[], bigint>;
  getRewardDetail: ActorMethod<[string], [] | [RewardRecord]>;
  goProduction: ActorMethod<[], EmcHubReceipt>;
  selfBalance: ActorMethod<[], bigint>;
  setEmcHubOperator: ActorMethod<[Principal], Principal>;
  submitReward: ActorMethod<[string, Principal, string], EmcHubReceipt>;
  withdrawTo: ActorMethod<[Principal], bigint>;
}
