import { Block, BlockProps } from './Block';
import { SectionBlock as SectionBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';
import { AnyText } from './AnyText';

export interface SectionBlockProps
  extends BlockProps<'section'>,
    ContainerProps<AnyText> {
  fields: AnyText[];
  accessory: Element;
}

export const SectionBlock: Block<
  SectionBlockProps,
  SectionBlockSpec
> = ({}) => {
  const spec = {};
  return {
    type: 'section',
    ...spec,
  };
};
