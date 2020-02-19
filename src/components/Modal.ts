import { FC } from '..';
import { ContainerProps } from './ContainerProps';
import { Block } from './Block';
import { KnownBlock } from '@slack/types';

export type ModalType = 'ephemeral';

export interface ModaleProps
  extends ContainerProps<ReturnType<Block<any, KnownBlock>>> {
  callbackId: string;
  title: string;
}

export interface ModalSpec {
  callback_id: string;
  blocks?: ReturnType<Block<any, KnownBlock>>[];
}

export const Modal: FC<ModaleProps, ModalSpec> = ({
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
