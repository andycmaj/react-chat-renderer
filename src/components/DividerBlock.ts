import { Block, BlockProps } from './Block';
import { DividerBlock as DividerBlockSpec } from '@slack/types';
import { Childless } from './Childless';

export type DividerBlockProps = BlockProps<'divider'> & Childless;

export const DividerBlock: Block<DividerBlockProps, DividerBlockSpec> = ({
  blockId,
}) => ({
  type: 'divider',
  block_id: blockId,
});
