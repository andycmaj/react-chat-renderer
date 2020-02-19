// https://api.slack.com/reference/surfaces/views

import { FC } from '..';
import { ContainerProps } from './ContainerProps';
import { Block } from './Block';
import { KnownBlock, View } from '@slack/types';

export interface ModalProps
  extends ContainerProps<ReturnType<Block<any, KnownBlock>>> {
  callbackId: string;
  title: string;
}

export interface ModalSpec
  extends Pick<View, 'callback_id' | 'blocks' | 'title'> {
  type: 'modal';
}

export const Modal: FC<ModalProps, ModalSpec> = ({
  children,
  callbackId,
  title,
}) => {
  return {
    type: 'modal',
    callback_id: callbackId,
    blocks: Array.isArray(children) ? children : [].concat(children),
    title: { type: 'plain_text', text: title },
  };
};
