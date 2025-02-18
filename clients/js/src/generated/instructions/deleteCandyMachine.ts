/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type DeleteCandyMachineInstructionAccounts = {
  candyMachine: PublicKey;
  authority?: Signer;
};

// Data.
export type DeleteCandyMachineInstructionData = {
  discriminator: Array<number>;
};

export type DeleteCandyMachineInstructionDataArgs = {};

export function getDeleteCandyMachineInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  DeleteCandyMachineInstructionDataArgs,
  DeleteCandyMachineInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    DeleteCandyMachineInstructionDataArgs,
    any,
    DeleteCandyMachineInstructionData
  >(
    s.struct<DeleteCandyMachineInstructionData>(
      [['discriminator', s.array(s.u8(), { size: 8 })]],
      { description: 'DeleteCandyMachineInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [183, 18, 70, 156, 148, 109, 161, 34],
    })
  ) as Serializer<
    DeleteCandyMachineInstructionDataArgs,
    DeleteCandyMachineInstructionData
  >;
}

// Instruction.
export function deleteCandyMachine(
  context: Pick<Context, 'serializer' | 'programs' | 'identity'>,
  input: DeleteCandyMachineInstructionAccounts
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'mplCandyMachineCore',
      'CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  addObjectProperty(
    resolvingAccounts,
    'authority',
    input.authority ?? context.identity
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };

  // Candy Machine.
  keys.push({
    pubkey: resolvedAccounts.candyMachine,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.candyMachine, true),
  });

  // Authority.
  signers.push(resolvedAccounts.authority);
  keys.push({
    pubkey: resolvedAccounts.authority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.authority, true),
  });

  // Data.
  const data = getDeleteCandyMachineInstructionDataSerializer(
    context
  ).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
