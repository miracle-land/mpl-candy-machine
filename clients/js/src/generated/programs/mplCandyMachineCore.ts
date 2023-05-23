/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  ClusterFilter,
  Context,
  Program,
  PublicKey,
  publicKey,
} from '@metaplex-foundation/umi';
import {
  getMplCandyMachineCoreErrorFromCode,
  getMplCandyMachineCoreErrorFromName,
} from '../errors';

export const MPL_CANDY_MACHINE_CORE_PROGRAM_ID = publicKey(
  'CMv3YQQ7nbhFUjArAcGuRcDa6avoYN1a72HRZMvJ6WnU'
);

export function createMplCandyMachineCoreProgram(): Program {
  return {
    name: 'mplCandyMachineCore',
    publicKey: MPL_CANDY_MACHINE_CORE_PROGRAM_ID,
    getErrorFromCode(code: number, cause?: Error) {
      return getMplCandyMachineCoreErrorFromCode(code, this, cause);
    },
    getErrorFromName(name: string, cause?: Error) {
      return getMplCandyMachineCoreErrorFromName(name, this, cause);
    },
    isOnCluster() {
      return true;
    },
  };
}

export function getMplCandyMachineCoreProgram<T extends Program = Program>(
  context: Pick<Context, 'programs'>,
  clusterFilter?: ClusterFilter
): T {
  return context.programs.get<T>('mplCandyMachineCore', clusterFilter);
}

export function getMplCandyMachineCoreProgramId(
  context: Pick<Context, 'programs'>,
  clusterFilter?: ClusterFilter
): PublicKey {
  return context.programs.getPublicKey(
    'mplCandyMachineCore',
    MPL_CANDY_MACHINE_CORE_PROGRAM_ID,
    clusterFilter
  );
}
