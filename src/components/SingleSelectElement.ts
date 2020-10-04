import { StaticSelect, PlainTextElement } from '@slack/types';
import { FC } from '..';
import { AnyText } from './AnyText';
import { InputOption } from './shared/inputOption';

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
  options,
  initial_option: initialOption,
});
