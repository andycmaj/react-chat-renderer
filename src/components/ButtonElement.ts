import { FC } from '..';
import { Button as ButtonSpec } from '@slack/types';
import { ElementProps, Element } from './Element';
import { ContainerProps } from './ContainerProps';
import { joinTextChildren } from './Text';

export interface ButtonElementProps
  extends ElementProps<'button'>,
    ContainerProps<string> {
  actionId: string;
  url?: string;
  value?: string;
  style?: 'primary' | 'danger';
}

export const ButtonElement: FC<ButtonElementProps, ButtonSpec> = ({
  children,
  actionId: action_id,
  style,
  url,
  value,
}) => ({
  type: 'button',
  text: {
    // plain_text allows only plain_text
    type: 'plain_text',
    emoji: true,
    text: joinTextChildren(children),
  },
  action_id,
  url,
  value,
  style,
});
