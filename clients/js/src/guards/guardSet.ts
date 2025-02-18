import {
  AccountMeta,
  bitArray,
  Context,
  isNone,
  isSome,
  mergeBytes,
  none,
  Option,
  reverseSerializer,
  Serializer,
  Signer,
  some,
} from '@metaplex-foundation/umi';
import { UnregisteredCandyGuardError } from '../errors';
import {
  GuardInstructionExtras,
  GuardRemainingAccount,
  MintContext,
  RouteContext,
} from './guardManifest';
import { CandyGuardProgram, GuardRepository } from './guardRepository';

export type GuardSetArgs = {
  [name: string]: Option<object>;
};

export type GuardSet = {
  [name: string]: Option<object>;
};

export type GuardSetMintArgs = {
  [name: string]: Option<object>;
};

export type GuardSetRouteArgs = {
  [name: string]: object;
};

export function getGuardSetSerializer<
  DA extends GuardSetArgs,
  D extends DA & GuardSet = DA
>(
  context: Pick<Context, 'serializer'> & { guards: GuardRepository },
  program: CandyGuardProgram
): Serializer<Partial<DA>, D> {
  const manifests = context.guards.forProgram(program);
  const featuresSerializer = reverseSerializer(bitArray(8, true));
  return {
    description: 'guardSet',
    fixedSize: null,
    maxSize: null,
    serialize: (set: Partial<DA>): Uint8Array => {
      const features = [] as boolean[];
      const bytes = [] as Uint8Array[];
      manifests.forEach((manifest) => {
        const value = set[manifest.name] ?? none();
        features.push(isSome(value));
        bytes.push(
          isSome(value)
            ? manifest.serializer(context).serialize(value.value)
            : new Uint8Array()
        );
      });
      return mergeBytes([featuresSerializer.serialize(features), ...bytes]);
    },
    deserialize: (bytes: Uint8Array, offset = 0): [D, number] => {
      const [features, featuresOffset] = featuresSerializer.deserialize(
        bytes,
        offset
      );
      offset = featuresOffset;
      const guardSet = manifests.reduce((acc, manifest, index) => {
        acc[manifest.name] = none();
        if (!(features[index] ?? false)) return acc;
        const serializer = manifest.serializer(context);
        const [value, newOffset] = serializer.deserialize(bytes, offset);
        offset = newOffset;
        acc[manifest.name] = some(value);
        return acc;
      }, {} as GuardSet);
      return [guardSet as D, offset];
    },
  };
}

export function parseMintArgs<MA extends GuardSetMintArgs>(
  context: Pick<Context, 'serializer' | 'eddsa' | 'programs'> & {
    guards: GuardRepository;
  },
  program: CandyGuardProgram,
  mintContext: MintContext,
  mintArgs: Partial<MA>
): GuardInstructionExtras {
  const manifests = context.guards.forProgram(program);
  return manifests.reduce(
    (acc, manifest) => {
      const args = mintArgs[manifest.name] ?? none();
      if (isNone(args)) return acc;
      const { data, remainingAccounts } = manifest.mintParser(
        context,
        mintContext,
        args.value
      );
      return {
        data: mergeBytes([acc.data, data]),
        remainingAccounts: [...acc.remainingAccounts, ...remainingAccounts],
      };
    },
    { data: new Uint8Array(), remainingAccounts: [] } as GuardInstructionExtras
  );
}

export function parseRouteArgs<
  G extends keyof RA & string,
  RA extends GuardSetRouteArgs
>(
  context: Pick<Context, 'serializer' | 'eddsa' | 'programs'> & {
    guards: GuardRepository;
  },
  program: CandyGuardProgram,
  routeContext: RouteContext,
  guard: G,
  routeArgs: RA[G]
): GuardInstructionExtras & { guardIndex: number } {
  const manifests = context.guards.forProgram(program);
  const guardIndex = manifests.findIndex((m) => m.name === guard);
  if (guardIndex < 0) {
    throw new UnregisteredCandyGuardError(guard);
  }
  const manifest = manifests[guardIndex];
  const extras = manifest.routeParser(context, routeContext, routeArgs);
  return { ...extras, guardIndex };
}

export function parseGuardRemainingAccounts(
  remainingAccounts: GuardRemainingAccount[]
): [AccountMeta[], Signer[]] {
  const accounts = [] as AccountMeta[];
  const signers = [] as Signer[];
  remainingAccounts.forEach((account) => {
    if ('signer' in account) {
      signers.push(account.signer);
      accounts.push({
        pubkey: account.signer.publicKey,
        isSigner: true,
        isWritable: account.isWritable,
      });
    } else {
      accounts.push({
        pubkey: account.publicKey,
        isSigner: false,
        isWritable: account.isWritable,
      });
    }
  });
  return [accounts, signers];
}
