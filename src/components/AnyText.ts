import { PlainText } from './PlainText';
import { MarkdownText } from './MarkdownText';

export type AnyText = typeof PlainText | typeof MarkdownText;
