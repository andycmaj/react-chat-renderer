import { joinTextChildren } from './Text';
import { ConversationsSelect as ConversationsSelectSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';
import { FC } from '..';

export interface ConversationSelectProps extends ContainerProps<string> {
  initialConversation?: string;
  actionId: string;
  filter?: {
    include?: ('im' | 'mpim' | 'private' | 'public')[];
    excludeExternalSharedChannels?: boolean;
    excludeBotUsers?: boolean;
  };
  exclude_external_shared_channels?: boolean;
  exclude_bot_users?: boolean;
  responseUrlEnabled?: boolean;
}

export const ConversationsSelect: FC<
  ConversationSelectProps,
  ConversationsSelectSpec
> = ({
  children,
  initialConversation,
  actionId,
  filter,
  responseUrlEnabled = false,
}) => {
  const select: ConversationsSelectSpec = {
    type: 'conversations_select',
    initial_conversation: initialConversation,
    action_id: actionId,
    response_url_enabled: responseUrlEnabled,
    ...(filter && {
      filter: {
        include: filter.include,
        exclude_bot_users: filter.excludeBotUsers,
        exclude_external_shared_channels: filter.excludeExternalSharedChannels,
      },
    }),
  };

  if (children) {
    select.placeholder = {
      type: 'plain_text',
      text: joinTextChildren(children),
    };
  }

  return select;
};
