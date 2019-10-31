import { Block, BlockProps } from './Block';
import { ContextBlock as ContextBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';
import { AnyText } from './AnyText';
import { ImageElement } from './ImageElement';

export interface ContextBlockProps
  extends BlockProps<'context'>,
    ContainerProps<AnyText | typeof ImageElement> {}

export const ContextBlock: Block<ContextBlockProps, ContextBlockSpec> = ({
  children,
  blockId,
}) => ({
  type: 'context',
  elements: [].concat(children),
  block_id: blockId,
});