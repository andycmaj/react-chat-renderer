import { Block, BlockProps } from './Block';
import { ActionsBlock as ActionsBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';
import { Element } from './Element';

export interface ActionsBlockProps
  extends BlockProps<'actions'>,
    ContainerProps<Element<any, any>> {}

export const ActionsBlock: Block<ActionsBlockProps, ActionsBlockSpec> = ({
  children,
}) => ({
  type: 'actions',
  elements: [].concat(children),
});
