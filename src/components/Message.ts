import { FC } from '..';
import { ContainerProps } from './ContainerProps';
import { Block } from './Block';
import { MessageTextProps } from './MessageText';

export type MessageType = 'ephemeral' | 'in_channel';

export interface MessageProps
  extends ContainerProps<ReturnType<Block<any, any>>> {
  responseType?: MessageType;
  channel?: string;
  token?: string;
  asUser?: boolean;
  altText?: MessageTextProps;
}

export interface MessageSpec {
  response_type: MessageType;
  channel?: string;
  as_user?: boolean;
  token?: string;
  blocks?: Block<any, any>[];
  text?: string;
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
