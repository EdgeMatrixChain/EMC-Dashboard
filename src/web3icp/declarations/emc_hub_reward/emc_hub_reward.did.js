export const idlFactory = ({ IDL }) => {
  const RewardRecord = IDL.Record({
    emcReceiver: IDL.Principal,
    emcComment: IDL.Text,
    emcTxnID: IDL.Nat,
    emcHubID: IDL.Text,
    emcAmount: IDL.Nat,
  });
  const EmcHubReceipt = IDL.Variant({
    Ok: IDL.Nat,
    Error: IDL.Variant({
      SentRewardAlready: IDL.Null,
      InsufficientBalance: IDL.Null,
      RewardEnded: IDL.Null,
      TransferFailed: IDL.Null,
    }),
  });
  return IDL.Service({
    balanceOf: IDL.Func([IDL.Principal], [IDL.Nat], []),
    getEmcHubOperator: IDL.Func([], [IDL.Principal], ['query']),
    getNextRewardAmount: IDL.Func([], [IDL.Nat], ['query']),
    getOwner: IDL.Func([], [IDL.Principal], ['query']),
    getRewardCount: IDL.Func([], [IDL.Nat], ['query']),
    getRewardDetail: IDL.Func([IDL.Text], [IDL.Opt(RewardRecord)], ['query']),
    goProduction: IDL.Func([], [EmcHubReceipt], []),
    selfBalance: IDL.Func([], [IDL.Nat], []),
    setEmcHubOperator: IDL.Func([IDL.Principal], [IDL.Principal], []),
    submitReward: IDL.Func([IDL.Text, IDL.Principal, IDL.Text], [EmcHubReceipt], []),
    withdrawTo: IDL.Func([IDL.Principal], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
