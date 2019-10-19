import { ContainerProps } from './ContainerProps';
import { FC } from '.';
import { MrkdwnElement, PlainTextElement } from '@slack/types';

// https://api.slack.com/reference/messaging/composition-objects#text

export interface TextProps<T extends 'plain_text' | 'mrkdwn'>
  extends ContainerProps<string> {
  type: T;
}
