import { Block, BlockProps } from './Block';
import { InputBlock as InputBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';

export interface InputBlockProps extends BlockProps, ContainerProps<any> {
  label: string;
}

export const InputBlock: Block<InputBlockProps, InputBlockSpec> = ({
  label,
  blockId,
  children,
}) => ({
  type: 'input',
  label: { type: 'plain_text', text: label, emoji: true },
  block_id: blockId,
  element: children[0],
});
