/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  MetadataDelegateRole,
  TokenStandard,
  TokenStandardArgs,
  findMasterEditionPda,
  findMetadataDelegateRecordPda,
  findMetadataPda,
  getTokenStandardSerializer,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  AccountMeta,
  Amount,
  Context,
  Option,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapAmountSerializer,
  mapSerializer,
  none,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { findCandyMachineAuthorityPda } from '../../hooked';
import { addObjectProperty, isWritable } from '../shared';
import {
  ConfigLineSettings,
  ConfigLineSettingsArgs,
  Creator,
  CreatorArgs,
  HiddenSettings,
  HiddenSettingsArgs,
  getConfigLineSettingsSerializer,
  getCreatorSerializer,
  getHiddenSettingsSerializer,
} from '../types';

// Accounts.
export type InitializeCandyMachineV2InstructionAccounts = {
  candyMachine: PublicKey;
  authorityPda?: PublicKey;
  authority?: PublicKey;
  payer?: Signer;
  ruleSet?: PublicKey;
  collectionMetadata?: PublicKey;
  collectionMint: PublicKey;
  collectionMasterEdition?: PublicKey;
  collectionUpdateAuthority: Signer;
  collectionDelegateRecord?: PublicKey;
  tokenMetadataProgram?: PublicKey;
  systemProgram?: PublicKey;
  sysvarInstructions?: PublicKey;
  authorizationRulesProgram?: PublicKey;
  authorizationRules?: PublicKey;
};

// Data.
export type InitializeCandyMachineV2InstructionData = {
  discriminator: Array<number>;
  /** Number of assets available */
  itemsAvailable: bigint;
  /** Symbol for the asset */
  symbol: string;
  /** Secondary sales royalty basis points (0-10000) */
  sellerFeeBasisPoints: Amount<'%', 2>;
  /** Max supply of each individual asset (default 0) */
  maxEditionSupply: bigint;
  /** Indicates if the asset is mutable or not (default yes) */
  isMutable: boolean;
  /** List of creators */
  creators: Array<Creator>;
  /** Config line settings */
  configLineSettings: Option<ConfigLineSettings>;
  /** Hidden setttings */
  hiddenSettings: Option<HiddenSettings>;
  tokenStandard: TokenStandard;
};

export type InitializeCandyMachineV2InstructionDataArgs = {
  /** Number of assets available */
  itemsAvailable: number | bigint;
  /** Symbol for the asset */
  symbol?: string;
  /** Secondary sales royalty basis points (0-10000) */
  sellerFeeBasisPoints: Amount<'%', 2>;
  /** Max supply of each individual asset (default 0) */
  maxEditionSupply?: number | bigint;
  /** Indicates if the asset is mutable or not (default yes) */
  isMutable?: boolean;
  /** List of creators */
  creators: Array<CreatorArgs>;
  /** Config line settings */
  configLineSettings?: Option<ConfigLineSettingsArgs>;
  /** Hidden setttings */
  hiddenSettings?: Option<HiddenSettingsArgs>;
  tokenStandard: TokenStandardArgs;
};

export function getInitializeCandyMachineV2InstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  InitializeCandyMachineV2InstructionDataArgs,
  InitializeCandyMachineV2InstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    InitializeCandyMachineV2InstructionDataArgs,
    any,
    InitializeCandyMachineV2InstructionData
  >(
    s.struct<InitializeCandyMachineV2InstructionData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['itemsAvailable', s.u64()],
        ['symbol', s.string()],
        ['sellerFeeBasisPoints', mapAmountSerializer(s.u16(), '%', 2)],
        ['maxEditionSupply', s.u64()],
        ['isMutable', s.bool()],
        ['creators', s.array(getCreatorSerializer(context))],
        [
          'configLineSettings',
          s.option(getConfigLineSettingsSerializer(context)),
        ],
        ['hiddenSettings', s.option(getHiddenSettingsSerializer(context))],
        ['tokenStandard', getTokenStandardSerializer(context)],
      ],
      { description: 'InitializeCandyMachineV2InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [67, 153, 175, 39, 218, 16, 38, 32],
      symbol: value.symbol ?? '',
      maxEditionSupply: value.maxEditionSupply ?? 0,
      isMutable: value.isMutable ?? true,
      configLineSettings: value.configLineSettings ?? none(),
      hiddenSettings: value.hiddenSettings ?? none(),
    })
  ) as Serializer<
    InitializeCandyMachineV2InstructionDataArgs,
    InitializeCandyMachineV2InstructionData
  >;
}

