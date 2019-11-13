import { TextProps, Text, joinTextChildren } from './Text';
import { MrkdwnElement } from '@slack/types';

export interface MarkdownTextProps extends TextProps {
  verbatim?: boolean;
}

export const MarkdownText: Text<MarkdownTextProps, MrkdwnElement> = ({
  children,
  verbatim = false,
}) => ({
  type: 'mrkdwn',
  text: joinTextChildren(children),
  verbatim,
});
