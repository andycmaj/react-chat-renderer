import { Block, BlockProps } from './Block';
import { ActionsBlock as ActionsBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';

export type ActionsBlockProps = BlockProps & ContainerProps<any>;

export const ActionsBlock: Block<ActionsBlockProps, ActionsBlockSpec> = ({
  blockId,
  children,
}) => ({
  type: 'actions',
  block_id: blockId,
  elements: [].concat(children),
});
