import type { ActorSubclass, HttpAgentOptions, ActorConfig, Agent } from '@dfinity/agent';
import type { Principal } from '@dfinity/principal';
import type { IDL } from '@dfinity/candid';

export declare interface CreateActorOptions {
  /**
   * @see {@link Agent}
   */
  agent?: Agent;
  /**
   * @see {@link HttpAgentOptions}
   */
  agentOptions?: HttpAgentOptions;
  /**
   * @see {@link ActorConfig}
   */
  actorOptions?: ActorConfig;
}

/**
 * Intializes an {@link ActorSubclass}, configured with the provided SERVICE interface of a canister.
 * @constructs {@link ActorSubClass}
 * @param {string | Principal} canisterId - ID of the canister the {@link Actor} will talk to
 * @param {CreateActorOptions} options - see {@link CreateActorOptions}
 * @param {CreateActorOptions["agent"]} options.agent - a pre-configured agent you'd like to use. Supercedes agentOptions
 * @param {CreateActorOptions["agentOptions"]} options.agentOptions - options to set up a new agent
 * @see {@link HttpAgentOptions}
 * @param {CreateActorOptions["actorOptions"]} options.actorOptions - options for the Actor
 * @see {@link ActorConfig}
 */
export declare const createActor: (
  canisterId: string | Principal,
  idlFactory: IDL.InterfaceFactory,
  options?: CreateActorOptions
) => ActorSubclass<_SERVICE>;

// /**
//  * Intialized Actor using default settings, ready to talk to a canister using its candid interface
//  * @constructs {@link ActorSubClass}
//  */
// import { _SERVICE } from './edge_matrix_portal_backend.did';
// export declare const edge_matrix_portal_backend: ActorSubclass<_SERVICE>;
