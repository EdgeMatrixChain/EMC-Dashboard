import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
export declare const idlFactory: IDL.InterfaceFactory;

export type emcResult =
  | { Ok: bigint }
  | {
      Err:
        | { UnknownError: null }
        | { ModelAlreadyExist: null }
        | { CallerNotAuthorized: null }
        | { ModelNotExist: null };
    };
export interface _SERVICE {
  addModel: ActorMethod<[string, string], emcResult>;
  isModelListed: ActorMethod<[string], boolean>;
  listModels: ActorMethod<[], Array<[string, string]>>;
  listModelsByeType: ActorMethod<[string], Array<[string, string]>>;
  removeModel: ActorMethod<[string], emcResult>;
  setAdmin: ActorMethod<[Principal], emcResult>;
}
