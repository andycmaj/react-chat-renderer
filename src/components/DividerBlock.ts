import { Block, BlockProps } from './Block';
import { DividerBlock as DividerBlockSpec } from '@slack/types';

export type DividerBlockProps = BlockProps<'divider'>;

export const DividerBlock: Block<DividerBlockProps, DividerBlockSpec> = ({
  type,
}) => ({
  type,
});
