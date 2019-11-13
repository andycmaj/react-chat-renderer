import { FC } from '..';
import { MrkdwnElement, PlainTextElement } from '@slack/types';
import { ContainerProps } from './ContainerProps';

// https://api.slack.com/reference/messaging/composition-objects#text

export type TextType = 'plain_text' | 'mrkdwn';

export type TextProps = ContainerProps<string>;

export type TextElementSpec = MrkdwnElement | PlainTextElement;

export type Text<P extends TextProps, E extends TextElementSpec> = FC<P, E>;

export const joinTextChildren = (children: string | string[]) =>
  [].concat(children).join('');