// Args.
export type InitializeCandyMachineV2InstructionArgs =
  InitializeCandyMachineV2InstructionDataArgs;

// Instruction.
export function initializeCandyMachineV2(
  context: Pick<
    Context,
    'serializer' | 'programs' | 'eddsa' | 'identity' | 'payer'
  >,
  input: InitializeCandyMachineV2InstructionAccounts &
    InitializeCandyMachineV2InstructionArgs
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
  const resolvingArgs = {};
  addObjectProperty(
    resolvingAccounts,
    'authorityPda',
    input.authorityPda ??
      findCandyMachineAuthorityPda(context, {
        candyMachine: publicKey(input.candyMachine),
      })
  );
  addObjectProperty(
    resolvingAccounts,
    'authority',
    input.authority ?? context.identity.publicKey
  );
  addObjectProperty(resolvingAccounts, 'payer', input.payer ?? context.payer);
  addObjectProperty(resolvingAccounts, 'ruleSet', input.ruleSet ?? programId);
  addObjectProperty(
    resolvingAccounts,
    'collectionMetadata',
    input.collectionMetadata ??
      findMetadataPda(context, { mint: publicKey(input.collectionMint) })
  );
  addObjectProperty(
    resolvingAccounts,
    'collectionMasterEdition',
    input.collectionMasterEdition ??
      findMasterEditionPda(context, { mint: publicKey(input.collectionMint) })
  );
  addObjectProperty(
    resolvingAccounts,
    'collectionDelegateRecord',
    input.collectionDelegateRecord ??
      findMetadataDelegateRecordPda(context, {
        mint: publicKey(input.collectionMint),
        delegateRole: MetadataDelegateRole.Collection,
        updateAuthority: publicKey(input.collectionUpdateAuthority),
        delegate: publicKey(resolvingAccounts.authorityPda),
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
  addObjectProperty(
    resolvingAccounts,
    'sysvarInstructions',
    input.sysvarInstructions ??
      publicKey('Sysvar1nstructions1111111111111111111111111')
  );
  addObjectProperty(
    resolvingAccounts,
    'authorizationRulesProgram',
    input.authorizationRulesProgram ?? programId
  );
  addObjectProperty(
    resolvingAccounts,
    'authorizationRules',
    input.authorizationRules ?? programId
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Candy Machine.
  keys.push({
    pubkey: resolvedAccounts.candyMachine,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.candyMachine, true),
  });

  // Authority Pda.
  keys.push({
    pubkey: resolvedAccounts.authorityPda,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.authorityPda, true),
  });

  // Authority.
  keys.push({
    pubkey: resolvedAccounts.authority,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.authority, false),
  });

  // Payer.
  signers.push(resolvedAccounts.payer);
  keys.push({
    pubkey: resolvedAccounts.payer.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.payer, true),
  });

  // Rule Set.
  keys.push({
    pubkey: resolvedAccounts.ruleSet,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.ruleSet, false),
  });

  // Collection Metadata.
  keys.push({
    pubkey: resolvedAccounts.collectionMetadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collectionMetadata, true),
  });

  // Collection Mint.
  keys.push({
    pubkey: resolvedAccounts.collectionMint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collectionMint, false),
  });

  // Collection Master Edition.
  keys.push({
    pubkey: resolvedAccounts.collectionMasterEdition,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collectionMasterEdition, false),
  });

  // Collection Update Authority.
  signers.push(resolvedAccounts.collectionUpdateAuthority);
  keys.push({
    pubkey: resolvedAccounts.collectionUpdateAuthority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.collectionUpdateAuthority, true),
  });

  // Collection Delegate Record.
  keys.push({
    pubkey: resolvedAccounts.collectionDelegateRecord,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collectionDelegateRecord, true),
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

  // Sysvar Instructions.
  keys.push({
    pubkey: resolvedAccounts.sysvarInstructions,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.sysvarInstructions, false),
  });

  // Authorization Rules Program.
  keys.push({
    pubkey: resolvedAccounts.authorizationRulesProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.authorizationRulesProgram, false),
  });

  // Authorization Rules.
  keys.push({
    pubkey: resolvedAccounts.authorizationRules,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.authorizationRules, false),
  });

  // Data.
  const data =
    getInitializeCandyMachineV2InstructionDataSerializer(context).serialize(
      resolvedArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
