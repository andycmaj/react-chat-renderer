import { Block, BlockProps } from './Block';
import { ActionsBlock as ActionsBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';
import { BlockElement } from './BlockElement';

export interface ActionsBlockProps
  extends BlockProps<'actions'>,
    ContainerProps<BlockElement<any, any>> {}

export const ActionsBlock: Block<ActionsBlockProps, ActionsBlockSpec> = ({
  children,
}) => ({
  type: 'actions',
  elements: [].concat(children),
});
