// https://api.slack.com/reference/surfaces/views

import { FC } from '..';
import { ContainerProps } from './ContainerProps';
import { Block } from './Block';
import { KnownBlock, View } from '@slack/types';

export interface ModalProps
  extends ContainerProps<ReturnType<Block<any, KnownBlock>>> {
  title: string;
  callbackId?: string;
  submitButtonText?: string;
  closeButtonText?: string;
  privateMetadata?: string;
  clearOnClose?: boolean;
  notifyOnClose?: boolean;
}

// TODO: maybe just rename Modal -> View. slack docs make this a bit confusing
// in the meantime exporting this spec for consistency
export type ModalSpec = View;

export const Modal: FC<ModalProps, ModalSpec> = ({
  children,
  callbackId,
  title,
  submitButtonText,
  closeButtonText,
  privateMetadata,
  clearOnClose,
  notifyOnClose,
}) => {
  const modal: ModalSpec = {
    type: 'modal',
    callback_id: callbackId,
    blocks: Array.isArray(children) ? children : [].concat(children),
    title: { type: 'plain_text', text: title },
    private_metadata: privateMetadata,
    clear_on_close: clearOnClose,
    notify_on_close: notifyOnClose,
  };

  if (submitButtonText) {
    modal.submit = { type: 'plain_text', text: submitButtonText };
  }
  if (closeButtonText) {
    modal.close = { type: 'plain_text', text: closeButtonText };
  }

  return modal;
};
