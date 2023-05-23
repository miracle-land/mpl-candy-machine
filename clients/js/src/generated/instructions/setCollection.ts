/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  findCollectionAuthorityRecordPda,
  findMasterEditionPda,
  findMetadataPda,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { findCandyMachineAuthorityPda } from '../../hooked';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type SetCollectionInstructionAccounts = {
  candyMachine: PublicKey;
  authority?: Signer;
  authorityPda?: PublicKey;
  payer?: Signer;
  collectionMint: PublicKey;
  collectionMetadata?: PublicKey;
  collectionAuthorityRecord?: PublicKey;
  newCollectionUpdateAuthority: Signer;
  newCollectionMetadata?: PublicKey;
  newCollectionMint: PublicKey;
  newCollectionMasterEdition?: PublicKey;
  newCollectionAuthorityRecord?: PublicKey;
  tokenMetadataProgram?: PublicKey;
  systemProgram?: PublicKey;
};

// Data.
export type SetCollectionInstructionData = { discriminator: Array<number> };

export type SetCollectionInstructionDataArgs = {};

export function getSetCollectionInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<SetCollectionInstructionDataArgs, SetCollectionInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    SetCollectionInstructionDataArgs,
    any,
    SetCollectionInstructionData
  >(
    s.struct<SetCollectionInstructionData>(
      [['discriminator', s.array(s.u8(), { size: 8 })]],
      { description: 'SetCollectionInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [192, 254, 206, 76, 168, 182, 59, 223],
    })
  ) as Serializer<
    SetCollectionInstructionDataArgs,
    SetCollectionInstructionData
  >;
}

// Instruction.
export function setCollection(
  context: Pick<
    Context,
    'serializer' | 'programs' | 'eddsa' | 'identity' | 'payer'
  >,
  input: SetCollectionInstructionAccounts
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'mplCandyMachineCore',
      'CMv3YQQ7nbhFUjArAcGuRcDa6avoYN1a72HRZMvJ6WnU'
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
  addObjectProperty(
    resolvingAccounts,
    'authorityPda',
    input.authorityPda ??
      findCandyMachineAuthorityPda(context, {
        candyMachine: publicKey(input.candyMachine),
      })
  );
  addObjectProperty(resolvingAccounts, 'payer', input.payer ?? context.payer);
  addObjectProperty(
    resolvingAccounts,
    'collectionMetadata',
    input.collectionMetadata ??
      findMetadataPda(context, { mint: publicKey(input.collectionMint) })
  );
  addObjectProperty(
    resolvingAccounts,
    'collectionAuthorityRecord',
    input.collectionAuthorityRecord ??
      findCollectionAuthorityRecordPda(context, {
        mint: publicKey(input.collectionMint),
        collectionAuthority: publicKey(resolvingAccounts.authorityPda),
      })
  );
  addObjectProperty(
    resolvingAccounts,
    'newCollectionMetadata',
    input.newCollectionMetadata ??
      findMetadataPda(context, { mint: publicKey(input.newCollectionMint) })
  );
  addObjectProperty(
    resolvingAccounts,
    'newCollectionMasterEdition',
    input.newCollectionMasterEdition ??
      findMasterEditionPda(context, {
        mint: publicKey(input.newCollectionMint),
      })
  );
  addObjectProperty(
    resolvingAccounts,
    'newCollectionAuthorityRecord',
    input.newCollectionAuthorityRecord ??
      findCollectionAuthorityRecordPda(context, {
        mint: publicKey(input.newCollectionMint),
        collectionAuthority: publicKey(resolvingAccounts.authorityPda),
      })
  );
  addObjectProperty(
    resolvingAccounts,
    'tokenMetadataProgram',
    input.tokenMetadataProgram ?? {
      ...context.programs.getPublicKey(
        'mplTokenMetadata',
        'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
      ),
      isWritable: false,
    }
  );
  addObjectProperty(
    resolvingAccounts,
    'systemProgram',
    input.systemProgram ?? {
      ...context.programs.getPublicKey(
        'splSystem',
        '11111111111111111111111111111111'
      ),
      isWritable: false,
    }
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
    isWritable: isWritable(resolvedAccounts.authority, false),
  });

  // Authority Pda.
  keys.push({
    pubkey: resolvedAccounts.authorityPda,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.authorityPda, true),
  });

  // Payer.
  signers.push(resolvedAccounts.payer);
  keys.push({
    pubkey: resolvedAccounts.payer.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.payer, false),
  });

  // Collection Mint.
  keys.push({
    pubkey: resolvedAccounts.collectionMint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collectionMint, false),
  });

  // Collection Metadata.
  keys.push({
    pubkey: resolvedAccounts.collectionMetadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collectionMetadata, false),
  });

  // Collection Authority Record.
  keys.push({
    pubkey: resolvedAccounts.collectionAuthorityRecord,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collectionAuthorityRecord, true),
  });

  // New Collection Update Authority.
  signers.push(resolvedAccounts.newCollectionUpdateAuthority);
  keys.push({
    pubkey: resolvedAccounts.newCollectionUpdateAuthority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.newCollectionUpdateAuthority, true),
  });

  // New Collection Metadata.
  keys.push({
    pubkey: resolvedAccounts.newCollectionMetadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.newCollectionMetadata, false),
  });

  // New Collection Mint.
  keys.push({
    pubkey: resolvedAccounts.newCollectionMint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.newCollectionMint, false),
  });

  // New Collection Master Edition.
  keys.push({
    pubkey: resolvedAccounts.newCollectionMasterEdition,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.newCollectionMasterEdition, false),
  });

  // New Collection Authority Record.
  keys.push({
    pubkey: resolvedAccounts.newCollectionAuthorityRecord,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.newCollectionAuthorityRecord, true),
  });

  // Token Metadata Program.
  keys.push({
    pubkey: resolvedAccounts.tokenMetadataProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.tokenMetadataProgram, false),
  });

  // System Program.
  keys.push({
    pubkey: resolvedAccounts.systemProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.systemProgram, false),
  });

  // Data.
  const data = getSetCollectionInstructionDataSerializer(context).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
