import { FC } from '..';
import { PlainTextInput as PlainTextInputSpec } from '@slack/types';

export interface PlainTextInputProps {
  placeholderText?: string;
  initialValue?: string;
  multiline?: boolean;
  minLength?: number;
  maxLength?: number;
}

export const PlainTextInputElement: FC<
  PlainTextInputProps,
  PlainTextInputSpec
> = ({
  placeholderText,
  initialValue: initial_value,
  multiline,
  minLength: min_length,
  maxLength: max_length,
}) => {
  const plainTextInput: PlainTextInputSpec = {
    type: 'plain_text_input',
    initial_value,
    multiline,
    min_length,
    max_length,
  };

  if (placeholderText) {
    plainTextInput.placeholder = { type: 'plain_text', text: placeholderText };
  }

  return plainTextInput;
};
