import { Block, BlockProps } from './Block';
import { SectionBlock as SectionBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';
import { AnyText } from './AnyText';
import { ImageElement } from './ImageElement';
import { ButtonElement } from './ButtonElement';
import { Element, ElementSpec } from './Element';

export interface SectionBlockProps
  extends BlockProps<'section'>,
    ContainerProps<AnyText> {
  fields?: AnyText[];
  accessory?: Element<any, ElementSpec>;
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
  accessory: accessory as any,
  fields: fields as any,
});
