// https://api.slack.com/surfaces/tabs/using

import { FC, ModalProps, ModalSpec } from '..';

export const Home: FC<ModalProps, ModalSpec> = ({
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
    type: 'home',
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
