import { Block, BlockProps } from './Block';
import { SectionBlock as SectionBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';
import { AnyText } from './AnyText';
import { ElementSpec } from './BlockElement';

export interface SectionBlockProps extends BlockProps, ContainerProps<AnyText> {
  fields?: ReturnType<AnyText>[];
  accessory?: ElementSpec;
}

export const SectionBlock: Block<SectionBlockProps, SectionBlockSpec> = ({
  children,
  accessory,
  fields,
  blockId,
}) => ({
  type: 'section',
  block_id: blockId,
  text: [].concat(children)[0],
  accessory,
  fields,
});
