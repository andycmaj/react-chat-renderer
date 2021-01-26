import { Block, BlockProps } from './Block';
import { InputBlock as InputBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';

export interface InputBlockProps extends BlockProps, ContainerProps<any> {
  label: string;
  hint?: string;
  optional?: boolean;
}

export const InputBlock: Block<InputBlockProps, InputBlockSpec> = ({
  label,
  hint,
  blockId,
  children,
  optional,
}) => {
  const spec: InputBlockSpec = {
    type: 'input',
    label: { type: 'plain_text', text: label, emoji: true },
    block_id: blockId,
    element: children[0],
    optional,
  };

  if (hint) {
    spec.hint = { type: 'plain_text', text: hint, emoji: true };
  }

  return spec;
};
