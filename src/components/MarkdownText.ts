import { TextProps, Text } from './Text';
import { MrkdwnElement } from '@slack/types';

export interface MarkdownTextProps extends TextProps<'mrkdwn'> {
  emoji?: boolean;
}

export const MarkdownText: Text<MarkdownTextProps, MrkdwnElement> = ({
  type,
  children,
  emoji = false,
}) => ({
  type,
  text: children,
  emoji,
});
