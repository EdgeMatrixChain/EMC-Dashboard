export const idlFactory = ({ IDL }) => {
  const emcResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: IDL.Variant({
      UnknownError: IDL.Null,
      ModelAlreadyExist: IDL.Null,
      CallerNotAuthorized: IDL.Null,
      ModelNotExist: IDL.Null,
    }),
  });
  return IDL.Service({
    addModel: IDL.Func([IDL.Text, IDL.Text], [emcResult], []),
    isModelListed: IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    listModels: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))], ['query']),
    listModelsByeType: IDL.Func([IDL.Text], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))], ['query']),
    removeModel: IDL.Func([IDL.Text], [emcResult], []),
    setAdmin: IDL.Func([IDL.Principal], [emcResult], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
