import { StaticSelect, PlainTextElement } from '@slack/types';
import { FC } from '..';
import { buildInputOptions, InputOption } from './shared/inputOption';

export interface SelectElementProps {
  placeholder: PlainTextElement;
  actionId: string;
  options: InputOption[];
}

export interface SingleSelectElementProps extends SelectElementProps {
  initialOption?: InputOption;
}

export const SingleSelectElement: FC<
  SingleSelectElementProps,
  StaticSelect
> = ({ placeholder, actionId, options, initialOption }) => ({
  type: 'static_select',
  placeholder,
  action_id: actionId,
  options: buildInputOptions(options),
  initial_option: buildInputOptions([initialOption])[0],
});
