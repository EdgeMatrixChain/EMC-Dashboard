export const idlFactory = ({ IDL }) => {
  const DepositErr = IDL.Variant({
    TransferFailure: IDL.Null,
    WhiteListInsufficient: IDL.Null,
    NotInWhiteList: IDL.Null,
    BalanceLow: IDL.Null,
    AccountAlreadyExist: IDL.Null,
  });
  const Result = IDL.Variant({ Ok: IDL.Nat, Err: DepositErr });
  const Balance = IDL.Record({
    owner: IDL.Principal,
    erc20_wallet_address: IDL.Text,
    amount: IDL.Nat,
  });
  const Order = IDL.Record({
    id: IDL.Nat32,
    to: IDL.Text,
    fromAmount: IDL.Nat,
    createAt: IDL.Nat64,
    owner: IDL.Principal,
    from: IDL.Principal,
    toAmount: IDL.Nat,
  });
  const WhitelistInfoResult = IDL.Record({
    owner: IDL.Principal,
    used: IDL.Nat,
    quota: IDL.Nat,
  });
  const WalletReceiveResult = IDL.Record({ accepted: IDL.Nat64 });
  return IDL.Service({
    deposit: IDL.Func([IDL.Text], [Result], []),
    get_all_balances: IDL.Func([], [IDL.Vec(Balance)], ['query']),
    get_balances: IDL.Func([], [IDL.Vec(Balance)], ['query']),
    get_order: IDL.Func([IDL.Nat32], [IDL.Opt(Order)], []),
    get_orders: IDL.Func([], [IDL.Vec(Order)], []),
    get_system_params: IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    get_user_whitelist: IDL.Func([IDL.Principal], [IDL.Opt(WhitelistInfoResult)], ['query']),
    query_canister_slice: IDL.Func([IDL.Principal], [IDL.Vec(IDL.Nat8)], ['query']),
    set_owner: IDL.Func([IDL.Opt(IDL.Principal)], [IDL.Opt(IDL.Principal)], []),
    set_system_params: IDL.Func([IDL.Opt(IDL.Principal)], [IDL.Opt(IDL.Principal)], []),
    wallet_balance: IDL.Func([], [IDL.Nat], ['query']),
    wallet_receive: IDL.Func([], [WalletReceiveResult], []),
    whitelist_deposit: IDL.Func([IDL.Text], [Result], []),
    whoami: IDL.Func([], [IDL.Principal], ['query']),
  });
};

export const init = ({ IDL }) => {
  return [];
};
