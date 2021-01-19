import { joinTextChildren } from './Text';
import { ConversationsSelect as ConversationsSelectSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';
import { FC } from '..';

export interface ConversationSelectProps extends ContainerProps<string> {
  initialConversation?: string;
  actionId: string;
  responseUrlEnabled?: boolean;
}

export const ConversationsSelect: FC<
  ConversationSelectProps,
  ConversationsSelectSpec
> = ({
  children,
  initialConversation,
  actionId,
  responseUrlEnabled = false,
}) => {
  const select: ConversationsSelectSpec = {
    type: 'conversations_select',
    initial_conversation: initialConversation,
    action_id: actionId,
    response_url_enabled: responseUrlEnabled,
  };

  if (children) {
    select.placeholder = {
      type: 'plain_text',
      text: joinTextChildren(children),
    };
  }

  return select;
};
