import { FC } from '..';
import { KnownBlock } from '@slack/types';
import { HeaderBlockSpec } from './HeaderBlock';

export interface BlockProps {
  blockId?: string;
}

// slack types don't yet include HeaderBlock
export type AllowedBlocks = KnownBlock | HeaderBlockSpec;

export type Block<P extends BlockProps, B extends AllowedBlocks> = FC<P, B>;
