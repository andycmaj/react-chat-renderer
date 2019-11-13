import { FC } from '..';
import { KnownBlock } from '@slack/types';

export interface BlockProps {
  blockId?: string;
}

export type Block<P extends BlockProps, B extends KnownBlock> = FC<P, B>;
