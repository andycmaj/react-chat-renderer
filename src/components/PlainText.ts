import { TextProps, Text } from './Text';
import { PlainTextElement } from '@slack/types';

export interface PlainTextProps extends TextProps<'plain_text'> {
  emoji?: boolean;
}

export const PlainText: Text<PlainTextProps, PlainTextElement> = ({
  type,
  children,
  emoji = false,
}) => ({
  type,
  text: children,
  emoji,
});
