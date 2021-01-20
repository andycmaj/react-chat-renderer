import { StaticSelect, PlainTextElement } from '@slack/types';
import { FC } from '..';
import { buildInputOptions, InputOption } from './shared/inputOption';

export interface SelectElementProps {
  placeholder: PlainTextElement;
  actionId: string;
  options?: InputOption[];
  optionGroups?: { label: PlainTextElement; options: InputOption[] }[];
}

export interface SingleSelectElementProps extends SelectElementProps {
  initialOption?: InputOption;
}

export const SingleSelectElement: FC<
  SingleSelectElementProps,
  StaticSelect
> = ({ placeholder, actionId, options, optionGroups, initialOption }) => ({
  type: 'static_select',
  placeholder,
  action_id: actionId,
  ...(options && { options: buildInputOptions(options) }),
  ...(optionGroups && {
    option_groups: optionGroups.map(group => ({
      label: group.label,
      options: buildInputOptions(group.options),
    })),
  }),
  initial_option: buildInputOptions([initialOption])[0],
});
