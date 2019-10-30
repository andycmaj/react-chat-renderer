import { FC } from '..';
import { MrkdwnElement, PlainTextElement } from '@slack/types';

// https://api.slack.com/reference/messaging/composition-objects#text

export type TextType = 'plain_text' | 'mrkdwn';

export interface TextProps<T extends TextType> {
  children?: string | string[];
}

export type TextElementSpec = MrkdwnElement | PlainTextElement;

export type Text<P extends TextProps<TextType>, E extends TextElementSpec> = FC<
  P,
  E
>;

export const joinTextChildren = (children: string | string[]) =>
  [].concat(children).join('');
