import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  greet: ActorMethod<[string], string>;
}

export const idlFactory: IDL.InterfaceFactory;
