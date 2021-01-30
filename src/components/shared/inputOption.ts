import { Option } from '@slack/types';
import { AnyText } from '../AnyText';

export interface InputOption {
  text: ReturnType<AnyText>;
  value?: string;
  description?: string;
  url?: string;
}

export const buildInputOptions = (inputOptions: InputOption[]): Option[] =>
  inputOptions?.map(inputOption => {
    if (!inputOption) {
      return;
    }
    const option: Option = {
      text: inputOption.text,
    };
    if (inputOption.url) {
      option.url = inputOption.url;
    }
    if (inputOption.value) {
      option.value = inputOption.value;
    }
    if (inputOption.description) {
      option.description = {
        text: inputOption.description,
        type: 'plain_text',
        emoji: true,
      };
    }
    return option;
  }) ?? [];
