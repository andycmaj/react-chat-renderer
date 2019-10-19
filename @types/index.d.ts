import * as Slack from '@slack/types';
import React from 'react';
import { ChatPostMessageArguments } from '@slack/web-api';

interface MessageProps {
  channel?: string;
}
const Message: React.FC<MessageProps>;

type Span<T> = React.FC<T>;

type Link = Span<LinkProps>;
const Link: Link;

interface MentionProps {
  userId: string;
}
type Mention = Span<MentionProps>;

interface ProgressBarProps {}
type ProgressBar = Span<ProgressBarProps>;

interface MarkdownTextProps extends Container<Span<any> | string> {
  verbatim?: boolean;
}
type MarkdownText = React.FC<MarkdownTextProps>;

interface PlainTextProps extends Container<string> {
  emoji?: boolean;
}
type PlainText = React.FC<PlainTextProps>;

type Text = MarkdownText | PlainText;

interface Field {}

interface BlockProps {
  blockId?: string;
}

interface SectionBlockProps extends BlockProps, Container<Text> {
  fields?: Text[];
}
const SectionBlock: React.FC<SectionBlockProps>;

interface ActionsBlockProps extends BlockProps {}
const ActionsBlock: React.FC<ActionsBlockProps>;

function render(messageElement: any): ChatPostMessageArguments;
