import { TextProps, Text, joinTextChildren } from './Text';
import { PlainTextElement } from '@slack/types';

export interface PlainTextProps extends TextProps<'plain_text'> {
  emoji?: boolean;
}

export const PlainText: Text<PlainTextProps, PlainTextElement> = ({
  children,
  emoji = false,
}) => ({
  type: 'plain_text',
  text: joinTextChildren(children),
  emoji,
});
