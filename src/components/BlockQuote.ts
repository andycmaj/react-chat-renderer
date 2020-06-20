import { ContainerProps } from './ContainerProps';
import { MarkdownTextProps, MarkdownText } from './MarkdownText';
import { joinTextChildren } from './Text';

export type BlockQuoteProps = MarkdownTextProps & ContainerProps<string>;

const applyMarkdownQuotation = (message: string): string => {
  return '>' + message.replace(/\n/g, '\n>');
};

export const BlockQuote: typeof MarkdownText = (props: BlockQuoteProps) => {
  return {
    type: 'mrkdwn',
    text: applyMarkdownQuotation(joinTextChildren(props.children)),
    verbatim: props.verbatim,
  };
};

export default BlockQuote;
