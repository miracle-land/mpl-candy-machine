import { findAssociatedTokenPda } from '@metaplex-foundation/mpl-essentials';
import {
  getTokenPaymentSerializer,
  TokenPayment,
  TokenPaymentArgs,
} from '../generated';
import { GuardManifest, noopParser } from '../guards';

/**
 * The tokenPayment guard allows minting by charging the
 * payer a specific amount of tokens from a certain mint acount.
 * The tokens will be transfered to a predefined destination.
 *
 * This guard alone does not limit how many times a holder
 * can mint. A holder can mint as many times as they have
 * the required amount of tokens to pay with.
 */
export const tokenPaymentGuardManifest: GuardManifest<
  TokenPaymentArgs,
  TokenPayment,
  TokenPaymentMintArgs
> = {
  name: 'tokenPayment',
  serializer: getTokenPaymentSerializer,
  mintParser: (context, mintContext, args) => {
    const sourceAta = findAssociatedTokenPda(context, {
      mint: args.mint,
      owner: mintContext.minter.publicKey,
    });
    return {
      data: new Uint8Array(),
      remainingAccounts: [
        { publicKey: sourceAta, isWritable: true },
        { publicKey: args.destinationAta, isWritable: true },
      ],
    };
  },
  routeParser: noopParser,
};

export type TokenPaymentMintArgs = Omit<TokenPaymentArgs, 'amount'>;
