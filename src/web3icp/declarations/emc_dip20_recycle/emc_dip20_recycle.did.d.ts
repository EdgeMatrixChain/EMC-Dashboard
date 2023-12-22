import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export declare const idlFactory: IDL.InterfaceFactory;
export interface Balance {
  owner: Principal;
  erc20_wallet_address: string;
  amount: bigint;
}
export type DepositErr =
  | { TransferFailure: null }
  | { WhiteListInsufficient: null }
  | { NotInWhiteList: null }
  | { BalanceLow: null }
  | { AccountAlreadyExist: null };
export interface Order {
  id: number;
  to: string;
  fromAmount: bigint;
  createAt: bigint;
  owner: Principal;
  from: Principal;
  toAmount: bigint;
}
export type Result = { Ok: bigint } | { Err: DepositErr };
export interface WalletReceiveResult {
  accepted: bigint;
}
export interface WhitelistInfoResult {
  owner: Principal;
  used: bigint;
  quota: bigint;
}
export interface _SERVICE {
  deposit: ActorMethod<[string], Result>;
  get_all_balances: ActorMethod<[], Array<Balance>>;
  get_balances: ActorMethod<[], Array<Balance>>;
  get_order: ActorMethod<[number], [] | [Order]>;
  get_orders: ActorMethod<[], Array<Order>>;
  get_system_params: ActorMethod<[], [] | [Principal]>;
  get_user_whitelist: ActorMethod<[Principal], [] | [WhitelistInfoResult]>;
  query_canister_slice: ActorMethod<[Principal], Uint8Array | number[]>;
  set_owner: ActorMethod<[[] | [Principal]], [] | [Principal]>;
  set_system_params: ActorMethod<[[] | [Principal]], [] | [Principal]>;
  wallet_balance: ActorMethod<[], bigint>;
  wallet_receive: ActorMethod<[], WalletReceiveResult>;
  whitelist_deposit: ActorMethod<[string], Result>;
  whoami: ActorMethod<[], Principal>;
}
