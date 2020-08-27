import { FC } from '..';
import { PlainTextInput as PlainTextInputSpec } from '@slack/types';

export interface PlainTextInputProps {
  placeholderText?: string;
  initialValue?: string;
  multiline?: boolean;
  minLength?: number;
  maxLength?: number;
  actionId?: string;
}

export const PlainTextInputElement: FC<
  PlainTextInputProps,
  PlainTextInputSpec
> = ({
  placeholderText,
  initialValue,
  multiline,
  minLength: min_length,
  maxLength: max_length,
  actionId: action_id,
}) => {
  const plainTextInput: PlainTextInputSpec = {
    type: 'plain_text_input',
    multiline,
    min_length,
    max_length,
    action_id,
  };

  if (placeholderText) {
    plainTextInput.placeholder = { type: 'plain_text', text: placeholderText };
  }

  if (initialValue) {
    plainTextInput.initial_value = initialValue;
  }

  return plainTextInput;
};
