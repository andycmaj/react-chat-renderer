import { PlainTextElement } from '@slack/types';
import { AnyText } from '../AnyText';

export interface InputOption {
  text: ReturnType<AnyText>;
  value?: string;
  description?: PlainTextElement;
  url?: string;
}
