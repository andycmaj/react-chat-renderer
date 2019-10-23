import { Block, BlockProps } from './Block';
import { SectionBlock as SectionBlockSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';
import { MarkdownText } from './MarkdownText';
import { PlainText } from './PlainText';

export interface SectionBlockProps
  extends BlockProps<'section'>,
    // This is weird
    // ContainerProps<Text<any, any>> {}
    ContainerProps<typeof PlainText | typeof MarkdownText> {
  fields: [];
  accessory: Element;
}

export const SectionBlock: Block<SectionBlockProps, SectionBlockSpec> = ({
  type,
}) => ({
  type,
});
