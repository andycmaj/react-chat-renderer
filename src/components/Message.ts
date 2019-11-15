import { FC } from '..';
import { ContainerProps } from './ContainerProps';
import { Block } from './Block';
import { AltText } from './MessageText';
import { MessageTextSpec } from './Text';
import { KnownBlock } from '@slack/types';

export type MessageType = 'ephemeral' | 'in_channel';

export interface MessageProps
  extends ContainerProps<ReturnType<Block<any, KnownBlock>>> {
  responseType?: MessageType;
  channel?: string;
  token?: string;
  asUser?: boolean;
  altText?: ReturnType<typeof AltText>;
}

export interface MessageSpec extends MessageTextSpec {
  response_type: MessageType;
  channel?: string;
  as_user?: boolean;
  token?: string;
  blocks?: ReturnType<Block<any, KnownBlock>>[];
}

export const Message: FC<MessageProps, MessageSpec> = ({
  children,
  responseType = 'in_channel',
  channel,
  token,
  altText,
  asUser = false,
}) => ({
  response_type: responseType,
  blocks: [].concat(children),
  as_user: asUser,
  channel,
  token,
  ...altText,
});
