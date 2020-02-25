import { joinTextChildren } from './Text';
import { ChannelsSelect as ChannelSelectSpec } from '@slack/types';
import { ContainerProps } from './ContainerProps';
import { FC } from '..';

export interface ChannelSelectProps extends ContainerProps<string> {
  initialChannel?: string;
  actionId?: string;
}

export const ChannelSelect: FC<ChannelSelectProps, ChannelSelectSpec> = ({
  children,
  initialChannel,
  actionId,
}) => {
  const select: ChannelSelectSpec = {
    type: 'channels_select',
    initial_channel: initialChannel,
    action_id: actionId,
  };

  if (children) {
    select.placeholder = {
      type: 'plain_text',
      text: joinTextChildren(children),
    };
  }

  return select;
};
