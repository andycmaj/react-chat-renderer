import { FC } from '.';
import { TextProps } from './Text';
import { PlainTextElement } from '@slack/types';

export interface PlainTextProps extends TextProps<'plain_text'> {
  emoji?: boolean;
}

export const PlainText: FC<PlainTextProps, PlainTextElement> = ({
  type,
  children,
  emoji = false,
}) => ({
  type,
  text: children,
  emoji,
});
