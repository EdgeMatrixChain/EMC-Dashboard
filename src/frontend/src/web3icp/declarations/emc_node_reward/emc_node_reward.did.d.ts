import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export declare const idlFactory: IDL.InterfaceFactory;

export interface FailedReward {
  nodeID: string;
  rewardAmount: bigint;
  computingPower: bigint;
  rewardDay: bigint;
  wallet: Principal;
  validatedTimes: bigint;
  faildTime: Time;
  totalPower: bigint;
  dayPower: bigint;
}
export interface Node {
  nodeID: string;
  owner: Principal;
  wallet: Principal;
  registered: Time;
  nodeType: bigint;
}
export interface NodeValidationRequest {
  validationTicket: bigint;
  power: bigint;
  targetNodeID: string;
}
export type Time = bigint;
export type emcResult =
  | { Ok: bigint }
  | {
      Err:
        | { StakeTooShort: null }
        | { NodeAlreadyExist: null }
        | { NodeNotExist: null }
        | { UnknownError: null }
        | { StakedBefore: null }
        | { UnknowType: null }
        | { InsufficientBalance: null }
        | { StakeNotEnough: null }
        | { CallerNotAuthorized: null }
        | { DuplicatedValidation: null }
        | { CanNotUnstake: null }
        | { TokenTransferFailed: null }
        | { NoStakeFound: null }
        | { NotAValidator: null };
    };
export interface _SERVICE {
  addRouter: ActorMethod<[Principal], emcResult>;
  addValidator: ActorMethod<[Principal], emcResult>;
  cancelRewardTask: ActorMethod<[], emcResult>;
  exeuteReward: ActorMethod<[], emcResult>;
  getCurrentDayReward: ActorMethod<[], bigint>;
  getNodeStatus: ActorMethod<[], [bigint, bigint, bigint, bigint]>;
  getOwner: ActorMethod<[], Principal>;
  isRouter: ActorMethod<[Principal], boolean>;
  isValidatorPrincipal: ActorMethod<[Principal], boolean>;
  launchRewardTask: ActorMethod<[], emcResult>;
  listComputingNodes: ActorMethod<[bigint, bigint], Array<Node>>;
  listRouterNodes: ActorMethod<[], Array<Node>>;
  listRouters: ActorMethod<[], Array<[Principal, Time]>>;
  listValidatorNodes: ActorMethod<[], Array<Node>>;
  listValidators: ActorMethod<[], Array<[Principal, Time]>>;
  myCurrentEPower: ActorMethod<[string], [bigint, number]>;
  myNode: ActorMethod<[string], Array<Node>>;
  myStake: ActorMethod<[string], [bigint, bigint, bigint]>;
  postDeposit: ActorMethod<[], emcResult>;
  registerComputingNode: ActorMethod<[string, Principal], emcResult>;
  registerRouterNode: ActorMethod<[string, Principal], emcResult>;
  registerValidatorNode: ActorMethod<[string, Principal], emcResult>;
  removeRouter: ActorMethod<[Principal], emcResult>;
  removeValidator: ActorMethod<[Principal], emcResult>;
  selfbalance: ActorMethod<[], bigint>;
  showFaildReward: ActorMethod<[bigint, bigint], Array<FailedReward>>;
  showNodeRewardStatus: ActorMethod<[string], [string, bigint, bigint]>;
  showTotalRewardsStatus: ActorMethod<[], [bigint, bigint, bigint, bigint]>;
  stake: ActorMethod<[bigint, bigint, string], emcResult>;
  startTestnet: ActorMethod<[], emcResult>;
  stopTestnet: ActorMethod<[], emcResult>;
  submitComputingValidation: ActorMethod<[Array<NodeValidationRequest>], emcResult>;
  tryTodayReward: ActorMethod<[], Array<[string, bigint]>>;
  unStake: ActorMethod<[string], emcResult>;
  unregisterComputingNode: ActorMethod<[string], emcResult>;
  unregisterRouterNode: ActorMethod<[string], emcResult>;
  unregisterValidatorNode: ActorMethod<[string], emcResult>;
  updateDayValidaionRounds: ActorMethod<[bigint], emcResult>;
  whoAmI: ActorMethod<[], Principal>;
  withdrawTo: ActorMethod<[Principal], emcResult>;
}
