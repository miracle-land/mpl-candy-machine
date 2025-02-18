/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Context, PublicKey, Serializer } from '@metaplex-foundation/umi';

/** Guard that restricts access to a specific address. */
export type AddressGate = { address: PublicKey };

export type AddressGateArgs = AddressGate;

export function getAddressGateSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<AddressGateArgs, AddressGate> {
  const s = context.serializer;
  return s.struct<AddressGate>([['address', s.publicKey()]], {
    description: 'AddressGate',
  }) as Serializer<AddressGateArgs, AddressGate>;
}
