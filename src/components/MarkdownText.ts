import { TextProps, Text, joinTextChildren } from './Text';
import { MrkdwnElement } from '@slack/types';

export interface MarkdownTextProps extends TextProps<'mrkdwn'> {
  emoji?: boolean;
}

export const MarkdownText: Text<MarkdownTextProps, MrkdwnElement> = ({
  children,
  emoji = false,
}) => ({
  type: 'mrkdwn',
  text: joinTextChildren(children),
  emoji,
});
