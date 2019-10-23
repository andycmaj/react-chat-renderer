import { ContainerProps } from './ContainerProps';
import { FC } from '.';
import { MrkdwnElement, PlainTextElement } from '@slack/types';

// https://api.slack.com/reference/messaging/composition-objects#text

export type TextType = 'plain_text' | 'mrkdwn';

export interface TextProps<T extends TextType> extends ContainerProps<string> {
  type: T;
}

export type TextElementSpec = MrkdwnElement | PlainTextElement;

export type Text<P extends TextProps<TextType>, E extends TextElementSpec> = FC<
  P,
  E
>;
