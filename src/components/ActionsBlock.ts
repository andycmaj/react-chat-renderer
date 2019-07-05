import { Block, BlockProps } from './Block';
import { ActionsBlock as ActionsBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';

export type ActionsBlockProps = BlockProps<'actions'> & ContainerProps<any>;

export const ActionsBlock: Block<ActionsBlockProps, ActionsBlockSpec> = ({
  children,
}) => ({
  type: 'actions',
  elements: [].concat(children),
});
