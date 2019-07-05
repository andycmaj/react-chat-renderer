import * as Slack from '@slack/types';

export enum NodeType {
  object, // Output props as JSON object
  array, // Output children as array
  string, // Output plain text string
  html, // Format children text with HTML-like elements
  escapeInHtml,
}

// By default, component does not allow children.
type Props<P> = { children?: unknown } & P;

type SlackObject =
  | Slack.KnownBlock
  | Slack.KnownAction
  | Slack.ImageElement
  | Slack.UserElement
  | Slack.PlainTextElement
  | Slack.MrkdwnElement
  | Slack.Option
  | Slack.Confirm;

export interface SlackElement<P extends {} = any> {
  // type: SlackComponent<P> | string | NodeType;
  // props: Props<P>;
  // children: Child<any>[];
  render: () => SlackObject;
}

export type SlackComponent<P extends {}> = (
  root: any,
  props: Props<P>
) => SlackElement | null;
