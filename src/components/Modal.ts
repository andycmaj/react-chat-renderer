import { FC } from '..';
import { ContainerProps } from './ContainerProps';
import { Block } from './Block';
import { KnownBlock } from '@slack/types';
import { ModalType } from './Text';

export interface ModalProps
  extends ContainerProps<ReturnType<Block<any, KnownBlock>>> {
  callbackId: string;
  title: string;
  type: ModalType;
}

export interface ModalSpec {
  callback_id: string;
  type: ModalType;
  blocks: ReturnType<Block<any, KnownBlock>>[];
}

export const Modal: FC<ModalProps, ModalSpec> = ({
  children,
  callbackId,
  title,
  type,
}) => {
  return {
    type: type,
    callback_id: callbackId,
    blocks: Array.isArray(children) ? children : [].concat(children),
    title: { type: 'plain_text', text: title },
  };
};
