import { Block, BlockProps } from './Block';
import { InputBlock as InputBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';

export interface InputBlockProps extends BlockProps, ContainerProps<any> {
  label: string;
  hint: string;
}

export const InputBlock: Block<InputBlockProps, InputBlockSpec> = ({
  label,
  hint,
  blockId,
  children,
}) => ({
  type: 'input',
  label: { type: 'plain_text', text: label, emoji: true },
  hint: { type: 'plain_text', text: hint, emoji: true },
  block_id: blockId,
  element: children[0],
});
