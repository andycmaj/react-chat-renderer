// https://api.slack.com/reference/messaging/payload
import {
  TextProps,
  MessageText as Text,
  joinTextChildren,
  MessageTextSpec
} from './Text';

export interface MessageTextProps extends TextProps {
  mrkdwn?: boolean;
}

export const MessageText: Text<MessageTextProps, MessageTextSpec> = ({
  children,
  mrkdwn = true
}) => ({
  mrkdwn,
  text: joinTextChildren(children)
});
