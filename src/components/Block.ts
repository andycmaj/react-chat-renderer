import { FC } from '..';
import { KnownBlock } from '@slack/types';

type BlockType = 'image' | 'context' | 'divider' | 'actions' | 'section';

// TODO: more specific ContainerProps<T>
export interface BlockProps<T extends BlockType> {
  blockId?: string;
}

export type Block<P extends BlockProps<BlockType>, B extends KnownBlock> = FC<
  P,
  B
>;
